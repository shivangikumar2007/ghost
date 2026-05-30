// src/scan-engine/trackers/trackerDomains.ts

import type {
  TrackerDefinition,
} from "../types/tracker";

export const TRACKER_DOMAINS: TrackerDefinition[] = [
  // =====================================
  // Analytics
  // =====================================

  {
    domain: "google-analytics.com",
    name: "Google Analytics",
    category: "Analytics",
  },
  {
    domain: "googletagmanager.com",
    name: "Google Tag Manager",
    category: "Analytics",
  },
  {
    domain: "clarity.ms",
    name: "Microsoft Clarity",
    category: "Analytics",
  },
  {
    domain: "mixpanel.com",
    name: "Mixpanel",
    category: "Analytics",
  },
  {
    domain: "amplitude.com",
    name: "Amplitude",
    category: "Analytics",
  },
  {
    domain: "heap.io",
    name: "Heap Analytics",
    category: "Analytics",
  },
  {
    domain: "matomo.org",
    name: "Matomo",
    category: "Analytics",
  },
  {
    domain: "yandex.ru",
    name: "Yandex Metrica",
    category: "Analytics",
  },
  {
    domain: "optimizely.com",
    name: "Optimizely",
    category: "Analytics",
  },

  // =====================================
  // Advertising
  // =====================================

  {
    domain: "doubleclick.net",
    name: "DoubleClick",
    category: "Advertising",
  },
  {
    domain: "facebook.net",
    name: "Meta Pixel",
    category: "Advertising",
  },
  {
    domain: "connect.facebook.net",
    name: "Meta Pixel",
    category: "Advertising",
  },
  {
    domain: "adsystem.google.com",
    name: "Google Ads",
    category: "Advertising",
  },
  {
    domain: "adservice.google.com",
    name: "Google Ad Services",
    category: "Advertising",
  },
  {
    domain: "taboola.com",
    name: "Taboola",
    category: "Advertising",
  },
  {
    domain: "outbrain.com",
    name: "Outbrain",
    category: "Advertising",
  },
  {
    domain: "rubiconproject.com",
    name: "Rubicon Project",
    category: "Advertising",
  },
  {
    domain: "pubmatic.com",
    name: "PubMatic",
    category: "Advertising",
  },
  {
    domain: "quantserve.com",
    name: "Quantcast",
    category: "Advertising",
  },
  {
    domain: "scorecardresearch.com",
    name: "Scorecard Research",
    category: "Advertising",
  },
  {
    domain: "bing.com",
    name: "Microsoft Advertising",
    category: "Advertising",
  },
  {
    domain: "linkedin.com",
    name: "LinkedIn Insight Tag",
    category: "Advertising",
  },
  {
    domain: "snapchat.com",
    name: "Snap Pixel",
    category: "Advertising",
  },
  {
    domain: "tiktok.com",
    name: "TikTok Pixel",
    category: "Advertising",
  },
  {
    domain: "adroll.com",
    name: "AdRoll",
    category: "Advertising",
  },
  {
    domain: "criteo.com",
    name: "Criteo",
    category: "Advertising",
  },

  // =====================================
  // Session Recording
  // =====================================

  {
    domain: "hotjar.com",
    name: "Hotjar",
    category: "Session Recording",
  },
  {
    domain: "fullstory.com",
    name: "FullStory",
    category: "Session Recording",
  },
  {
    domain: "mouseflow.com",
    name: "Mouseflow",
    category: "Session Recording",
  },
  {
    domain: "crazyegg.com",
    name: "Crazy Egg",
    category: "Session Recording",
  },

  // =====================================
  // Attribution
  // =====================================

  {
    domain: "branch.io",
    name: "Branch",
    category: "Attribution",
  },
  {
    domain: "appsflyer.com",
    name: "AppsFlyer",
    category: "Attribution",
  },
  {
    domain: "adjust.com",
    name: "Adjust",
    category: "Attribution",
  },
  {
    domain: "kochava.com",
    name: "Kochava",
    category: "Attribution",
  },

  // =====================================
  // Monitoring
  // =====================================

  {
    domain: "sentry.io",
    name: "Sentry",
    category: "Monitoring",
  },
  {
    domain: "newrelic.com",
    name: "New Relic",
    category: "Monitoring",
  },
  {
    domain: "datadoghq.com",
    name: "Datadog",
    category: "Monitoring",
  },

  // =====================================
  // Customer Data Platform
  // =====================================

  {
    domain: "segment.com",
    name: "Segment",
    category: "Customer Data Platform",
  },
  {
    domain: "segment.io",
    name: "Segment",
    category: "Customer Data Platform",
  },

  // =====================================
  // Push Notifications
  // =====================================

  {
    domain: "onesignal.com",
    name: "OneSignal",
    category: "Push Notifications",
  },

  // =====================================
  // Marketing Automation
  // =====================================

  {
    domain: "hubspot.com",
    name: "HubSpot",
    category: "Marketing Automation",
  },
  {
    domain: "marketo.com",
    name: "Adobe Marketo",
    category: "Marketing Automation",
  },
  {
    domain: "pardot.com",
    name: "Salesforce Pardot",
    category: "Marketing Automation",
  },

  // =====================================
  // Additional Common Tracking Domains
  // =====================================

  {
    domain: "akamaihd.net",
    name: "Akamai Tracking",
    category: "Analytics",
  },
];