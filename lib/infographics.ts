import { sql } from '@vercel/postgres';

export interface Infographic {
    id?: number;
    datePosted: string;
    imageUrl: string;
    pinataCid?: string;
}

// Get all infographics, ordered by date DESC
export async function getInfographics(limit?: number, month?: number, year?: number): Promise<Infographic[]> {
    let query;

    if (month && year) {
        // Filter by specific month and year
        // Note: We use TO_CHAR for simpler date part extraction in the WHERE clause compatibility
        query = sql`
            SELECT * FROM infographics 
            WHERE EXTRACT(YEAR FROM date_posted) = ${year} 
            AND EXTRACT(MONTH FROM date_posted) = ${month}
            ORDER BY date_posted DESC
        `;
    } else {
        query = limit
            ? sql`SELECT * FROM infographics ORDER BY date_posted DESC LIMIT ${limit}`
            : sql`SELECT * FROM infographics ORDER BY date_posted DESC`;
    }

    const result = await query;

    return result.rows.map(row => ({
        id: row.id,
        datePosted: row.date_posted,
        imageUrl: row.image_url,
        pinataCid: row.pinata_cid
    }));
}

// Get available months for filtering
export async function getAvailableMonths(): Promise<string[]> {
    const result = await sql`
        SELECT DISTINCT TO_CHAR(date_posted, 'YYYY-MM') as month_year 
        FROM infographics 
        ORDER BY month_year DESC
    `;

    return result.rows.map(row => row.month_year);
}

// Get all dates that have posts
export async function getPostedDates(): Promise<string[]> {
    const result = await sql`
        SELECT DISTINCT TO_CHAR(date_posted, 'YYYY-MM-DD') as date_str
        FROM infographics 
        ORDER BY date_str DESC
    `;

    return result.rows.map(row => row.date_str);
}

// Get latest infographic
export async function getLatestInfographic(): Promise<Infographic | null> {
    const result = await sql`
    SELECT * FROM infographics 
    ORDER BY date_posted DESC 
    LIMIT 1
  `;

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
        id: row.id,
        datePosted: row.date_posted,
        imageUrl: row.image_url,
        pinataCid: row.pinata_cid
    };
}

// Get infographic by date
export async function getInfographicByDate(date: string): Promise<Infographic | null> {
    const result = await sql`
    SELECT * FROM infographics 
    WHERE date_posted = ${date}
  `;

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
        id: row.id,
        datePosted: row.date_posted,
        imageUrl: row.image_url,
        pinataCid: row.pinata_cid
    };
}

// Get infographic by ID
export async function getInfographicById(id: number): Promise<Infographic | null> {
    const result = await sql`
    SELECT * FROM infographics 
    WHERE id = ${id}
  `;

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
        id: row.id,
        datePosted: row.date_posted,
        imageUrl: row.image_url,
        pinataCid: row.pinata_cid
    };
}

// Create new infographic
export async function createInfographic(data: Omit<Infographic, 'id'>): Promise<Infographic> {
    const result = await sql`
    INSERT INTO infographics (date_posted, image_url, pinata_cid)
    VALUES (${data.datePosted}, ${data.imageUrl}, ${data.pinataCid || null})
    RETURNING *
  `;

    const row = result.rows[0];
    return {
        id: row.id,
        datePosted: row.date_posted,
        imageUrl: row.image_url,
        pinataCid: row.pinata_cid
    };
}

// Update infographic
export async function updateInfographic(
    id: number,
    data: Partial<Omit<Infographic, 'id'>>
): Promise<Infographic> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.datePosted !== undefined) {
        updates.push(`date_posted = $${paramIndex++}`);
        values.push(data.datePosted);
    }
    if (data.imageUrl !== undefined) {
        updates.push(`image_url = $${paramIndex++}`);
        values.push(data.imageUrl);
    }
    if (data.pinataCid !== undefined) {
        updates.push(`pinata_cid = $${paramIndex++}`);
        values.push(data.pinataCid);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
    UPDATE infographics 
    SET ${updates.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

    const result = await sql.query(query, values);
    const row = result.rows[0];

    return {
        id: row.id,
        datePosted: row.date_posted,
        imageUrl: row.image_url,
        pinataCid: row.pinata_cid
    };
}

// Delete infographic
export async function deleteInfographic(id: number): Promise<void> {
    await sql`DELETE FROM infographics WHERE id = ${id}`;
}
