'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Infographic } from '@/lib/types';
import { motion } from 'framer-motion';

interface InfographicCardProps {
    infographic: Infographic;
    priority?: boolean;
    index?: number;
    children?: React.ReactNode;
}

export function InfographicCard({ infographic, priority = false, index = 0, children }: InfographicCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="space-y-6"
        >
            <Link href={`/daily-crypto/${infographic.datePosted}`} className="block group space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">What Happened in Crypto Today</h2>
                        <p className="text-lg text-[hsl(var(--muted-foreground))]">{formatDate(infographic.datePosted)}</p>
                    </div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative rounded-2xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 backdrop-blur-sm shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-[hsl(var(--primary))]/10 hover:border-[hsl(var(--primary))]/50 transition-all duration-300"
                >
                    <Image
                        src={infographic.imageUrl}
                        alt={`What Happened in Crypto Today - ${formatDate(infographic.datePosted)}`}
                        width={1200}
                        height={1200}
                        quality={90}
                        priority={priority}
                        className="w-full h-auto"
                    />
                </motion.div>
            </Link>

            {children && (
                <div className="pt-6 border-t border-[hsl(var(--border))]">
                    {children}
                </div>
            )}
        </motion.div>
    );
}
