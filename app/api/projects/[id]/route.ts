import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProjectById, updateProject, deleteProject } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

type Params = Promise<{ id: string }>;

// GET /api/projects/[id] - Get single project
export async function GET(
    request: NextRequest,
    props: { params: Params }
) {
    const params = await props.params;
    try {
        const id = parseInt(params.id);
        const project = await getProjectById(id);

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        );
    }
}

// PUT /api/projects/[id] - Update project (admin required)
export async function PUT(
    request: NextRequest,
    props: { params: Params }
) {
    const params = await props.params;
    try {
        const admin = await requireAdmin();

        if (!admin.authorized) {
            return NextResponse.json(
                { error: admin.error },
                { status: admin.status }
            );
        }

        const id = parseInt(params.id);
        const body = await request.json();
        const project = await updateProject(id, body);

        revalidatePath('/projects');
        revalidatePath('/admin/projects');

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        );
    }
}

// DELETE /api/projects/[id] - Delete project (admin required)
export async function DELETE(
    request: NextRequest,
    props: { params: Params }
) {
    const params = await props.params;
    try {
        const admin = await requireAdmin();

        if (!admin.authorized) {
            return NextResponse.json(
                { error: admin.error },
                { status: admin.status }
            );
        }

        const id = parseInt(params.id);
        await deleteProject(id);

        revalidatePath('/projects');
        revalidatePath('/admin/projects');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}
