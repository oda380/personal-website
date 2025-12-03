'use client';

import { useState } from 'react';

interface FilterButtonsProps {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    label?: string;
}

export function FilterButtons({ options, selected, onSelect, label }: FilterButtonsProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {label && <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] mr-2">{label}:</span>}
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onSelect(option)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${selected === option
                            ? 'bg-[hsl(var(--primary))] text-white shadow-sm'
                            : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80'
                        }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
