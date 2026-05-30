/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NavDropdownItem, PartnerBrand, ProjectItem, Testimonial } from "./types";

export const FEATURE_ITEMS: NavDropdownItem[] = [
  {
    title: "Human-Centric Core",
    description: "Interfaces aligned perfectly with natural user behavior patterns.",
    icon: "Heart",
  },
  {
    title: "Performance Engines",
    description: "Sub-millisecond static loads and rendering optimization.",
    icon: "Zap",
  },
  {
    title: "Empathetic Logic",
    description: "Algorithmic pipelines built to serve real user intentions.",
    icon: "User",
  },
  {
    title: "System Harmony",
    description: "Cross-platform consistency that feels unified from day one.",
    icon: "Sparkles",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Genevieve Mercer",
    role: "VP of Product",
    company: "Zantic Labs",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    text: "Fluxora completely recalibrated our understanding of user engagement. Their focus on humane design boosted our activation metrics by 42%.",
    date: "2 months ago",
  },
  {
    id: "test-2",
    name: "Adrian Thorne",
    role: "Creative Director",
    company: "Waverio",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    text: "Working with high contrast aesthetics and bold layouts was tricky, but Fluxora translated it with breathtaking precision. Highly recommended.",
    date: "1 month ago",
  },
  {
    id: "test-3",
    name: "Clara Vance",
    role: "Founding Engineer",
    company: "Crona Inc.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    text: "Their optimization standard is flawless. We reached absolute perfection in page load responses while maintaining stunning visual motion elements.",
    date: "3 weeks ago",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "Minimalist BookStore Engine",
    category: "Development",
    year: "2026",
    client: "BookStore Global",
    description: "A serverless high-speed collection server serving over 4 million titles daily with zero latency.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "proj-2",
    name: "Zantic Spatial Node",
    category: "Design",
    year: "2025",
    client: "Zantic Tech",
    description: "Immersive dark Mode workspace for spatial analysis and coordinate mapping APIs.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "proj-3",
    name: "Crona Core Redux",
    category: "Strategy",
    year: "2026",
    client: "Crona Enterprise",
    description: "Re-imagining B2B interaction models without relying on dark patterns or excessive screens.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "proj-4",
    name: "Waverio Audio Hub",
    category: "Development",
    year: "2025",
    client: "Waverio Music",
    description: "Developing clean canvas elements for physical waveform monitoring and remote audio mixing.",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80",
  },
];

export const PARTNER_BRANDS: PartnerBrand[] = [
  {
    id: "brand-1",
    name: "BookStore",
    logoType: "book",
    description: "Curators of digital literature, unifying traditional publishing layouts with fast static deployment.",
    founded: "2021",
    website: "https://books.fluxora-partner.com",
    industry: "Publishing Tech",
    colorGlow: "rgba(249, 115, 22, 0.15)", // Subtle Orange
  },
  {
    id: "brand-2",
    name: "zantic",
    logoType: "cross",
    description: "Architects of telemetry boards, creating multi-dimensional data models for hardware controllers.",
    founded: "2019",
    website: "https://zantic.fluxora-partner.com",
    industry: "Hardware Telemetry",
    colorGlow: "rgba(14, 165, 233, 0.15)", // Subtle Sky Blue
  },
  {
    id: "brand-3",
    name: "Crona",
    logoType: "diamond",
    description: "Decentralized accounting routers optimizing enterprise transaction speeds by magnitudes.",
    founded: "2023",
    website: "https://crona.fluxora-partner.com",
    industry: "Enterprise Routers",
    colorGlow: "rgba(168, 85, 247, 0.15)", // Subtle Purple
  },
  {
    id: "brand-4",
    name: "Mercury",
    logoType: "wave",
    description: "High-frequency liquid state metrics providing real-time analytics to clean-energy pipelines.",
    founded: "2022",
    website: "https://mercury.fluxora-partner.com",
    industry: "Clean-Energy Logs",
    colorGlow: "rgba(34, 197, 94, 0.15)", // Subtle Green
  },
  {
    id: "brand-5",
    name: "Waverio",
    logoType: "circles",
    description: "Auditory space synthesis solutions bringing zero-buffer high-fidelity acoustics to standard browsers.",
    founded: "2024",
    website: "https://waverio.fluxora-partner.com",
    industry: "Audio Engineering",
    colorGlow: "rgba(239, 68, 68, 0.15)", // Subtle Red
  },
];
