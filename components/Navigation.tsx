'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const menuVariants: Variants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const linkVariants: Variants = {
        closed: { opacity: 0, y: 20 },
        open: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 + i * 0.1,
                duration: 0.4,
                ease: "easeOut"
            }
        })
    };

    const links = [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Projects" },
        { href: "/writing", label: "Writing" },
        { href: "/about", label: "About" },
    ];

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
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
                <div className="hidden md:flex items-center gap-8">
                    {links.slice(1).map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-[hsl(var(--primary))] ${pathname === link.href ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="pl-4 border-l border-[hsl(var(--border))] flex items-center gap-2">
                        <ThemeToggle />
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors text-[hsl(var(--muted-foreground))]">
                                    Admin
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/admin"
                                    className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors text-[hsl(var(--muted-foreground))]"
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
                    <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="w-full h-0.5 bg-current block origin-center transition-transform"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-full h-0.5 bg-current block transition-opacity"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="w-full h-0.5 bg-current block origin-center transition-transform"
                        />
                    </div>
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="fixed inset-0 z-[100] flex flex-col md:hidden"
                            style={{ backgroundColor: 'hsl(var(--background))' }}
                        >
                            <div className="flex flex-col justify-center flex-1 px-8 gap-8">
                                {links.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        custom={i}
                                        variants={linkVariants}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors block"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    custom={links.length}
                                    variants={linkVariants}
                                    className="h-px w-16 bg-[hsl(var(--border))] my-4"
                                />

                                <motion.div
                                    custom={links.length + 1}
                                    variants={linkVariants}
                                >
                                    <SignedOut>
                                        <SignInButton mode="modal">
                                            <button
                                                className="text-xl font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Admin Sign In
                                            </button>
                                        </SignInButton>
                                    </SignedOut>

                                    <SignedIn>
                                        <div className="flex flex-col gap-6">
                                            <Link
                                                href="/admin"
                                                className="text-xl font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <div className="scale-125 origin-left">
                                                <UserButton afterSignOutUrl="/" />
                                            </div>
                                        </div>
                                    </SignedIn>
                                </motion.div>
                            </div>

                            {/* Footer decoration */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="p-8 flex items-center justify-between text-[hsl(var(--muted-foreground))] text-sm"
                            >
                                <span>© {new Date().getFullYear()} Kitaek Lim</span>
                                <ThemeToggle />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
