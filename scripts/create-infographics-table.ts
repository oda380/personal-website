import { sql } from '@vercel/postgres';

async function createInfographicsTable() {
    try {
        console.log('Creating infographics table...');

        await sql`
            CREATE TABLE IF NOT EXISTS infographics (
                id SERIAL PRIMARY KEY,
                date_posted DATE NOT NULL UNIQUE,
                image_url TEXT NOT NULL,
                pinata_cid TEXT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `;

        console.log('✓ Table created successfully');

        await sql`
            CREATE INDEX IF NOT EXISTS idx_infographics_date 
            ON infographics(date_posted DESC);
        `;

        console.log('✓ Index created successfully');

        console.log('\n✅ Infographics table setup complete!');
    } catch (error) {
        console.error('❌ Error creating infographics table:', error);
        throw error;
    }
}

createInfographicsTable();
