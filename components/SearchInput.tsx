'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchInput({ placeholder = 'Search...' }: { placeholder?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [query, setQuery] = useState(searchParams.get('q') || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (query.trim()) {
            params.set('q', query.trim());
        } else {
            params.delete('q');
        }
        params.delete('page'); // Reset to page 1 on new search

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    const clearSearch = () => {
        setQuery('');
        const params = new URLSearchParams(searchParams.toString());
        params.delete('q');
        params.delete('page');

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/70 backdrop-blur-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent transition-all"
                />
                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                    >
                        <X className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                    </button>
                )}
            </div>
            {isPending && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-[hsl(var(--primary))] border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </form>
    );
}
