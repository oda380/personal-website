import 'dotenv/config';
import { sql } from '@vercel/postgres';

async function createSettingsTable() {
    console.log('🚀 Creating settings table...\n');

    try {
        // Create settings table
        await sql`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
        console.log('✅ Settings table created\n');

        // Insert default values
        await sql`
      INSERT INTO settings (key, value) VALUES 
        ('github_url', 'https://github.com/yourusername'),
        ('twitter_url', 'https://twitter.com/yourusername'),
        ('linkedin_url', 'https://linkedin.com/in/yourusername'),
        ('email', 'your.email@example.com')
      ON CONFLICT (key) DO NOTHING
    `;
        console.log('✅ Default settings inserted');

        console.log('\n🎉 Settings table setup complete!');
        console.log('You can now go to /admin/settings to update your links.');

    } catch (error) {
        console.error('❌ Failed to create settings table:', error);
        process.exit(1);
    }
}

createSettingsTable();
