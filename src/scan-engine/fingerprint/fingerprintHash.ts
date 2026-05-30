// src/scan-engine/fingerprint/fingerprintHash.ts

import { sha256 } from "../utils/hash";

import type {
  SystemSignals,
} from "../types/scanResult";

interface FingerprintHashInput {
  canvasHash: string;
  gpuVendor: string;
  gpuRenderer: string;
  installedFonts: string[];
  systemSignals: SystemSignals;
}

/**
 * Stable serializer
 * Ensures identical object structure
 * always produces identical string output.
 */
function stableStringify(
  value: unknown
): string {
  if (
    value === null ||
    typeof value !== "object"
  ) {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value
      .map(stableStringify)
      .join(",")}]`;
  }

  const obj =
    value as Record<
      string,
      unknown
    >;

  const keys =
    Object.keys(obj).sort();

  return `{${keys
    .map(
      (key) =>
        `"${key}":${stableStringify(
          obj[key]
        )}`
    )
    .join(",")}}`;
}

export async function generateFingerprintHash(
  input: FingerprintHashInput
): Promise<string> {
  const payload = {
    canvasHash:
      input.canvasHash,

    gpuVendor:
      input.gpuVendor,

    gpuRenderer:
      input.gpuRenderer,

    installedFonts: [
      ...input.installedFonts,
    ].sort(),

    userAgent:
      input.systemSignals.userAgent,

    platform:
      input.systemSignals.platform,

    language:
      input.systemSignals.language,

    languages: [
      ...input.systemSignals.languages,
    ].sort(),

    timezone:
      input.systemSignals.timezone,

    screenWidth:
      input.systemSignals.screenWidth,

    screenHeight:
      input.systemSignals.screenHeight,

    availableWidth:
      input.systemSignals.availableWidth,

    availableHeight:
      input.systemSignals.availableHeight,

    colorDepth:
      input.systemSignals.colorDepth,

    pixelDepth:
      input.systemSignals.pixelDepth,

    devicePixelRatio:
      input.systemSignals.devicePixelRatio,

    hardwareConcurrency:
      input.systemSignals.hardwareConcurrency,

    deviceMemory:
      input.systemSignals.deviceMemory,

    maxTouchPoints:
      input.systemSignals.maxTouchPoints,

    touchSupport:
      input.systemSignals.touchSupport,

    cookieEnabled:
      input.systemSignals.cookieEnabled,
  };

  const serialized =
    stableStringify(
      payload
    );

  return sha256(
    serialized
  );
}