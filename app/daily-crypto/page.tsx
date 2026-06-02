'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SignedIn } from '@clerk/nextjs';
import AdminInfographicActions from '@/components/admin/AdminInfographicActions';
import { InfographicCard } from '@/components/InfographicCard';
import { InfographicsList } from '@/components/InfographicsList';
import { DailyCryptoCalendar } from '@/components/DailyCryptoCalendar';
import { Infographic } from '@/lib/types';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DailyCryptoPage() {
    const [latest, setLatest] = useState<Infographic | null>(null);
    const [previous, setPrevious] = useState<Infographic[]>([]);
    const [loading, setLoading] = useState(true);
    const [availableMonths, setAvailableMonths] = useState<string[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>('all');

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch available months first
                const monthsRes = await fetch('/api/infographics/available-months');
                const monthsData = await monthsRes.json();
                setAvailableMonths(monthsData);

                // Fetch latest for the hero section
                const latestRes = await fetch('/api/infographics/latest');
                const latestData = await latestRes.json();
                setLatest(latestData);

                // Initial fetch for list (limit to 4: 1 for hero + 3 for list)
                const allRes = await fetch('/api/infographics?limit=4');
                const allData = await allRes.json();

                setPrevious(
                    latestData
                        ? allData.filter((inf: Infographic) => inf.datePosted !== latestData.datePosted)
                        : allData
                );
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleFilterChange = async (monthYear: string) => {
        setSelectedMonth(monthYear);
        setLoading(true);

        try {
            let url = '/api/infographics';
            if (monthYear !== 'all') {
                const [year, month] = monthYear.split('-');
                url += `?year=${year}&month=${month}`;
            } else {
                // If switching back to 'all', re-apply the limit
                url += '?limit=4';
            }

            const res = await fetch(url);
            const data = await res.json();

            // If filtering, show all results. If 'all', exclude the latest (shown in hero)
            if (monthYear !== 'all') {
                setPrevious(data);
            } else {
                setPrevious(
                    latest
                        ? data.filter((inf: Infographic) => inf.datePosted !== latest.datePosted)
                        : data
                );
            }
        } catch (error) {
            console.error('Failed to filter infographics:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatMonthYear = (dateStr: string) => {
        const [year, month] = dateStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    if (loading && !latest) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <div className="text-[hsl(var(--muted-foreground))]">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex-1">
            {/* Hero Section with Premium Styling */}
            <section className="border-b border-[hsl(var(--border))] relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-5xl sm:text-6xl font-bold"
                        >
                            Daily Crypto
                        </motion.h1>


                        {latest && (
                            <SignedIn>
                                <Link href="/admin/infographics/new">
                                    <Button size="sm" className="gap-2">
                                        <Plus className="w-4 h-4" />
                                        Post
                                    </Button>
                                </Link>
                            </SignedIn>
                        )}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-xl text-[hsl(var(--muted-foreground))] leading-relaxed max-w-2xl"
                    >
                        A market signal log for crypto news, chain movement, and the operational context behind the noise.
                    </motion.p>
                    <div className="flex flex-wrap gap-2 mt-8">
                        <span className="signal-chip mono-meta">MARKET SIGNAL</span>
                        <span className="signal-chip mono-meta">CHAIN MOVEMENT</span>
                        <span className="signal-chip mono-meta">OPERATOR NOTES</span>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                {latest && selectedMonth === 'all' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mb-20"
                    >
                        <InfographicCard infographic={latest} priority={true}>
                            <SignedIn>
                                <AdminInfographicActions infographic={latest} />
                            </SignedIn>
                        </InfographicCard>
                    </motion.div>
                )}

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span>{selectedMonth === 'all' ? 'Recent Signals' : formatMonthYear(selectedMonth)}</span>
                    </h2>

                    <div className="flex items-center gap-3">
                        <DailyCryptoCalendar />

                        {availableMonths.length > 0 && (
                            <select
                                value={selectedMonth}
                                onChange={(e) => handleFilterChange(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                            >
                                <option value="all">All Time</option>
                                {availableMonths.map((month) => (
                                    <option key={month} value={month}>
                                        {formatMonthYear(month)}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-[hsl(var(--muted-foreground))]">Updating list...</div>
                ) : previous.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <InfographicsList infographics={previous} />
                    </motion.div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-[hsl(var(--border))] rounded-2xl bg-[hsl(var(--muted))]/20">
                        <p className="text-lg text-[hsl(var(--muted-foreground))]">No insights found for this period.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
