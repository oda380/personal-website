import 'dotenv/config';
import { sql } from '@vercel/postgres';
import { projects } from '../lib/projects';
import { posts } from '../lib/posts';

/**
 * Migration script to move data from TypeScript files to Vercel Postgres database
 * Run this once after setting up the database
 */

async function migrate() {
  console.log('🚀 Starting migration...\n');

  try {
    // Create tables
    console.log('📋 Creating tables...');
    await sql`
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
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        status TEXT NOT NULL DEFAULT 'planned',
        one_liner TEXT NOT NULL,
        tags JSONB NOT NULL DEFAULT '[]',
        last_updated TEXT NOT NULL,
        key_idea TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status)`;

    console.log('✅ Tables created\n');

    // Migrate projects
    console.log('📦 Migrating projects...');
    for (const project of projects) {
      await sql`
        INSERT INTO projects (
          title, slug, one_liner, role, timeframe,
          stack, summary, highlights, link, type
        )
        VALUES (
          ${project.title},
          ${project.slug},
          ${project.oneLiner},
          ${project.role},
          ${project.timeframe},
          ${JSON.stringify(project.stack)}::jsonb,
          ${project.summary},
          ${JSON.stringify(project.highlights)}::jsonb,
          ${project.link || null},
          ${project.type}
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          one_liner = EXCLUDED.one_liner,
          role = EXCLUDED.role,
          timeframe = EXCLUDED.timeframe,
          stack = EXCLUDED.stack,
          summary = EXCLUDED.summary,
          highlights = EXCLUDED.highlights,
          link = EXCLUDED.link,
          type = EXCLUDED.type,
          updated_at = NOW()
      `;
      console.log(`  ✓ ${project.title}`);
    }
    console.log(`✅ Migrated ${projects.length} projects\n`);

    // Migrate posts
    console.log('📝 Migrating posts...');
    for (const post of posts) {
      await sql`
        INSERT INTO posts (
          title, slug, status, one_liner,
          tags, last_updated, key_idea
        )
        VALUES (
          ${post.title},
          ${post.slug},
          ${post.status},
          ${post.oneLiner},
          ${JSON.stringify(post.tags)}::jsonb,
          ${post.lastUpdated},
          ${post.keyIdea}
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          status = EXCLUDED.status,
          one_liner = EXCLUDED.one_liner,
          tags = EXCLUDED.tags,
          last_updated = EXCLUDED.last_updated,
          key_idea = EXCLUDED.key_idea,
          updated_at = NOW()
      `;
      console.log(`  ✓ ${post.title}`);
    }
    console.log(`✅ Migrated ${posts.length} posts\n`);

    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
