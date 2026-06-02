'use client';

import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutDashboard, FolderKanban, FileText, BarChart3, Settings, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AdminShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
        { href: '/admin/posts', label: 'Posts', icon: FileText },
        { href: '/admin/infographics', label: 'Daily Crypto', icon: BarChart3 },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:sticky top-0 left-0 z-50 h-screen w-64 
                    border-r border-[hsl(var(--border))]/50 
                    bg-gradient-to-b from-[hsl(var(--card))] to-[hsl(var(--card))]/95
                    backdrop-blur-xl
                    shadow-xl
                    transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full relative">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 via-transparent to-[hsl(var(--secondary))]/5 pointer-events-none" />

                    {/* Header */}
                    <div className="relative p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center shadow-lg">
                                <LayoutDashboard className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-lg font-bold bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--foreground))]/70 bg-clip-text text-transparent tracking-tight">
                                Admin
                            </h2>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="md:hidden p-1.5 hover:bg-[hsl(var(--muted))] rounded-lg transition-all duration-200 hover:scale-110"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="relative flex-1 px-3 space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`
                                        group relative flex items-center gap-3 px-3 py-2.5 rounded-xl 
                                        transition-all duration-300 ease-out
                                        ${isActive
                                            ? 'bg-gradient-to-r from-[hsl(var(--primary))]/15 to-[hsl(var(--primary))]/5 text-[hsl(var(--primary))] font-medium shadow-lg shadow-[hsl(var(--primary))]/10'
                                            : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/50 hover:text-[hsl(var(--foreground))] hover:translate-x-1'
                                        }
                                    `}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/10 to-transparent rounded-xl"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}

                                    <div className={`
                                        relative z-10 p-1.5 rounded-lg transition-all duration-300
                                        ${isActive
                                            ? 'bg-[hsl(var(--primary))]/10'
                                            : 'bg-[hsl(var(--muted))]/30 group-hover:bg-[hsl(var(--muted))]'
                                        }
                                    `}>
                                        <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                    </div>
                                    <span className="relative z-10 text-sm tracking-wide">{link.label}</span>
                                </Link>
                            );
                        })}

                        {/* Back to Website */}
                        <div className="pt-6 mt-6 border-t border-[hsl(var(--border))]/50">
                            <Link
                                href="/"
                                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/50 hover:text-[hsl(var(--foreground))] transition-all duration-300 hover:translate-x-1"
                            >
                                <div className="p-1.5 rounded-lg bg-[hsl(var(--muted))]/30 group-hover:bg-[hsl(var(--muted))] transition-all duration-300">
                                    <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                </div>
                                <span className="text-sm tracking-wide">Back to Website</span>
                            </Link>
                        </div>
                    </nav>

                    {/* Profile Section */}
                    <div className="relative p-4 border-t border-[hsl(var(--border))]/50">
                        <div className="flex items-center justify-between px-2 py-2 rounded-xl bg-[hsl(var(--muted))]/20 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <UserButton afterSignOutUrl="/" />
                                <span className="text-sm font-medium text-[hsl(var(--foreground))]/80">Admin User</span>
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <div className="md:hidden h-16 border-b border-[hsl(var(--border))] flex items-center px-4 bg-[hsl(var(--background))] sticky top-0 z-30">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 hover:bg-[hsl(var(--muted))] rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="ml-4 font-semibold">Dashboard</span>
                </div>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
