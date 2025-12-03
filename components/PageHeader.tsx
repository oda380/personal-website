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
                <div className="flex justify-between items-start mb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl sm:text-6xl font-bold tracking-tight"
                    >
                        {title}
                        <br />
                        <span className="text-[hsl(var(--primary))] relative inline-block">
                            {subtitle}
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                className="absolute bottom-2 left-0 h-3 bg-[hsl(var(--primary))]/20 -z-10 -rotate-1"
                            />
                        </span>
                    </motion.h1>
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
            </div>
        </section>
    );
}
