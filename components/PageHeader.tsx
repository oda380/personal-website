'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    description: string;
    maxWidth?: string;
    action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, description, maxWidth = 'max-w-2xl', action }: PageHeaderProps) {
    return (
        <section className="border-b border-[hsl(var(--border))] relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start mb-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="operator-label mb-4"
                        >
                            {subtitle}
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-5xl sm:text-6xl font-bold"
                        >
                            {title}
                        </motion.h1>
                    </div>
                    {action && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {action}
                        </motion.div>
                    )}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`text-xl text-[hsl(var(--muted-foreground))] leading-relaxed ${maxWidth}`}
                >
                    {description}
                </motion.p>
                <div className="signal-rule mt-10" />
            </div>
        </section>
    );
}
