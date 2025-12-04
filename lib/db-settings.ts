import { sql } from '@vercel/postgres';
import { Settings } from './settings';

export async function getSettings(): Promise<Settings> {
    const { rows } = await sql`SELECT key, value FROM settings`;

    const settings: any = {};
    rows.forEach(row => {
        if (row.key === 'home_skills') {
            try {
                settings[row.key] = JSON.parse(row.value);
            } catch (e) {
                console.error('Failed to parse home_skills:', e);
                settings[row.key] = [];
            }
        } else {
            settings[row.key] = row.value;
        }
    });

    return settings as Settings;
}

export async function updateSettings(settings: Partial<Settings>): Promise<void> {
    for (const [key, value] of Object.entries(settings)) {
        if (value !== undefined) {
            const dbValue: string = key === 'home_skills' ? JSON.stringify(value) : String(value);
            await sql`
        INSERT INTO settings (key, value, updated_at)
        VALUES (${key}, ${dbValue}, NOW())
        ON CONFLICT (key) 
        DO UPDATE SET value = ${dbValue}, updated_at = NOW()
      `;
        }
    }
}
