// src/scan-engine/types/permission.ts

export type PermissionStateType =
  | "granted"
  | "prompt"
  | "denied"
  | "unsupported";

export interface PermissionStatusMap {
  camera: PermissionStateType;
  microphone: PermissionStateType;
  geolocation: PermissionStateType;
  notifications: PermissionStateType;
  clipboardRead: PermissionStateType;
  clipboardWrite: PermissionStateType;
}

export interface PermissionScanResult
  extends PermissionStatusMap {
  grantedCount: number;
  deniedCount: number;
  promptCount: number;
  unsupportedCount: number;
}

export type SupportedPermission =
  | "camera"
  | "microphone"
  | "geolocation"
  | "notifications"
  | "clipboard-read"
  | "clipboard-write";