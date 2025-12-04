'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex-1 flex items-center justify-center min-h-[70vh]">
            <div className="text-center px-6">
                {/* Large 404 */}
                <h1 className="text-[120px] sm:text-[180px] font-bold leading-none text-[hsl(var(--muted-foreground))]/20 select-none">
                    404
                </h1>

                {/* Message */}
                <div className="-mt-8 sm:-mt-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Page not found
                    </h2>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8 max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white font-medium rounded-lg transition-all hover:scale-105 shadow-lg shadow-[hsl(var(--primary))]/20"
                        >
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>
                        <button
                            onClick={() => history.back()}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] font-medium rounded-lg transition-colors bg-[hsl(var(--card))]/50"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="mt-16 flex justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
}
