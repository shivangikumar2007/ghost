// src/scan-engine/trackers/trackerDetector.ts

import { TRACKER_DOMAINS } from "./trackerDomains";

import {
  extractHostname,
  matchesDomain,
} from "../utils/domainParser";

import type {
  TrackerDefinition,
  TrackerInfo,
  TrackerDetectionResult,
} from "../types/tracker";

function determineResourceType(
  resource: PerformanceResourceTiming
): string {
  return resource.initiatorType || "unknown";
}

function findTrackerMatch(
  hostname: string
): TrackerDefinition | null {
  const normalized =
    hostname.toLowerCase();

  for (const tracker of TRACKER_DOMAINS) {
    if (
      matchesDomain(
        normalized,
        tracker.domain
      )
    ) {
      return tracker;
    }
  }

  return null;
}

export async function detectTrackers(): Promise<TrackerDetectionResult> {
  const resources =
    performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];

  const trackers: TrackerInfo[] = [];

  const seenTrackers =
    new Set<string>();

  for (const resource of resources) {
    const resourceUrl =
      resource.name;

    if (!resourceUrl) {
      continue;
    }

    const hostname =
      extractHostname(resourceUrl);

    if (!hostname) {
      continue;
    }

    const tracker =
      findTrackerMatch(
        hostname
      );

    if (!tracker) {
      continue;
    }

    const uniqueKey =
      `${tracker.domain}:${hostname}`;

    if (
      seenTrackers.has(
        uniqueKey
      )
    ) {
      continue;
    }

    seenTrackers.add(
      uniqueKey
    );

    trackers.push({
      domain: hostname,

      matchedTracker:
        tracker.domain,

      name: tracker.name,

      category:
        tracker.category,

      resourceUrl,

      resourceType:
        determineResourceType(
          resource
        ),
    });
  }

  trackers.sort((a, b) =>
    a.name.localeCompare(
      b.name
    )
  );

  return {
    count:
      trackers.length,

    trackers,

    scannedResources:
      resources.length,
  };
}

/**
 * Group trackers by category
 * Useful for UI cards and charts
 */
export function categorizeTrackers(
  trackers: TrackerInfo[]
) {
  return trackers.reduce(
    (groups, tracker) => {
      const category =
        tracker.category;

      if (
        !groups[
          category
        ]
      ) {
        groups[
          category
        ] = [];
      }

      groups[
        category
      ].push(
        tracker
      );

      return groups;
    },
    {} as Record<
      string,
      TrackerInfo[]
    >
  );
}

/**
 * Count trackers by category
 * Useful for privacy scoring
 */
export function getTrackerSummary(
  trackers: TrackerInfo[]
) {
  return trackers.reduce(
    (summary, tracker) => {
      const category =
        tracker.category;

      summary[
        category
      ] =
        (summary[
          category
        ] || 0) + 1;

      return summary;
    },
    {} as Record<
      string,
      number
    >
  );
}