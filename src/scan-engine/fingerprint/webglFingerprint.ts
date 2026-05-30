// src/scan-engine/fingerprint/webglFingerprint.ts

export interface WebGLFingerprintResult {
  gpuVendor: string;
  gpuRenderer: string;
  webglVersion: string;
  shadingLanguageVersion: string;
  supported: boolean;
}

export async function getWebGLFingerprint(): Promise<WebGLFingerprintResult> {
  const canvas = document.createElement("canvas");

  const gl =
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl");

  if (!gl) {
    return {
      gpuVendor: "Unknown",
      gpuRenderer: "WebGL Not Supported",
      webglVersion: "Unknown",
      shadingLanguageVersion: "Unknown",
      supported: false,
    };
  }

  const webglContext = gl as WebGLRenderingContext;

  let gpuVendor = "Unknown";
  let gpuRenderer = "Unknown";

  try {
    const debugInfo = webglContext.getExtension(
      "WEBGL_debug_renderer_info"
    );

    if (debugInfo) {
      gpuVendor =
        webglContext.getParameter(
          debugInfo.UNMASKED_VENDOR_WEBGL
        ) || "Unknown";

      gpuRenderer =
        webglContext.getParameter(
          debugInfo.UNMASKED_RENDERER_WEBGL
        ) || "Unknown";
    } else {
      gpuVendor =
        webglContext.getParameter(
          webglContext.VENDOR
        ) || "Unknown";

      gpuRenderer =
        webglContext.getParameter(
          webglContext.RENDERER
        ) || "Unknown";
    }
  } catch {
    // Some browsers block access
  }

  let webglVersion = "Unknown";
  let shadingLanguageVersion = "Unknown";

  try {
    webglVersion =
      webglContext.getParameter(
        webglContext.VERSION
      ) || "Unknown";

    shadingLanguageVersion =
      webglContext.getParameter(
        webglContext.SHADING_LANGUAGE_VERSION
      ) || "Unknown";
  } catch {
    // Ignore failures
  }

  return {
    gpuVendor,
    gpuRenderer,
    webglVersion,
    shadingLanguageVersion,
    supported: true,
  };
}