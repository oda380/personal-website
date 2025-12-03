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
}

export interface Post {
  id?: number; // Optional for creates, required for updates
  title: string;
  slug: string;
  status: 'planned' | 'draft' | 'published';
  oneLiner: string;
  tags: string[];
  lastUpdated: string;
  keyIdea: string;
}
