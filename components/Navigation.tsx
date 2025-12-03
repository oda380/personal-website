'use client';

import { useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]/80 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="hover:opacity-80 transition-opacity z-50 relative">
                    <NextImage
                        src="/logo.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="rounded-lg"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/projects" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
                        Projects
                    </Link>
                    <Link href="/writing" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
                        Writing
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
                        About
                    </Link>

                    <div className="pl-2 border-l border-[hsl(var(--border))] flex items-center">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
                                    Admin
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/admin"
                                    className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-[110] relative p-2 -mr-2 text-[hsl(var(--foreground))]"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 bg-[hsl(var(--background))] z-[100] flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
                        <Link
                            href="/"
                            className="text-2xl font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/projects"
                            className="text-2xl font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/writing"
                            className="text-2xl font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Writing
                        </Link>
                        <Link
                            href="/about"
                            className="text-2xl font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>

                        <div className="w-16 h-px bg-[hsl(var(--border))]" />

                        <SignedOut>
                            <SignInButton mode="modal">
                                <button
                                    className="text-xl font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Admin Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <Link
                                href="/admin"
                                className="text-xl font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <div className="scale-125">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                    </div>
                )}
            </div>
        </nav>
    );
}
