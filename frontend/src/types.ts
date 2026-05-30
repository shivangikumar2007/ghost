/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavDropdownItem {
  title: string;
  description: string;
  icon: string;
}

export interface PartnerBrand {
  id: string;
  name: string;
  logoType: string;
  description: string;
  founded: string;
  website: string;
  industry: string;
  colorGlow: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  avatar: string;
  text: string;
  date: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: "Design" | "Development" | "Strategy";
  year: string;
  client: string;
  description: string;
  image: string;
}

export interface OnboardingState {
  step: number;
  userName: string;
  userEmail: string;
  interest: string;
  budget: string;
  isSubmitting: boolean;
  isCompleted: boolean;
}
