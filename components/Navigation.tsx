'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]/80 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight hover:text-[hsl(var(--primary))] transition-colors">
                    KL
                </Link>

                <div className="flex items-center gap-6">
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
            </div>
        </nav>
    );
}
