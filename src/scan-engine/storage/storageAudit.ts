// src/scan-engine/storage/storageAudit.ts

export type StorageRisk =
  | "Low"
  | "Medium"
  | "High";

export interface StorageAuditResult {
  cookies: {
    count: number;
    names: string[];
    firstParty: number;
    thirdParty: string;
  };

  localStorage: {
    count: number;
    keys: string[];
    estimatedSizeBytes: number;
  };

  sessionStorage: {
    count: number;
    keys: string[];
    estimatedSizeBytes: number;
  };

  totals: {
    storageItems: number;
    estimatedSizeBytes: number;
  };

  risk: StorageRisk;
}

function calculateStorageSize(
  storage: Storage
): number {
  let size = 0;

  try {
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);

      if (!key) continue;

      const value =
        storage.getItem(key) ?? "";

      size += key.length;
      size += value.length;
    }
  } catch {
    return 0;
  }

  return size;
}

function getStorageKeys(
  storage: Storage
): string[] {
  const keys: string[] = [];

  try {
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);

      if (key) {
        keys.push(key);
      }
    }
  } catch {
    return [];
  }

  return keys;
}

function parseCookies(): string[] {
  try {
    if (!document.cookie.trim()) {
      return [];
    }

    return document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map(
        (cookie) =>
          cookie.split("=")[0]
      );
  } catch {
    return [];
  }
}

function calculateRisk(
  totalItems: number,
  totalSize: number
): StorageRisk {
  // Large storage footprint
  if (
    totalItems >= 20 ||
    totalSize >= 50000
  ) {
    return "High";
  }

  // Moderate storage footprint
  if (
    totalItems >= 10 ||
    totalSize >= 10000
  ) {
    return "Medium";
  }

  return "Low";
}

export async function auditStorage(): Promise<StorageAuditResult> {
  // -------------------------
  // Cookies
  // -------------------------

  const cookieNames =
    parseCookies();

  const cookieCount =
    cookieNames.length;

  // -------------------------
  // Local Storage
  // -------------------------

  const localStorageKeys =
    getStorageKeys(
      localStorage
    );

  const localStorageSize =
    calculateStorageSize(
      localStorage
    );

  // -------------------------
  // Session Storage
  // -------------------------

  const sessionStorageKeys =
    getStorageKeys(
      sessionStorage
    );

  const sessionStorageSize =
    calculateStorageSize(
      sessionStorage
    );

  // -------------------------
  // Totals
  // -------------------------

  const totalItems =
    cookieCount +
    localStorageKeys.length +
    sessionStorageKeys.length;

  const totalSize =
    localStorageSize +
    sessionStorageSize;

  const risk =
    calculateRisk(
      totalItems,
      totalSize
    );

  return {
    cookies: {
      count: cookieCount,
      names: cookieNames,

      firstParty:
        cookieCount,

      thirdParty:
        "Restricted by browser security",
    },

    localStorage: {
      count:
        localStorageKeys.length,

      keys: localStorageKeys,

      estimatedSizeBytes:
        localStorageSize,
    },

    sessionStorage: {
      count:
        sessionStorageKeys.length,

      keys:
        sessionStorageKeys,

      estimatedSizeBytes:
        sessionStorageSize,
    },

    totals: {
      storageItems:
        totalItems,

      estimatedSizeBytes:
        totalSize,
    },

    risk,
  };
}