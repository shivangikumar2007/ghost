import type { GhostScanResult } from "../scan-engine/types/scanResult";

type ScanListener = (result: GhostScanResult | null) => void;

class GhostScanStore {
  private scanResult: GhostScanResult | null = null;
  private listeners: Set<ScanListener> = new Set();

  /**
   * Save latest scan result
   */
  public set(result: GhostScanResult): void {
    this.scanResult = result;
    this.notify();
  }

  /**
   * Get latest scan result
   */
  public get(): GhostScanResult | null {
    return this.scanResult;
  }

  /**
   * Clear scan result
   */
  public clear(): void {
    this.scanResult = null;
    this.notify();
  }

  /**
   * Check whether scan exists
   */
  public hasResult(): boolean {
    return this.scanResult !== null;
  }

  /**
   * Subscribe to updates
   * Returns unsubscribe function
   */
  public subscribe(listener: ScanListener): () => void {
    this.listeners.add(listener);

    // Immediately send current value
    listener(this.scanResult);

    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all subscribers
   */
  private notify(): void {
    this.listeners.forEach((listener) => {
      listener(this.scanResult);
    });
  }
}

const ghostScanStore = new GhostScanStore();

export default ghostScanStore;