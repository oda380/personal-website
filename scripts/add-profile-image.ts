import 'dotenv/config';
import { sql } from '@vercel/postgres';

async function addProfileImageSetting() {
    console.log('🚀 Adding profile_image_url to settings...\n');

    try {
        // Add profile_image_url to settings if not exists
        await sql`
      INSERT INTO settings (key, value) VALUES 
        ('profile_image_url', '')
      ON CONFLICT (key) DO NOTHING
    `;
        console.log('✅ Profile image setting added');

    } catch (error) {
        console.error('❌ Failed to add profile image setting:', error);
        process.exit(1);
    }
}

addProfileImageSetting();
