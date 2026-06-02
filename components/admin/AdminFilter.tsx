'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [availableMonths, setAvailableMonths] = useState<string[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>(
        (searchParams.get('year') && searchParams.get('month'))
            ? `${searchParams.get('year')}-${searchParams.get('month')}`
            : 'all'
    );

    useEffect(() => {
        async function fetchMonths() {
            try {
                const res = await fetch('/api/infographics/available-months');
                const data = await res.json();
                setAvailableMonths(data);
            } catch (error) {
                console.error('Failed to fetch available months:', error);
            }
        }
        fetchMonths();
    }, []);

    const handleFilterChange = (monthYear: string) => {
        setSelectedMonth(monthYear);

        if (monthYear === 'all') {
            router.push('/admin/infographics');
        } else {
            const [year, month] = monthYear.split('-');
            router.push(`/admin/infographics?year=${year}&month=${month}`);
        }
    };

    const formatMonthYear = (dateStr: string) => {
        const [year, month] = dateStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    if (availableMonths.length === 0) return null;

    return (
        <div className="flex items-center gap-2">
            <span className="mono-meta text-[hsl(var(--muted-foreground))]">FILTER</span>
            <select
                value={selectedMonth}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            >
                <option value="all">All Time</option>
                {availableMonths.map((month) => (
                    <option key={month} value={month}>
                        {formatMonthYear(month)}
                    </option>
                ))}
            </select>
        </div>
    );
}
