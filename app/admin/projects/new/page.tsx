import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
    return (
        <div className="max-w-4xl">
            <AdminPageHeader
                eyebrow="New Case Study"
                title="Create Project"
                description="Capture the problem, constraint, intervention, and result in a format that maps cleanly to the public portfolio."
            />
            <div className="operator-panel p-5 md:p-6">
                <ProjectForm mode="create" />
            </div>
        </div>
    );
}
