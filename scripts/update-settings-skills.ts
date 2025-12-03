import 'dotenv/config';
import { sql } from '@vercel/postgres';

const DEFAULT_SKILLS = [
    {
        title: "Web3 Product",
        description: "Designing tokenized loyalty systems, on-chain games, and practical blockchain applications on Base and Ethereum.",
        iconName: "product"
    },
    {
        title: "Full-Stack Dev",
        description: "Building backends with Node.js and TypeScript, creating polished frontends with Next.js and Tailwind CSS.",
        iconName: "code"
    },
    {
        title: "Risk & Operations",
        description: "Combining on-chain analysis with internal tools to trace risk, prevent fraud, and maintain compliance.",
        iconName: "shield"
    }
];

async function updateSettingsSkills() {
    console.log('🚀 Adding home_skills to settings...\n');

    try {
        await sql`
      INSERT INTO settings (key, value) VALUES 
        ('home_skills', ${JSON.stringify(DEFAULT_SKILLS)})
      ON CONFLICT (key) DO NOTHING
    `;
        console.log('✅ Skills setting added');

    } catch (error) {
        console.error('❌ Failed to add skills setting:', error);
        process.exit(1);
    }
}

updateSettingsSkills();
