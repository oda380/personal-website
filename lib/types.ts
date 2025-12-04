// Content model types for the personal website

export interface Skill {
  title: string;
  description: string;
  iconName: string;
}

export interface Settings {
  github_url: string;
  twitter_url: string;
  linkedin_url: string;
  email: string;
  about_content: string;
  profile_image_url?: string;
  home_skills?: Skill[];
}

export interface Project {
  id?: number; // Optional for creates, required for updates
  title: string;
  slug: string;
  oneLiner: string;
  role: string;
  timeframe: string;
  stack: string[];
  summary: string;
  highlights: string[];
  link?: string; // GitHub, live site, or whatever URL showcases the project best
  type: 'web3' | 'web2' | 'mobile' | 'other';
  displayOrder?: number;
}

export interface Post {
  id?: number; // Optional for creates, required for updates
  title: string;
  slug: string;
  status: 'planned' | 'draft' | 'published';

  // New blog fields
  excerpt: string;              // Short description for cards
  content?: string;             // Full markdown content
  featuredImageUrl?: string;    // Featured image URL
  readingTimeMinutes?: number;  // Auto-calculated reading time

  // Legacy fields (keep for backward compatibility)
  oneLiner: string;             // Deprecated: use excerpt
  keyIdea: string;              // Kept for callout boxes

  // Metadata
  tags: string[];
  lastUpdated: string;
}

export interface Infographic {
  id?: number;
  datePosted: string;
  imageUrl: string;
  pinataCid?: string;
}

