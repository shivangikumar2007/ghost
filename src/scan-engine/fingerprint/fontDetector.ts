// src/scan-engine/fingerprint/fontDetector.ts

import {
  COMMON_FONTS,
  BASE_FONTS,
} from "../data/commonFonts";

import type {
  FontDetectionResult,
} from "../types/scanResult";

const TEST_STRING =
  "mmmmmmmmmmlliWWWWWWWW1234567890";

const FONT_SIZE = "72px";

interface FontDimensions {
  width: number;
  height: number;
}

/**
 * Fast modern browser detection
 */
async function detectFontsWithAPI(): Promise<string[] | null> {
  try {
    const fontSet =
      (document as Document & {
        fonts?: FontFaceSet;
      }).fonts;

    if (!fontSet?.check) {
      return null;
    }

    const detected: string[] = [];

    for (const font of COMMON_FONTS) {
      try {
        if (
          fontSet.check(
            `16px "${font}"`
          )
        ) {
          detected.push(font);
        }
      } catch {
        // Ignore failures
      }
    }

    return detected;
  } catch {
    return null;
  }
}

function createSpan(
  fontFamily: string
): HTMLSpanElement {
  const span =
    document.createElement(
      "span"
    );

  span.style.position =
    "absolute";

  span.style.left =
    "-9999px";

  span.style.top =
    "-9999px";

  span.style.fontSize =
    FONT_SIZE;

  span.style.fontFamily =
    fontFamily;

  span.style.fontStyle =
    "normal";

  span.style.fontWeight =
    "normal";

  span.style.fontVariant =
    "normal";

  span.style.letterSpacing =
    "0";

  span.style.whiteSpace =
    "nowrap";

  span.textContent =
    TEST_STRING;

  return span;
}

function getDimensions(
  element: HTMLElement
): FontDimensions {
  return {
    width:
      element.offsetWidth,

    height:
      element.offsetHeight,
  };
}

function dimensionsMatch(
  a: FontDimensions,
  b: FontDimensions
): boolean {
  return (
    a.width === b.width &&
    a.height === b.height
  );
}

export async function detectFonts(): Promise<FontDetectionResult> {
  // ==================================================
  // Modern Fast Path
  // ==================================================

  const apiFonts =
    await detectFontsWithAPI();

  if (
    apiFonts &&
    apiFonts.length > 0
  ) {
    apiFonts.sort();

    return {
      installedFonts:
        apiFonts,

      detectedCount:
        apiFonts.length,
    };
  }

  // ==================================================
  // Fallback DOM Measurement Method
  // ==================================================

  const installedFonts: string[] =
    [];

  const container =
    document.createElement(
      "div"
    );

  container.style.position =
    "absolute";

  container.style.left =
    "-9999px";

  container.style.top =
    "-9999px";

  container.style.visibility =
    "hidden";

  document.body.appendChild(
    container
  );

  try {
    const baseMeasurements: Record<
      string,
      FontDimensions
    > = {};

    // ----------------------------
    // Measure Base Fonts
    // ----------------------------

    for (const baseFont of BASE_FONTS) {
      const span =
        createSpan(
          baseFont
        );

      container.appendChild(
        span
      );

      baseMeasurements[
        baseFont
      ] =
        getDimensions(
          span
        );

      container.removeChild(
        span
      );
    }

    // ----------------------------
    // Detect Installed Fonts
    // ----------------------------

    for (const font of COMMON_FONTS) {
      let detected =
        false;

      for (const baseFont of BASE_FONTS) {
        const span =
          createSpan(
            `"${font}", ${baseFont}`
          );

        container.appendChild(
          span
        );

        const dimensions =
          getDimensions(
            span
          );

        container.removeChild(
          span
        );

        if (
          !dimensionsMatch(
            dimensions,
            baseMeasurements[
              baseFont
            ]
          )
        ) {
          detected =
            true;

          break;
        }
      }

      if (detected) {
        installedFonts.push(
          font
        );
      }
    }

    installedFonts.sort();

    return {
      installedFonts,

      detectedCount:
        installedFonts.length,
    };
  } finally {
    if (
      container.parentNode
    ) {
      container.parentNode.removeChild(
        container
      );
    }
  }
}