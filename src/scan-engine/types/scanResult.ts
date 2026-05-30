// src/scan-engine/types/scanResult.ts

import type { PermissionStatusMap } from "./permission";

import type {
  TrackerDetectionResult,
} from "./tracker";

/* ============================================================
   SYSTEM SIGNALS
============================================================ */

export interface SystemSignals {
  userAgent: string;
  platform: string;

  language: string;
  languages: string[];

  timezone: string;

  screenWidth: number;
  screenHeight: number;

  availableWidth: number;
  availableHeight: number;

  colorDepth: number;
  pixelDepth: number;

  devicePixelRatio: number;

  hardwareConcurrency: number;
  deviceMemory: number;

  maxTouchPoints: number;
  touchSupport: boolean;

  cookieEnabled: boolean;
  online: boolean;
}

/* ============================================================
   CANVAS FINGERPRINT
============================================================ */

export interface CanvasFingerprintResult {
  canvasHash: string;
  canvasDataUrl: string;
}

/* ============================================================
   WEBGL FINGERPRINT
============================================================ */

export interface WebGLFingerprintResult {
  gpuVendor: string;
  gpuRenderer: string;

  webglVersion: string;
  shadingLanguageVersion: string;

  supported: boolean;
}

/* ============================================================
   FONT DETECTION
============================================================ */

export interface FontDetectionResult {
  installedFonts: string[];
  detectedCount: number;
}

/* ============================================================
   FINGERPRINT RESULT
============================================================ */

export interface FingerprintResult {
  hash: string;

  canvasHash: string;
  canvasDataUrl?: string;

  gpuVendor: string;
  gpuRenderer: string;

  installedFonts: string[];

  fontCount: number;
}

/* ============================================================
   ENTROPY
============================================================ */

export interface EntropyResult {
  score: number;

  uniqueness: string;

  risk:
    | "Low"
    | "Medium"
    | "High";
}

/* ============================================================
   STORAGE AUDIT
============================================================ */

export interface StorageAuditResult {
  cookies: {
    count: number;
    names: string[];
    firstParty: number;
    thirdParty: string;
  };

  localStorage: {
    count: number;
    keys: string[];
    estimatedSizeBytes: number;
  };

  sessionStorage: {
    count: number;
    keys: string[];
    estimatedSizeBytes: number;
  };

  totals: {
    storageItems: number;
    estimatedSizeBytes: number;
  };
}

/* ============================================================
   FINAL SCAN RESULT
============================================================ */

export interface GhostScanResult {
  timestamp: string;

  trackers: TrackerDetectionResult;

  fingerprint: FingerprintResult;

  system: SystemSignals;

  permissions: PermissionStatusMap;

  storage: StorageAuditResult;

  entropy: EntropyResult;
}