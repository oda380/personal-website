import { sql } from '@vercel/postgres';
import { Project, Post } from './types';

// ============================================================================
// PROJECTS
// ============================================================================

export async function getProjects(): Promise<Project[]> {
    const { rows } = await sql`
    SELECT * FROM projects 
    ORDER BY created_at DESC
  `;

    return rows.map(row => ({
        ...row,
        stack: row.stack as string[],
        highlights: row.highlights as string[],
    })) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const { rows } = await sql`
    SELECT * FROM projects 
    WHERE slug = ${slug}
    LIMIT 1
  `;

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
        ...row,
        stack: row.stack as string[],
        highlights: row.highlights as string[],
    } as Project;
}

export async function getProjectById(id: number): Promise<Project | null> {
    const { rows } = await sql`
    SELECT * FROM projects 
    WHERE id = ${id}
    LIMIT 1
  `;

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
        ...row,
        stack: row.stack as string[],
        highlights: row.highlights as string[],
    } as Project;
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const { rows } = await sql`
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
    RETURNING *
  `;

    const row = rows[0];
    return {
        ...row,
        stack: row.stack as string[],
        highlights: row.highlights as string[],
    } as Project;
}

export async function updateProject(id: number, project: Partial<Omit<Project, 'id'>>): Promise<Project> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (project.title !== undefined) {
        updates.push(`title = $${paramIndex++}`);
        values.push(project.title);
    }
    if (project.slug !== undefined) {
        updates.push(`slug = $${paramIndex++}`);
        values.push(project.slug);
    }
    if (project.oneLiner !== undefined) {
        updates.push(`one_liner = $${paramIndex++}`);
        values.push(project.oneLiner);
    }
    if (project.role !== undefined) {
        updates.push(`role = $${paramIndex++}`);
        values.push(project.role);
    }
    if (project.timeframe !== undefined) {
        updates.push(`timeframe = $${paramIndex++}`);
        values.push(project.timeframe);
    }
    if (project.stack !== undefined) {
        updates.push(`stack = $${paramIndex++}::jsonb`);
        values.push(JSON.stringify(project.stack));
    }
    if (project.summary !== undefined) {
        updates.push(`summary = $${paramIndex++}`);
        values.push(project.summary);
    }
    if (project.highlights !== undefined) {
        updates.push(`highlights = $${paramIndex++}::jsonb`);
        values.push(JSON.stringify(project.highlights));
    }
    if (project.link !== undefined) {
        updates.push(`link = $${paramIndex++}`);
        values.push(project.link);
    }
    if (project.type !== undefined) {
        updates.push(`type = $${paramIndex++}`);
        values.push(project.type);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
    UPDATE projects 
    SET ${updates.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

    const { rows } = await sql.query(query, values);

    const row = rows[0];
    return {
        ...row,
        stack: row.stack as string[],
        highlights: row.highlights as string[],
    } as Project;
}

export async function deleteProject(id: number): Promise<void> {
    await sql`DELETE FROM projects WHERE id = ${id}`;
}

// ============================================================================
// POSTS
// ============================================================================

export async function getPosts(): Promise<Post[]> {
    const { rows } = await sql`
    SELECT * FROM posts 
    ORDER BY created_at DESC
  `;

    return rows.map(row => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        status: row.status,
        oneLiner: row.one_liner,
        tags: row.tags as string[],
        lastUpdated: row.last_updated,
        keyIdea: row.key_idea,
    })) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const { rows } = await sql`
    SELECT * FROM posts 
    WHERE slug = ${slug}
    LIMIT 1
  `;

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        status: row.status,
        oneLiner: row.one_liner,
        tags: row.tags as string[],
        lastUpdated: row.last_updated,
        keyIdea: row.key_idea,
    } as Post;
}

export async function getPostById(id: number): Promise<Post | null> {
    const { rows } = await sql`
    SELECT * FROM posts 
    WHERE id = ${id}
    LIMIT 1
  `;

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        status: row.status,
        oneLiner: row.one_liner,
        tags: row.tags as string[],
        lastUpdated: row.last_updated,
        keyIdea: row.key_idea,
    } as Post;
}

export async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
    const { rows } = await sql`
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
    RETURNING *
  `;

    const row = rows[0];
    return {
        ...row,
        tags: row.tags as string[],
    } as Post;
}

export async function updatePost(id: number, post: Partial<Omit<Post, 'id'>>): Promise<Post> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (post.title !== undefined) {
        updates.push(`title = $${paramIndex++}`);
        values.push(post.title);
    }
    if (post.slug !== undefined) {
        updates.push(`slug = $${paramIndex++}`);
        values.push(post.slug);
    }
    if (post.status !== undefined) {
        updates.push(`status = $${paramIndex++}`);
        values.push(post.status);
    }
    if (post.oneLiner !== undefined) {
        updates.push(`one_liner = $${paramIndex++}`);
        values.push(post.oneLiner);
    }
    if (post.tags !== undefined) {
        updates.push(`tags = $${paramIndex++}::jsonb`);
        values.push(JSON.stringify(post.tags));
    }
    if (post.lastUpdated !== undefined) {
        updates.push(`last_updated = $${paramIndex++}`);
        values.push(post.lastUpdated);
    }
    if (post.keyIdea !== undefined) {
        updates.push(`key_idea = $${paramIndex++}`);
        values.push(post.keyIdea);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
    UPDATE posts 
    SET ${updates.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

    const { rows } = await sql.query(query, values);

    const row = rows[0];
    return {
        ...row,
        tags: row.tags as string[],
    } as Post;
}

export async function deletePost(id: number): Promise<void> {
    await sql`DELETE FROM posts WHERE id = ${id}`;
}
