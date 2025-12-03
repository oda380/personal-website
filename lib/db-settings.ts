import { sql } from '@vercel/postgres';
import { Settings } from './settings';

export async function getSettings(): Promise<Settings> {
    const { rows } = await sql`SELECT key, value FROM settings`;

    const settings: any = {};
    rows.forEach(row => {
        settings[row.key] = row.value;
    });

    return settings as Settings;
}

export async function updateSettings(settings: Partial<Settings>): Promise<void> {
    for (const [key, value] of Object.entries(settings)) {
        if (value !== undefined) {
            await sql`
        INSERT INTO settings (key, value, updated_at)
        VALUES (${key}, ${value}, NOW())
        ON CONFLICT (key) 
        DO UPDATE SET value = ${value}, updated_at = NOW()
      `;
        }
    }
}
