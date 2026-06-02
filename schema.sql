-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  one_liner TEXT NOT NULL,
  role TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  stack JSONB NOT NULL DEFAULT '[]',
  summary TEXT NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]',
  link TEXT,
  type TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Keep existing databases compatible with the current app code.
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 0;

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'planned',
  one_liner TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]',
  last_updated TEXT NOT NULL,
  key_idea TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image_url TEXT,
  reading_time_minutes INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create infographics table
CREATE TABLE IF NOT EXISTS infographics (
  id SERIAL PRIMARY KEY,
  date_posted DATE NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  pinata_cid TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_infographics_date ON infographics(date_posted DESC);
