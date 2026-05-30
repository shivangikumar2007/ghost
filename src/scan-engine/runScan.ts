// src/scan-engine/runScan.ts

import { detectTrackers } from "./trackers/trackerDetector";

import { generateCanvasFingerprint } from "./fingerprint/canvasFingerprint";
import { getWebGLFingerprint } from "./fingerprint/webglFingerprint";
import { detectFonts } from "./fingerprint/fontDetector";
import { collectSystemSignals } from "./fingerprint/systemSignals";
import { generateFingerprintHash } from "./fingerprint/fingerprintHash";

import { scanPermissions } from "./permissions/permissionsScanner";

import { auditStorage } from "./storage/storageAudit";

import { calculateEntropy } from "./entropy/entropyCalculator";

import type {
  GhostScanResult,
  FingerprintResult,
} from "./types/scanResult";

import ghostScanStore from "../shared/ghostScanStore";

export async function runFullScan(): Promise<GhostScanResult> {
  try {
    // =====================================================
    // STEP 1: Run Independent Scans In Parallel
    // =====================================================

    const [
      trackerResults,
      canvasResult,
      webglResult,
      fontResult,
      systemSignals,
      permissionResult,
      storageResult,
    ] = await Promise.all([
      detectTrackers(),
      generateCanvasFingerprint(),
      getWebGLFingerprint(),
      detectFonts(),
      collectSystemSignals(),
      scanPermissions(),
      auditStorage(),
    ]);

    // =====================================================
    // STEP 2: Generate Master Fingerprint Hash
    // =====================================================

    const fingerprintHash =
      await generateFingerprintHash({
        canvasHash: canvasResult.canvasHash,
        gpuVendor: webglResult.gpuVendor,
        gpuRenderer: webglResult.gpuRenderer,
        installedFonts:
          fontResult.installedFonts,
        systemSignals,
      });

    // =====================================================
    // STEP 3: Build Fingerprint Object
    // =====================================================

    const fingerprint: FingerprintResult = {
      hash: fingerprintHash,

      canvasHash:
        canvasResult.canvasHash,

      canvasDataUrl:
        canvasResult.canvasDataUrl,

      gpuVendor:
        webglResult.gpuVendor,

      gpuRenderer:
        webglResult.gpuRenderer,

      installedFonts:
        fontResult.installedFonts,

      fontCount:
        fontResult.detectedCount,
    };

    // =====================================================
    // STEP 4: Calculate Entropy
    // =====================================================

    const entropy =
      calculateEntropy({
        fingerprint,
        system: systemSignals,
      });

    // =====================================================
    // STEP 5: Build Final Result
    // =====================================================

    const result: GhostScanResult = {
      timestamp:
        new Date().toISOString(),

      trackers: trackerResults,

      fingerprint,

      system: systemSignals,

      permissions: {
        camera:
          permissionResult.camera,

        microphone:
          permissionResult.microphone,

        geolocation:
          permissionResult.geolocation,

        notifications:
          permissionResult.notifications,

        clipboardRead:
          permissionResult.clipboardRead,

        clipboardWrite:
          permissionResult.clipboardWrite,
      },

      storage: storageResult,

      entropy,
    };

    // =====================================================
    // STEP 6: Store For Other Components
    // =====================================================

    ghostScanStore.set(result);

    // =====================================================
    // STEP 7: Persist Locally
    // =====================================================

    try {
      localStorage.setItem(
        "ghost_scan_result",
        JSON.stringify(result)
      );

      localStorage.setItem(
        "ghost_last_scan",
        result.timestamp
      );
    } catch {
      // Ignore storage failures
    }

    return result;
  } catch (error) {
    console.error(
      "[Ghost Scan Engine]",
      error
    );

    throw new Error(
      "Failed to complete browser scan."
    );
  }
}