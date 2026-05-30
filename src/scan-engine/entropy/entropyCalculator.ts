// src/scan-engine/entropy/entropyCalculator.ts

import type {
  EntropyResult,
  FingerprintResult,
  SystemSignals,
} from "../types/scanResult";

interface EntropyInput {
  fingerprint: FingerprintResult;
  system: SystemSignals;
}

export function calculateEntropy(
  input: EntropyInput
): EntropyResult {
  const { fingerprint, system } = input;

  let score = 0;

  // ---------------------------
  // Installed Fonts
  // ---------------------------

  const fontCount = fingerprint.installedFonts.length;

  if (fontCount >= 40) {
    score += 20;
  } else if (fontCount >= 25) {
    score += 15;
  } else if (fontCount >= 10) {
    score += 10;
  } else {
    score += 5;
  }

  // ---------------------------
  // Canvas Fingerprint
  // ---------------------------

  if (fingerprint.canvasHash) {
    score += 25;
  }

  // ---------------------------
  // GPU Renderer
  // ---------------------------

  const renderer = fingerprint.gpuRenderer.toLowerCase();

  if (
    renderer.includes("rtx") ||
    renderer.includes("radeon") ||
    renderer.includes("apple") ||
    renderer.includes("iris") ||
    renderer.includes("adreno")
  ) {
    score += 20;
  } else if (renderer !== "unknown") {
    score += 12;
  }

  // ---------------------------
  // Screen Resolution
  // ---------------------------

  const resolution =
    system.screenWidth * system.screenHeight;

  if (resolution >= 3840 * 2160) {
    score += 10;
  } else if (resolution >= 2560 * 1440) {
    score += 8;
  } else if (resolution >= 1920 * 1080) {
    score += 6;
  } else {
    score += 3;
  }

  // ---------------------------
  // CPU Cores
  // ---------------------------

  if (system.hardwareConcurrency >= 16) {
    score += 10;
  } else if (system.hardwareConcurrency >= 8) {
    score += 7;
  } else if (system.hardwareConcurrency >= 4) {
    score += 5;
  } else {
    score += 2;
  }

  // ---------------------------
  // Device Memory
  // ---------------------------

  if (system.deviceMemory >= 16) {
    score += 5;
  } else if (system.deviceMemory >= 8) {
    score += 4;
  } else if (system.deviceMemory >= 4) {
    score += 3;
  } else {
    score += 1;
  }

  // ---------------------------
  // Language Entropy
  // ---------------------------

  if (system.languages.length > 2) {
    score += 5;
  } else if (system.languages.length > 1) {
    score += 3;
  } else {
    score += 1;
  }

  // ---------------------------
  // Timezone
  // ---------------------------

  if (system.timezone) {
    score += 5;
  }

  // ---------------------------
  // Clamp Score
  // ---------------------------

  score = Math.min(score, 100);

  // ---------------------------
  // Uniqueness Estimate
  // ---------------------------

  const uniqueness = calculateUniqueness(score);

  // ---------------------------
  // Risk Level
  // ---------------------------

  let risk: "Low" | "Medium" | "High";

  if (score >= 75) {
    risk = "High";
  } else if (score >= 45) {
    risk = "Medium";
  } else {
    risk = "Low";
  }

  return {
    score,
    uniqueness,
    risk,
  };
}

function calculateUniqueness(score: number): string {
  if (score >= 90) {
    return "1 in 1,500,000 browsers";
  }

  if (score >= 85) {
    return "1 in 900,000 browsers";
  }

  if (score >= 80) {
    return "1 in 500,000 browsers";
  }

  if (score >= 75) {
    return "1 in 284,000 browsers";
  }

  if (score >= 70) {
    return "1 in 150,000 browsers";
  }

  if (score >= 60) {
    return "1 in 75,000 browsers";
  }

  if (score >= 50) {
    return "1 in 25,000 browsers";
  }

  if (score >= 40) {
    return "1 in 10,000 browsers";
  }

  if (score >= 30) {
    return "1 in 3,000 browsers";
  }

  return "1 in 500 browsers";
}