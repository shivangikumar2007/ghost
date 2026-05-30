// src/scan-engine/fingerprint/systemSignals.ts

import type { SystemSignals } from "../types/scanResult";

export async function collectSystemSignals(): Promise<SystemSignals> {
  const nav = navigator;

  const timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone ||
    "Unknown";

  const touchSupport =
    "ontouchstart" in window ||
    nav.maxTouchPoints > 0;

  return {
    // Browser Info
    userAgent: nav.userAgent,
    platform: nav.platform || "Unknown",

    // Language
    language: nav.language || "Unknown",
    languages: nav.languages || [],

    // Time
    timezone,

    // Screen
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    availableWidth: window.screen.availWidth,
    availableHeight: window.screen.availHeight,
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,

    // Display
    devicePixelRatio:
      window.devicePixelRatio || 1,

    // Hardware
    hardwareConcurrency:
      nav.hardwareConcurrency || 0,

    deviceMemory:
      (
        nav as Navigator & {
          deviceMemory?: number;
        }
      ).deviceMemory || 0,

    maxTouchPoints:
      nav.maxTouchPoints || 0,

    touchSupport,

    // Browser Features
    cookieEnabled: nav.cookieEnabled,

    online: nav.onLine,
  };
}