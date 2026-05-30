// src/scan-engine/types/tracker.ts

export type TrackerCategory =
  | "Analytics"
  | "Advertising"
  | "Session Recording"
  | "Attribution"
  | "Monitoring"
  | "Customer Data Platform"
  | "Push Notifications"
  | "Marketing Automation";

export interface TrackerDefinition {
  domain: string;
  name: string;
  category: TrackerCategory;
}

export interface TrackerInfo {
  domain: string;
  matchedTracker: string;
  name: string;
  category: TrackerCategory;
  resourceUrl: string;
  resourceType: string;
}

export interface TrackerDetectionResult {
  count: number;
  trackers: TrackerInfo[];
  scannedResources: number;
}

export interface TrackerSummary {
  analytics: number;
  advertising: number;
  sessionRecording: number;
  attribution: number;
  monitoring: number;
  customerDataPlatform: number;
  pushNotifications: number;
  marketingAutomation: number;
}

export interface CategorizedTrackers {
  Analytics: TrackerInfo[];
  Advertising: TrackerInfo[];
  "Session Recording": TrackerInfo[];
  Attribution: TrackerInfo[];
  Monitoring: TrackerInfo[];
  "Customer Data Platform": TrackerInfo[];
  "Push Notifications": TrackerInfo[];
  "Marketing Automation": TrackerInfo[];
}