// src/scan-engine/utils/hash.ts

/**
 * Convert ArrayBuffer to hexadecimal string
 */
function bufferToHex(
  buffer: ArrayBuffer
): string {
  const bytes = new Uint8Array(buffer);

  return Array.from(bytes)
    .map((byte) =>
      byte.toString(16).padStart(2, "0")
    )
    .join("");
}

/**
 * SHA-256 hash
 */
export async function sha256(
  value: string
): Promise<string> {
  const encoder = new TextEncoder();

  const data = encoder.encode(value);

  const hashBuffer =
    await crypto.subtle.digest(
      "SHA-256",
      data
    );

  return bufferToHex(hashBuffer);
}

/**
 * SHA-1 hash
 *
 * Useful for HIBP k-anonymity workflow
 * (Person 3 backend integration)
 */
export async function sha1(
  value: string
): Promise<string> {
  const encoder = new TextEncoder();

  const data = encoder.encode(value);

  const hashBuffer =
    await crypto.subtle.digest(
      "SHA-1",
      data
    );

  return bufferToHex(hashBuffer).toUpperCase();
}

/**
 * Generate short fingerprint hash
 */
export async function shortHash(
  value: string,
  length = 12
): Promise<string> {
  const fullHash =
    await sha256(value);

  return fullHash.slice(0, length);
}

/**
 * Verify SHA-256 hash
 */
export async function verifyHash(
  value: string,
  expectedHash: string
): Promise<boolean> {
  const computedHash =
    await sha256(value);

  return computedHash === expectedHash;
}

/**
 * Generate deterministic fingerprint ID
 */
export async function generateFingerprintId(
  fingerprintPayload: unknown
): Promise<string> {
  const payload =
    JSON.stringify(
      fingerprintPayload
    );

  return sha256(payload);
}