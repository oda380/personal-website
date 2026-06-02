import { notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { isCurrentUserAdmin } from '@/lib/admin-auth';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAdmin = await isCurrentUserAdmin();

    if (!isAdmin) {
        notFound();
    }

    return <AdminShell>{children}</AdminShell>;
}
