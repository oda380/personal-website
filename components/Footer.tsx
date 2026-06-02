'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Github, Twitter, Linkedin } from 'lucide-react';

interface Settings {
    github_url: string;
    twitter_url: string;
    linkedin_url: string;
    email: string;
}

export default function Footer() {
    const pathname = usePathname();
    const [settings, setSettings] = useState<Settings>({
        github_url: '',
        twitter_url: '',
        linkedin_url: '',
        email: ''
    });

    useEffect(() => {
        // Only fetch settings if not on admin page
        if (!pathname?.startsWith('/admin')) {
            fetch('/api/settings')
                .then(res => res.json())
                .then(data => setSettings(data))
                .catch(err => console.error('Failed to fetch footer settings:', err));
        }
    }, [pathname]);

    // Hide footer on admin pages
    if (pathname?.startsWith('/admin')) return null;

    return (
        <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]/92 py-12">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                    <div className="text-center sm:text-left">
                        <p className="font-medium">Kitaek Lim</p>
                        <p className="mono-meta text-[hsl(var(--muted-foreground))]">
                            Useful beats impressive / {new Date().getFullYear()}
                        </p>
                    </div>

                    <div className="flex gap-6">
                        {settings.github_url && (
                            <a
                                href={settings.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-2"
                            >
                                <Github className="w-4 h-4" />
                                <span className="hidden sm:inline">GitHub</span>
                            </a>
                        )}
                        {settings.twitter_url && (
                            <a
                                href={settings.twitter_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-2"
                            >
                                <Twitter className="w-4 h-4" />
                                <span className="hidden sm:inline">Twitter</span>
                            </a>
                        )}
                        {settings.linkedin_url && (
                            <a
                                href={settings.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-2"
                            >
                                <Linkedin className="w-4 h-4" />
                                <span className="hidden sm:inline">LinkedIn</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
