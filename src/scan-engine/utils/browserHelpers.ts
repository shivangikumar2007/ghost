// src/scan-engine/utils/browserHelpers.ts

/**
 * Check whether code is running in a browser
 */
export function isBrowser(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined"
  );
}

/**
 * Safely get navigator object
 */
export function getNavigator(): Navigator | null {
  if (!isBrowser()) {
    return null;
  }

  return navigator;
}

/**
 * Safely get window object
 */
export function getWindow(): Window | null {
  if (!isBrowser()) {
    return null;
  }

  return window;
}

/**
 * Check WebGL support
 */
export function supportsWebGL(): boolean {
  if (!isBrowser()) {
    return false;
  }

  try {
    const canvas =
      document.createElement("canvas");

    return !!(
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Check Canvas support
 */
export function supportsCanvas(): boolean {
  if (!isBrowser()) {
    return false;
  }

  try {
    const canvas =
      document.createElement("canvas");

    return !!canvas.getContext("2d");
  } catch {
    return false;
  }
}

/**
 * Check LocalStorage support
 */
export function supportsLocalStorage(): boolean {
  if (!isBrowser()) {
    return false;
  }

  try {
    const key =
      "__ghost_localstorage_test__";

    localStorage.setItem(key, key);
    localStorage.removeItem(key);

    return true;
  } catch {
    return false;
  }
}

/**
 * Check SessionStorage support
 */
export function supportsSessionStorage(): boolean {
  if (!isBrowser()) {
    return false;
  }

  try {
    const key =
      "__ghost_sessionstorage_test__";

    sessionStorage.setItem(key, key);
    sessionStorage.removeItem(key);

    return true;
  } catch {
    return false;
  }
}

/**
 * Check Cookies support
 */
export function supportsCookies(): boolean {
  if (!isBrowser()) {
    return false;
  }

  try {
    document.cookie =
      "ghost_test_cookie=1; SameSite=Lax";

    const enabled =
      document.cookie.includes(
        "ghost_test_cookie"
      );

    document.cookie =
      "ghost_test_cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    return enabled;
  } catch {
    return false;
  }
}

/**
 * Check Permissions API support
 */
export function supportsPermissionsAPI(): boolean {
  const nav = getNavigator();

  return !!(
    nav &&
    nav.permissions &&
    nav.permissions.query
  );
}

/**
 * Check Device Memory API support
 */
export function supportsDeviceMemory(): boolean {
  const nav = getNavigator() as Navigator & {
    deviceMemory?: number;
  };

  return typeof nav?.deviceMemory === "number";
}

/**
 * Check Hardware Concurrency API support
 */
export function supportsHardwareConcurrency(): boolean {
  const nav = getNavigator();

  return (
    typeof nav?.hardwareConcurrency ===
    "number"
  );
}

/**
 * Get current timezone safely
 */
export function getTimezone(): string {
  try {
    return Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone;
  } catch {
    return "Unknown";
  }
}

/**
 * Get browser language safely
 */
export function getLanguage(): string {
  const nav = getNavigator();

  return nav?.language || "Unknown";
}

/**
 * Get browser languages safely
 */
export function getLanguages(): string[] {
  const nav = getNavigator();

  return nav?.languages || [];
}

/**
 * Detect touch support
 */
export function hasTouchSupport(): boolean {
  const nav = getNavigator();

  if (!nav) {
    return false;
  }

  return (
    "ontouchstart" in window ||
    nav.maxTouchPoints > 0
  );
}

/**
 * Check if browser is online
 */
export function isOnline(): boolean {
  const nav = getNavigator();

  return nav?.onLine ?? true;
}

/**
 * Get current page domain
 */
export function getCurrentDomain(): string {
  if (!isBrowser()) {
    return "";
  }

  return window.location.hostname;
}

/**
 * Get current page URL
 */
export function getCurrentUrl(): string {
  if (!isBrowser()) {
    return "";
  }

  return window.location.href;
}

/**
 * Convert bytes into readable format
 */
export function formatBytes(
  bytes: number
): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;

  const sizes = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const i = Math.floor(
    Math.log(bytes) / Math.log(k)
  );

  return (
    parseFloat(
      (bytes / Math.pow(k, i)).toFixed(2)
    ) +
    " " +
    sizes[i]
  );
}