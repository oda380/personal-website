import { InfographicForm } from '@/components/admin/InfographicForm';

export default function NewInfographicPage() {
    return (
        <div className="p-8">
            <div className="max-w-3xl">
                <h1 className="text-3xl font-bold mb-2">Add Today&apos;s Crypto</h1>
                <p className="text-[hsl(var(--muted-foreground))] mb-8">
                    Upload your daily crypto news infographic
                </p>

                <InfographicForm mode="create" />
            </div>
        </div>
    );
}
