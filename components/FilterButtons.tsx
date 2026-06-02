'use client';



interface FilterButtonsProps {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    label?: string;
}

export function FilterButtons({ options, selected, onSelect, label }: FilterButtonsProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {label && <span className="operator-label mr-2">{label}</span>}
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onSelect(option)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all ${selected === option
                            ? 'border-[hsl(var(--primary))]/60 bg-[hsl(var(--primary))]/12 text-[hsl(var(--primary))]'
                            : 'border-[hsl(var(--border))] bg-[hsl(var(--muted))]/60 text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]/40 hover:text-[hsl(var(--foreground))]'
                        }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
