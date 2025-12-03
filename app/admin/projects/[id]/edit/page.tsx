import ProjectForm from '@/components/admin/ProjectForm';
import { getProjectById } from '@/lib/db';

type Params = Promise<{ id: string }>;

export default async function EditProjectPage(props: { params: Params }) {
    const params = await props.params;
    const project = await getProjectById(parseInt(params.id));

    return (
        <div className="p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
            <ProjectForm project={project} mode="edit" />
        </div>
    );
}
