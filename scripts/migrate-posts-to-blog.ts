import { config } from 'dotenv';
import { sql } from '@vercel/postgres';

// Load environment variables from .env.local
config({ path: '.env.local' });

/**
 * Migration script to add blog-specific fields to the posts table
 * Run this with: npx tsx scripts/migrate-posts-to-blog.ts
 */

async function migratePosts() {
    try {
        console.log('🔄 Starting posts to blog migration...');

        // Add new columns to posts table
        await sql`
            ALTER TABLE posts 
            ADD COLUMN IF NOT EXISTS content TEXT,
            ADD COLUMN IF NOT EXISTS excerpt TEXT,
            ADD COLUMN IF NOT EXISTS featured_image_url TEXT,
            ADD COLUMN IF NOT EXISTS reading_time_minutes INTEGER DEFAULT 0
        `;

        console.log('✅ Added new columns to posts table');

        // Migrate existing data: copy one_liner to excerpt for existing posts
        await sql`
            UPDATE posts 
            SET excerpt = one_liner 
            WHERE excerpt IS NULL
        `;

        console.log('✅ Migrated one_liner data to excerpt field');

        // Set default reading time for existing posts (1 minute as placeholder)
        await sql`
            UPDATE posts 
            SET reading_time_minutes = 1 
            WHERE reading_time_minutes IS NULL OR reading_time_minutes = 0
        `;

        console.log('✅ Set default reading time for existing posts');

        console.log('🎉 Migration completed successfully!');
        console.log('');
        console.log('Summary:');
        console.log('  - Added: content (TEXT)');
        console.log('  - Added: excerpt (TEXT)');
        console.log('  - Added: featured_image_url (TEXT)');
        console.log('  - Added: reading_time_minutes (INTEGER)');
        console.log('');
        console.log('Note: old fields (one_liner, key_idea) are kept for backward compatibility');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    }
}

migratePosts()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
