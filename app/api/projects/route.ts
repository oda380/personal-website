import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProjects, createProject } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

// GET /api/projects - List all projects
export async function GET() {
    try {
        const projects = await getProjects();
        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

// POST /api/projects - Create new project (admin required)
export async function POST(request: NextRequest) {
    try {
        const admin = await requireAdmin();

        if (!admin.authorized) {
            return NextResponse.json(
                { error: admin.error },
                { status: admin.status }
            );
        }

        const body = await request.json();
        const project = await createProject(body);

        revalidatePath('/projects');
        revalidatePath('/admin/projects');

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
