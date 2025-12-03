import 'dotenv/config';
import { sql } from '@vercel/postgres';

async function addAboutContent() {
    console.log('🚀 Adding about content to settings...\n');

    try {
        // Add about_content to settings
        await sql`
      INSERT INTO settings (key, value) VALUES 
        ('about_content', 'I''m a product builder focused on Web3 and blockchain technology. I lead the development of decentralized applications that bridge traditional business models with crypto-native experiences.\n\nCurrently building loyalty systems and developer tools in the Web3 space. Interested in on-chain primitives, MEV, and creating products that make blockchain technology accessible.')
      ON CONFLICT (key) DO NOTHING
    `;
        console.log('✅ About content added to settings');

        console.log('\n🎉 Setup complete!');

    } catch (error) {
        console.error('❌ Failed to add about content:', error);
        process.exit(1);
    }
}

addAboutContent();
