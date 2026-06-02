import { ReactNode } from 'react';

interface AdminPageHeaderProps {
    eyebrow: string;
    title: string;
    description?: string;
    action?: ReactNode;
}

export default function AdminPageHeader({
    eyebrow,
    title,
    description,
    action,
}: AdminPageHeaderProps) {
    return (
        <div className="mb-8 flex flex-col gap-4 border-b border-[hsl(var(--border))] pb-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
                <p className="operator-label">{eyebrow}</p>
                <h1 className="text-3xl font-semibold text-[hsl(var(--foreground))] md:text-4xl">
                    {title}
                </h1>
                {description && (
                    <p className="max-w-2xl text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                        {description}
                    </p>
                )}
            </div>
            {action && <div className="flex flex-wrap items-center gap-3">{action}</div>}
        </div>
    );
}
