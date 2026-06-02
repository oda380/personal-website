import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { InfographicForm } from '@/components/admin/InfographicForm';

export default function NewInfographicPage() {
    return (
        <div className="max-w-3xl">
            <AdminPageHeader
                eyebrow="Daily Visual"
                title="Add Today&apos;s Crypto"
                description="Upload the daily crypto news infographic and attach it to the correct publication date."
            />
            <div className="operator-panel p-5 md:p-6">
                <InfographicForm mode="create" />
            </div>
        </div>
    );
}
