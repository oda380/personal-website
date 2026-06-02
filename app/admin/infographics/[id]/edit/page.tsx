import { notFound } from 'next/navigation';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { getInfographicById } from '@/lib/infographics';
import { InfographicForm } from '@/components/admin/InfographicForm';

export default async function EditInfographicPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const infographic = await getInfographicById(parseInt(id));

    if (!infographic) {
        notFound();
    }

    return (
        <div className="max-w-3xl">
            <AdminPageHeader
                eyebrow="Daily Visual Editor"
                title="Edit Infographic"
                description="Update the uploaded image or publication date for an existing daily crypto record."
            />
            <div className="operator-panel p-5 md:p-6">
                <InfographicForm
                    mode="edit"
                    initialData={infographic}
                />
            </div>
        </div>
    );
}
