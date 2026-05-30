// src/scan-engine/utils/domainParser.ts

/**
 * Safely extract hostname from URL
 */
export function extractHostname(
  url: string
): string {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

/**
 * Safely extract origin from URL
 */
export function extractOrigin(
  url: string
): string {
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

/**
 * Get protocol from URL
 */
export function extractProtocol(
  url: string
): string {
  try {
    return new URL(url).protocol;
  } catch {
    return "";
  }
}

/**
 * Get pathname from URL
 */
export function extractPathname(
  url: string
): string {
  try {
    return new URL(url).pathname;
  } catch {
    return "";
  }
}

/**
 * Remove www prefix
 */
export function normalizeDomain(
  domain: string
): string {
  return domain
    .toLowerCase()
    .replace(/^www\./, "");
}

/**
 * Extract root domain
 *
 * Example:
 * blog.google.com -> google.com
 * cdn.facebook.net -> facebook.net
 */
export function getRootDomain(
  hostname: string
): string {
  const normalized =
    normalizeDomain(hostname);

  const parts = normalized.split(".");

  if (parts.length <= 2) {
    return normalized;
  }

  return parts.slice(-2).join(".");
}

/**
 * Check whether hostname matches tracker domain
 */
export function matchesDomain(
  hostname: string,
  trackerDomain: string
): boolean {
  const normalizedHost =
    normalizeDomain(hostname);

  const normalizedTracker =
    normalizeDomain(trackerDomain);

  return (
    normalizedHost === normalizedTracker ||
    normalizedHost.endsWith(
      `.${normalizedTracker}`
    )
  );
}

/**
 * Check if URL is third-party
 */
export function isThirdPartyResource(
  resourceUrl: string,
  currentHost?: string
): boolean {
  try {
    const resourceHost =
      normalizeDomain(
        extractHostname(resourceUrl)
      );

    const pageHost =
      normalizeDomain(
        currentHost ||
          window.location.hostname
      );

    return (
      getRootDomain(resourceHost) !==
      getRootDomain(pageHost)
    );
  } catch {
    return false;
  }
}

/**
 * Check if URL is first-party
 */
export function isFirstPartyResource(
  resourceUrl: string,
  currentHost?: string
): boolean {
  return !isThirdPartyResource(
    resourceUrl,
    currentHost
  );
}

/**
 * Extract query parameters
 */
export function getQueryParams(
  url: string
): Record<string, string> {
  try {
    const parsedUrl = new URL(url);

    const params: Record<
      string,
      string
    > = {};

    parsedUrl.searchParams.forEach(
      (value, key) => {
        params[key] = value;
      }
    );

    return params;
  } catch {
    return {};
  }
}

/**
 * Check whether URL is valid
 */
export function isValidUrl(
  url: string
): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get file extension from URL
 */
export function getFileExtension(
  url: string
): string {
  try {
    const pathname =
      new URL(url).pathname;

    const parts = pathname.split(".");

    if (parts.length < 2) {
      return "";
    }

    return parts
      [parts.length - 1]
      .toLowerCase();
  } catch {
    return "";
  }
}

/**
 * Determine resource type from URL
 */
export function inferResourceType(
  url: string
):
  | "script"
  | "image"
  | "stylesheet"
  | "font"
  | "api"
  | "document"
  | "unknown" {
  const ext = getFileExtension(url);

  if (
    [
      "js",
      "mjs",
      "cjs",
    ].includes(ext)
  ) {
    return "script";
  }

  if (
    [
      "png",
      "jpg",
      "jpeg",
      "gif",
      "svg",
      "webp",
      "avif",
      "ico",
    ].includes(ext)
  ) {
    return "image";
  }

  if (
    ["css"].includes(ext)
  ) {
    return "stylesheet";
  }

  if (
    [
      "woff",
      "woff2",
      "ttf",
      "otf",
      "eot",
    ].includes(ext)
  ) {
    return "font";
  }

  if (
    pathnameLooksLikeApi(url)
  ) {
    return "api";
  }

  if (
    ["html", "htm"].includes(ext)
  ) {
    return "document";
  }

  return "unknown";
}

/**
 * API endpoint detection
 */
function pathnameLooksLikeApi(
  url: string
): boolean {
  try {
    const pathname =
      new URL(url).pathname.toLowerCase();

    return (
      pathname.includes("/api/") ||
      pathname.startsWith("/api") ||
      pathname.includes("/graphql") ||
      pathname.includes("/collect") ||
      pathname.includes("/track") ||
      pathname.includes("/analytics")
    );
  } catch {
    return false;
  }
}