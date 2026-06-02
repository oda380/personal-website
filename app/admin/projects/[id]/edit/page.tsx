import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ProjectForm from '@/components/admin/ProjectForm';
import { getProjectById } from '@/lib/db';

type Params = Promise<{ id: string }>;

export default async function EditProjectPage(props: { params: Params }) {
    const params = await props.params;
    const project = await getProjectById(parseInt(params.id));

    return (
        <div className="max-w-4xl">
            <AdminPageHeader
                eyebrow="Case Study Editor"
                title="Edit Project"
                description="Adjust the public-facing proof point without changing its underlying record."
            />
            <div className="operator-panel p-5 md:p-6">
                <ProjectForm project={project} mode="edit" />
            </div>
        </div>
    );
}
