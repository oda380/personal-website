'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { InfographicCard } from '@/components/InfographicCard';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Infographic } from '@/lib/types';
import { SignedIn } from '@clerk/nextjs';
import AdminInfographicActions from '@/components/admin/AdminInfographicActions';

export default function InfographicDetailPage() {
    const params = useParams();
    const rawDate = params.date as string;
    const date = decodeURIComponent(rawDate);
    const [infographic, setInfographic] = useState<Infographic | null>(null);
    const [prevInfographic, setPrevInfographic] = useState<Infographic | null>(null);
    const [nextInfographic, setNextInfographic] = useState<Infographic | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch all infographics to find current and neighbors
                // In a larger app, we'd have specific endpoints for this, but this is efficient enough for now
                const res = await fetch('/api/infographics');
                const allInfographics: Infographic[] = await res.json();

                const currentIndex = allInfographics.findIndex(inf => inf.datePosted === date);

                if (currentIndex === -1) {
                    setInfographic(null);
                } else {
                    setInfographic(allInfographics[currentIndex]);
                    setPrevInfographic(currentIndex < allInfographics.length - 1 ? allInfographics[currentIndex + 1] : null);
                    setNextInfographic(currentIndex > 0 ? allInfographics[currentIndex - 1] : null);
                }
            } catch (error) {
                console.error('Failed to fetch infographic data:', error);
            } finally {
                setLoading(false);
            }
        }

        if (date) {
            fetchData();
        }
    }, [date]);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <div className="text-[hsl(var(--muted-foreground))]">Loading...</div>
            </div>
        );
    }

    if (!infographic) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h1 className="text-2xl font-bold">Infographic Not Found</h1>
                <Link href="/daily-crypto">
                    <span className="text-[hsl(var(--primary))] hover:underline">Return to Daily Crypto</span>
                </Link>
            </div>
        );
    }

    const formatDateShort = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="flex-1">
            <div className="max-w-4xl mx-auto px-6 py-20">

                {/* Breadcrumb */}
                <div className="flex justify-between items-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link
                            href="/daily-crypto"
                            className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors inline-flex items-center gap-2 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Daily Crypto
                        </Link>
                    </motion.div>

                    {infographic && (
                        <SignedIn>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <AdminInfographicActions
                                    infographic={infographic}
                                    redirectOnDelete="/daily-crypto"
                                />
                            </motion.div>
                        </SignedIn>
                    )}
                </div>

                {/* Infographic */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <InfographicCard infographic={infographic} priority={true} />
                </motion.div>

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-12 flex items-center justify-between border-t border-[hsl(var(--border))] pt-8"
                >
                    <div className="flex-1">
                        {prevInfographic && (
                            <Link
                                href={`/daily-crypto/${prevInfographic.datePosted}`}
                                className="group inline-flex flex-col items-start gap-1"
                            >
                                <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-semibold">Previous</span>
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    {formatDateShort(prevInfographic.datePosted)}
                                </span>
                            </Link>
                        )}
                    </div>

                    <div className="flex-1 text-right">
                        {nextInfographic && (
                            <Link
                                href={`/daily-crypto/${nextInfographic.datePosted}`}
                                className="group inline-flex flex-col items-end gap-1"
                            >
                                <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-semibold">Next</span>
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                                    {formatDateShort(nextInfographic.datePosted)}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
