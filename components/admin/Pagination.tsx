'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    if (totalPages <= 1) return null;

    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="gap-2"
            >
                <ChevronLeft className="w-4 h-4" />
                Previous
            </Button>

            <span className="signal-chip">
                Page <span className="font-medium text-[hsl(var(--foreground))]">{currentPage}</span> of{' '}
                <span className="font-medium text-[hsl(var(--foreground))]">{totalPages}</span>
            </span>

            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="gap-2"
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
}
