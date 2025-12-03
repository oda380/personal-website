import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
    return (
        <div className="p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
            <ProjectForm mode="create" />
        </div>
    );
}
