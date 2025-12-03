'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DayPicker } from 'react-day-picker';
import { format, parseISO, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-day-picker/dist/style.css';

export function DailyCryptoCalendar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [postedDates, setPostedDates] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDates() {
            try {
                const res = await fetch('/api/infographics/dates');
                const dates: string[] = await res.json();
                setPostedDates(dates);
            } catch (error) {
                console.error('Failed to fetch calendar dates:', error);
            } finally {
                setLoading(false);
            }
        }

        if (isOpen && postedDates.length === 0) {
            fetchDates();
        }
    }, [isOpen]);

    const handleDayClick = (day: Date | undefined) => {
        if (!day) return;

        const dateStr = format(day, 'yyyy-MM-dd');

        // Check if the clicked day is in our posted dates
        if (postedDates.includes(dateStr)) {
            router.push(`/daily-crypto/${dateStr}`);
            setIsOpen(false);
        }
    };

    // Custom modifiers to disable days without posts
    const isDayDisabled = (day: Date) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        return !postedDates.includes(dateStr);
    };

    // Convert strings to Dates for the 'posted' modifier
    const postedDatesObjects = postedDates.map(d => parseISO(d));

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-sm font-medium hover:bg-[hsl(var(--muted))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            >
                <CalendarIcon className="w-4 h-4" />
                <span>Calendar</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        />

                        {/* Calendar Popover */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 top-full mt-2 z-50 p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-xl"
                        >
                            {loading ? (
                                <div className="p-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
                                    Loading dates...
                                </div>
                            ) : (
                                <DayPicker
                                    mode="single"
                                    onSelect={handleDayClick}
                                    disabled={isDayDisabled}
                                    modifiers={{
                                        posted: postedDatesObjects
                                    }}
                                    modifiersStyles={{
                                        posted: {
                                            fontWeight: 'bold',
                                            color: 'hsl(var(--primary))',
                                            backgroundColor: 'hsl(var(--primary) / 0.1)'
                                        }
                                    }}
                                    styles={{
                                        caption: { color: 'hsl(var(--foreground))' },
                                        head_cell: { color: 'hsl(var(--muted-foreground))' },
                                        day: { color: 'hsl(var(--foreground))' },
                                        nav_button_previous: { color: 'hsl(var(--foreground))' },
                                        nav_button_next: { color: 'hsl(var(--foreground))' },
                                    }}
                                    className="rdp-custom"
                                />
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
