import { Skeleton } from '@/components/ui/Skeleton';
import { PageHeader } from '@/components/PageHeader';

export default function ProjectsLoading() {
    return (
        <div className="flex-1">
            <PageHeader
                title="Projects"
                subtitle="What I've Built"
                description="Web3 products, developer tools, and experiments"
            />

            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-[hsl(var(--card))]/50 backdrop-blur-sm border border-[hsl(var(--border))] rounded-xl p-8"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <Skeleton className="h-7 w-48 mb-2" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <Skeleton className="h-7 w-20 rounded-full" />
                            </div>

                            {/* One-liner */}
                            <Skeleton className="h-5 w-3/4 mb-6" />

                            {/* Stack tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                <Skeleton className="h-6 w-16 rounded-md" />
                                <Skeleton className="h-6 w-20 rounded-md" />
                                <Skeleton className="h-6 w-14 rounded-md" />
                                <Skeleton className="h-6 w-18 rounded-md" />
                            </div>

                            {/* Summary */}
                            <div className="space-y-2 mb-5">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>

                            {/* Highlights */}
                            <div className="space-y-2 mb-6">
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>

                            {/* Link */}
                            <div className="pt-4 border-t border-[hsl(var(--border))]">
                                <Skeleton className="h-9 w-32 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
