import Link from 'next/link';
import { getInfographics, getInfographicsCount } from '@/lib/infographics';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import AdminInfographicActions from '@/components/admin/AdminInfographicActions';
import AdminFilter from '@/components/admin/AdminFilter';
import Pagination from '@/components/admin/Pagination';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminInfographicsPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const year = typeof resolvedParams.year === 'string' ? parseInt(resolvedParams.year) : undefined;
    const month = typeof resolvedParams.month === 'string' ? parseInt(resolvedParams.month) : undefined;
    const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const [infographics, totalCount] = await Promise.all([
        getInfographics(limit, offset, month, year),
        getInfographicsCount(month, year)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div>
            <AdminPageHeader
                eyebrow="Visual Feed"
                title="Daily Crypto"
                description="Upload and maintain the daily crypto infographic archive."
                action={
                    <>
                    <AdminFilter />
                    <Link href="/admin/infographics/new">
                        <Button variant="primary" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Today&apos;s Crypto
                        </Button>
                    </Link>
                    </>
                }
            />

            {infographics.length === 0 ? (
                <div className="operator-panel border-dashed py-16 text-center">
                    <p className="operator-label mb-2">No Records</p>
                    <p className="mb-5 text-sm text-[hsl(var(--muted-foreground))]">No infographics yet</p>
                    <Link href="/admin/infographics/new">
                        <Button variant="primary">Create Your First Infographic</Button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="operator-panel overflow-hidden">
                        <table className="w-full">
                            <thead className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/45">
                                <tr>
                                    <th className="mono-meta p-4 text-left font-semibold text-[hsl(var(--muted-foreground))]">Date</th>
                                    <th className="mono-meta p-4 text-right font-semibold text-[hsl(var(--muted-foreground))]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[hsl(var(--border))]">
                                {infographics.map((infographic) => (
                                    <tr key={infographic.id} className="transition-colors hover:bg-[hsl(var(--muted))]/30">
                                        <td className="p-4">
                                            <p className="font-medium">{formatDate(infographic.datePosted)}</p>
                                            <p className="mono-meta mt-1 text-[hsl(var(--muted-foreground))]">
                                                What Happened in Crypto Today
                                            </p>
                                        </td>
                                        <td className="p-4 text-right">
                                            <AdminInfographicActions
                                                infographic={{
                                                    id: infographic.id!,
                                                    datePosted: infographic.datePosted
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination currentPage={page} totalPages={totalPages} />
                </>
            )}
        </div>
    );
}
