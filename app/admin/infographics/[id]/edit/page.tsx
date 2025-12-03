import { notFound } from 'next/navigation';
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
        <div className="p-8">
            <div className="max-w-3xl">
                <h1 className="text-3xl font-bold mb-2">Edit Infographic</h1>
                <p className="text-[hsl(var(--muted-foreground))] mb-8">
                    Update your crypto news infographic
                </p>

                <InfographicForm
                    mode="edit"
                    initialData={infographic}
                />
            </div>
        </div>
    );
}
