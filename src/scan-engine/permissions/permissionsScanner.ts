// src/scan-engine/permissions/permissionsScanner.ts

import type {
  PermissionStateType,
  PermissionScanResult,
  SupportedPermission,
} from "../types/permission";

type BrowserPermissionName =
  SupportedPermission;

async function queryPermission(
  permissionName: BrowserPermissionName
): Promise<PermissionStateType> {
  try {
    if (
      !navigator.permissions ||
      !navigator.permissions.query
    ) {
      return "unsupported";
    }

    const result =
      await navigator.permissions.query({
        name:
          permissionName as PermissionName,
      });

    return result.state as PermissionStateType;
  } catch {
    return "unsupported";
  }
}

export async function scanPermissions(): Promise<PermissionScanResult> {
  const [
    camera,
    microphone,
    geolocation,
    notifications,
    clipboardRead,
    clipboardWrite,
  ] = await Promise.all([
    queryPermission("camera"),
    queryPermission("microphone"),
    queryPermission("geolocation"),
    queryPermission("notifications"),
    queryPermission("clipboard-read"),
    queryPermission("clipboard-write"),
  ]);

  const permissionStates = [
    camera,
    microphone,
    geolocation,
    notifications,
    clipboardRead,
    clipboardWrite,
  ];

  const grantedCount =
    permissionStates.filter(
      (state) => state === "granted"
    ).length;

  const deniedCount =
    permissionStates.filter(
      (state) => state === "denied"
    ).length;

  const promptCount =
    permissionStates.filter(
      (state) => state === "prompt"
    ).length;

  const unsupportedCount =
    permissionStates.filter(
      (state) => state === "unsupported"
    ).length;

  return {
    camera,
    microphone,
    geolocation,
    notifications,
    clipboardRead,
    clipboardWrite,

    grantedCount,
    deniedCount,
    promptCount,
    unsupportedCount,
  };
}

/**
 * Utility helper for privacy scoring
 */
export function getPermissionRiskLevel(
  permissions: PermissionScanResult
): "Low" | "Medium" | "High" {
  const granted =
    permissions.grantedCount;

  if (granted >= 4) {
    return "High";
  }

  if (granted >= 2) {
    return "Medium";
  }

  return "Low";
}

/**
 * Utility helper for UI
 */
export function getGrantedPermissions(
  permissions: PermissionScanResult
): string[] {
  const granted: string[] = [];

  if (permissions.camera === "granted") {
    granted.push("Camera");
  }

  if (
    permissions.microphone === "granted"
  ) {
    granted.push("Microphone");
  }

  if (
    permissions.geolocation ===
    "granted"
  ) {
    granted.push("Location");
  }

  if (
    permissions.notifications ===
    "granted"
  ) {
    granted.push("Notifications");
  }

  if (
    permissions.clipboardRead ===
    "granted"
  ) {
    granted.push("Clipboard Read");
  }

  if (
    permissions.clipboardWrite ===
    "granted"
  ) {
    granted.push("Clipboard Write");
  }

  return granted;
}