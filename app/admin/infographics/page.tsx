import Link from 'next/link';
import { getInfographics } from '@/lib/infographics';
import { Button } from '@/components/ui/Button';
import AdminInfographicActions from '@/components/admin/AdminInfographicActions';
import AdminFilter from '@/components/admin/AdminFilter';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminInfographicsPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const year = typeof resolvedParams.year === 'string' ? parseInt(resolvedParams.year) : undefined;
    const month = typeof resolvedParams.month === 'string' ? parseInt(resolvedParams.month) : undefined;

    const infographics = await getInfographics(undefined, month, year);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Daily Crypto</h1>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Manage your daily crypto infographics
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <AdminFilter />
                    <Link href="/admin/infographics/new">
                        <Button variant="primary">Add Today's Crypto</Button>
                    </Link>
                </div>
            </div>

            {infographics.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-[hsl(var(--border))] rounded-xl">
                    <p className="text-lg text-[hsl(var(--muted-foreground))] mb-4">No infographics yet</p>
                    <Link href="/admin/infographics/new">
                        <Button variant="primary">Create Your First Infographic</Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-[hsl(var(--muted))]/50 border-b border-[hsl(var(--border))]">
                            <tr>
                                <th className="text-left p-4 text-sm font-medium">Date</th>
                                <th className="text-left p-4 text-sm font-medium">Image</th>
                                <th className="text-right p-4 text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[hsl(var(--border))]">
                            {infographics.map((infographic) => (
                                <tr key={infographic.id} className="hover:bg-[hsl(var(--muted))]/30">
                                    <td className="p-4">
                                        <p className="font-medium">{formatDate(infographic.datePosted)}</p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                            What Happened in Crypto Today
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <img
                                            src={infographic.imageUrl}
                                            alt={formatDate(infographic.datePosted)}
                                            className="w-24 h-24 object-cover rounded-lg border border-[hsl(var(--border))]"
                                        />
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
            )}
        </div>
    );
}
