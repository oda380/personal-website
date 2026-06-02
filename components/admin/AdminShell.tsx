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
        <div className="flex min-h-screen bg-[hsl(var(--background))]">
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
                    border-r border-[hsl(var(--border))] 
                    bg-[hsl(var(--background))]/95
                    backdrop-blur-xl
                    transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full relative">
                    <div className="absolute inset-x-0 top-0 h-px bg-[hsl(var(--primary))]/45" />

                    {/* Header */}
                    <div className="relative flex items-center justify-between p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/12">
                                <LayoutDashboard className="h-4 w-4 text-[hsl(var(--primary))]" />
                            </div>
                            <div>
                                <p className="mono-meta text-[hsl(var(--primary))]">ADMIN SURFACE</p>
                                <h2 className="text-base font-semibold text-[hsl(var(--foreground))]">
                                    Control Room
                                </h2>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="rounded-lg p-1.5 transition-colors hover:bg-[hsl(var(--muted))] md:hidden"
                            aria-label="Close admin navigation"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="relative flex-1 space-y-1 px-3">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`
                                        group relative flex items-center gap-3 rounded-lg px-3 py-2.5 
                                        transition-colors duration-200
                                        ${isActive
                                            ? 'border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]'
                                            : 'border border-transparent text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/45 hover:text-[hsl(var(--foreground))]'
                                        }
                                    `}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[hsl(var(--primary))]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}

                                    <div className={`
                                        relative z-10 rounded-md p-1.5 transition-colors duration-200
                                        ${isActive
                                            ? 'bg-[hsl(var(--primary))]/10'
                                            : 'bg-[hsl(var(--muted))]/30 group-hover:bg-[hsl(var(--muted))]'
                                        }
                                    `}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <span className="relative z-10 text-sm font-medium">{link.label}</span>
                                </Link>
                            );
                        })}

                        {/* Back to Website */}
                        <div className="mt-6 border-t border-[hsl(var(--border))] pt-6">
                            <Link
                                href="/"
                                className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/45 hover:text-[hsl(var(--foreground))]"
                            >
                                <div className="rounded-md bg-[hsl(var(--muted))]/30 p-1.5 transition-colors group-hover:bg-[hsl(var(--muted))]">
                                    <ArrowLeft className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium">Back to Public Site</span>
                            </Link>
                        </div>
                    </nav>

                    {/* Profile Section */}
                    <div className="relative border-t border-[hsl(var(--border))] p-4">
                        <div className="operator-panel flex items-center justify-between px-3 py-2">
                            <div className="flex items-center gap-3">
                                <UserButton afterSignOutUrl="/" />
                                <span className="text-sm font-medium text-[hsl(var(--foreground))]/80">Admin</span>
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <div className="sticky top-0 z-30 flex h-16 items-center border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 px-4 backdrop-blur md:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="-ml-2 rounded-lg p-2 hover:bg-[hsl(var(--muted))]"
                        aria-label="Open admin navigation"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="ml-4 font-semibold">Control Room</span>
                </div>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
