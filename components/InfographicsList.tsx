'use client';

import Link from 'next/link';
import { Infographic } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface InfographicsListProps {
    infographics: Infographic[];
}

export function InfographicsList({ infographics }: InfographicsListProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (infographics.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-xl text-[hsl(var(--muted-foreground))] mb-2">No previous infographics</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Check back soon for more daily crypto insights</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {infographics.map((infographic, index) => (
                <motion.div
                    key={infographic.datePosted}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ x: 4 }}
                >
                    <Link
                        href={`/daily-crypto/${infographic.datePosted}`}
                        className="group block p-5 rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 bg-[hsl(var(--card))]/50 backdrop-blur-sm hover:bg-[hsl(var(--muted))]/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[hsl(var(--primary))]/5"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors mb-1">
                                    {formatDate(infographic.datePosted)}
                                </p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                    What Happened in Crypto Today
                                </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
