// src/scan-engine/utils/constants.ts

/**
 * Canvas Fingerprinting
 */
export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 200;

/**
 * Font Detection
 */
export const FONT_TEST_STRING =
  "mmmmmmmmmmlliWWWWWWWW1234567890";

export const FONT_TEST_SIZE = "72px";

/**
 * Entropy Weights
 * Total = 100
 */
export const ENTROPY_WEIGHTS = {
  fonts: 20,
  canvas: 25,
  gpu: 20,
  resolution: 10,
  cpu: 10,
  memory: 5,
  language: 5,
  timezone: 5,
} as const;

/**
 * Entropy Risk Levels
 */
export const ENTROPY_THRESHOLDS = {
  LOW: 45,
  MEDIUM: 75,
} as const;

/**
 * Browser Uniqueness Estimates
 */
export const UNIQUENESS_ESTIMATES = [
  {
    minScore: 90,
    uniqueness: "1 in 1,500,000 browsers",
  },
  {
    minScore: 85,
    uniqueness: "1 in 900,000 browsers",
  },
  {
    minScore: 80,
    uniqueness: "1 in 500,000 browsers",
  },
  {
    minScore: 75,
    uniqueness: "1 in 284,000 browsers",
  },
  {
    minScore: 70,
    uniqueness: "1 in 150,000 browsers",
  },
  {
    minScore: 60,
    uniqueness: "1 in 75,000 browsers",
  },
  {
    minScore: 50,
    uniqueness: "1 in 25,000 browsers",
  },
  {
    minScore: 40,
    uniqueness: "1 in 10,000 browsers",
  },
  {
    minScore: 30,
    uniqueness: "1 in 3,000 browsers",
  },
  {
    minScore: 0,
    uniqueness: "1 in 500 browsers",
  },
] as const;

/**
 * Privacy Risk Labels
 */
export const RISK_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

/**
 * Scan Timeouts
 */
export const SCAN_TIMEOUTS = {
  TRACKER_SCAN: 3000,
  FONT_SCAN: 5000,
  PERMISSION_SCAN: 3000,
  STORAGE_SCAN: 2000,
  FULL_SCAN: 15000,
} as const;

/**
 * Storage Risk Thresholds
 */
export const STORAGE_RISK = {
  LOW: 5,
  MEDIUM: 10,
  HIGH: 20,
} as const;

/**
 * Tracker Risk Thresholds
 */
export const TRACKER_RISK = {
  LOW: 3,
  MEDIUM: 8,
  HIGH: 15,
} as const;

/**
 * Permission Risk Thresholds
 */
export const PERMISSION_RISK = {
  LOW: 1,
  MEDIUM: 3,
  HIGH: 5,
} as const;

/**
 * Fingerprint Risk Thresholds
 */
export const FINGERPRINT_RISK = {
  LOW: 30,
  MEDIUM: 60,
  HIGH: 80,
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  LAST_SCAN: "ghost_last_scan",
  SCAN_RESULT: "ghost_scan_result",
  COMPLETED_ACTIONS: "ghost_completed_actions",
  LAST_SCORE: "ghost_last_score",
} as const;

/**
 * Browser Permission Names
 */
export const PERMISSION_NAMES = [
  "camera",
  "microphone",
  "geolocation",
  "notifications",
  "clipboard-read",
  "clipboard-write",
] as const;

/**
 * Default Fallback Values
 */
export const DEFAULT_VALUES = {
  UNKNOWN: "Unknown",
  UNSUPPORTED: "Unsupported",
  NOT_AVAILABLE: "N/A",
} as const;

/**
 * WebGL Constants
 */
export const WEBGL_CONSTANTS = {
  DEBUG_RENDERER_INFO:
    "WEBGL_debug_renderer_info",
} as const;

/**
 * Fingerprint Hash Configuration
 */
export const HASH_CONFIG = {
  ALGORITHM: "SHA-256",
  ENCODING: "hex",
} as const;

/**
 * Privacy Score Limits
 */
export const PRIVACY_SCORE = {
  MIN: 0,
  MAX: 100,
} as const;

/**
 * Application Metadata
 */
export const APP_CONFIG = {
  NAME: "Ghost",
  VERSION: "1.0.0",
} as const;