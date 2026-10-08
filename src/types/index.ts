export interface Initiative {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  iconName: string;
  summary: string;
  image: string;
  problem: string;
  proposedSolution: string;
  benefits: string[];
  implementationSteps: string[];
  metrics: {
    label: string;
    target: string;
  };
}

export interface Question {
  id: number;
  text: string;
  description: string;
  category: string;
  points: number;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
  impactTag: string;
  image: string;
  schedule: string;
  volunteersNeeded: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ALL' | 'CAMPUS' | 'NATURE' | 'STUDENTS' | 'ENERGY' | 'WASTE' | 'WATER';
  caption: string;
  url: string;
  tag: string;
}

export interface TimelineStep {
  step: string;
  title: string;
  subheading: string;
  description: string;
  actionItems: string[];
}

export type VolunteerStatus = 'Pending' | 'Approved' | 'Rejected';

export interface VolunteerSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  department: string;
  year: string;
  activity: string;
  message?: string;
  status: VolunteerStatus;
}

export interface InstitutionCard {
  id: string;
  name: string;
  shortName: string;
  fullName: string;
  location: string;
  affiliation: string;
  tagline: string;
  description: string;
  greenFocus: string;
  greenHighlights: string[];
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
  websiteUrl?: string;
}
