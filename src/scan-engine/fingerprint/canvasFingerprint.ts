// src/scan-engine/fingerprint/canvasFingerprint.ts

import { sha256 } from "../utils/hash";

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "../utils/constants";

import type {
  CanvasFingerprintResult,
} from "../types/scanResult";

export async function generateCanvasFingerprint(): Promise<CanvasFingerprintResult> {
  const canvas =
    document.createElement("canvas");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const context =
    canvas.getContext("2d");

  if (!context) {
    return {
      canvasHash:
        "canvas-not-supported",

      canvasDataUrl: "",
    };
  }

  // ==================================================
  // Background Gradient
  // ==================================================

  const gradient =
    context.createLinearGradient(
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

  gradient.addColorStop(
    0,
    "#ff6b6b"
  );

  gradient.addColorStop(
    0.5,
    "#4ecdc4"
  );

  gradient.addColorStop(
    1,
    "#45b7d1"
  );

  context.fillStyle =
    gradient;

  context.fillRect(
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );

  // ==================================================
  // Text Rendering
  // ==================================================

  context.textBaseline =
    "top";

  context.font =
    "18px Arial";

  context.fillStyle =
    "#ffffff";

  context.fillText(
    "Ghost Privacy Scanner 👻",
    10,
    10
  );

  context.font =
    "20px Times New Roman";

  context.fillStyle =
    "#000000";

  context.fillText(
    "Canvas Fingerprint Test",
    12,
    42
  );

  // ==================================================
  // Circle
  // ==================================================

  context.beginPath();

  context.arc(
    80,
    120,
    40,
    0,
    Math.PI * 2,
    true
  );

  context.fillStyle =
    "rgba(255,0,255,0.7)";

  context.fill();

  // ==================================================
  // Rectangle
  // ==================================================

  context.fillStyle =
    "rgba(0,255,0,0.7)";

  context.fillRect(
    150,
    70,
    100,
    70
  );

  // ==================================================
  // Bezier Curve
  // ==================================================

  context.beginPath();

  context.moveTo(
    260,
    120
  );

  context.bezierCurveTo(
    280,
    20,
    340,
    200,
    370,
    80
  );

  context.lineWidth = 5;

  context.strokeStyle =
    "#0000ff";

  context.stroke();

  // ==================================================
  // Rotated Text
  // ==================================================

  context.save();

  context.translate(
    300,
    150
  );

  context.rotate(
    0.2
  );

  context.font =
    "16px Courier New";

  context.fillStyle =
    "#222222";

  context.fillText(
    "Entropy Test",
    0,
    0
  );

  context.restore();

  // ==================================================
  // Deterministic Pixel Pattern
  // ==================================================

  for (
    let i = 0;
    i < 50;
    i++
  ) {
    context.fillStyle =
      `rgba(${i * 5}, ${
        255 - i * 3
      }, ${
        i * 2
      }, 0.3)`;

    context.fillRect(
      (i * 7) %
        CANVAS_WIDTH,

      (i * 11) %
        CANVAS_HEIGHT,

      2,
      2
    );
  }

  // ==================================================
  // Generate Fingerprint
  // ==================================================

  const canvasDataUrl =
    canvas.toDataURL(
      "image/png"
    );

  const canvasHash =
    await sha256(
      canvasDataUrl
    );

  return {
    canvasHash,
    canvasDataUrl,
  };
}