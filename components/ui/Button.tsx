import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                className={cn(
                    'inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none rounded-lg',
                    {
                        // Variants
                        'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 shadow-lg shadow-[hsl(var(--primary))]/16':
                            variant === 'primary',
                        'border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/45 hover:bg-[hsl(var(--muted))] bg-[hsl(var(--card))]/70 backdrop-blur-sm':
                            variant === 'outline',
                        'hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]':
                            variant === 'ghost',
                        'text-[hsl(var(--primary))] hover:underline p-0': variant === 'link',

                        // Sizes
                        'px-4 py-2 text-sm': size === 'sm' && variant !== 'link',
                        'px-6 py-3 text-base': size === 'md' && variant !== 'link',
                        'px-8 py-4 text-lg': size === 'lg' && variant !== 'link',
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };
