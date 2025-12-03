import { getSettings } from '@/lib/db-settings';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default async function Footer() {
    const settings = await getSettings();

    return (
        <footer className="border-t border-[hsl(var(--border))] mt-auto">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                    <p className="text-[hsl(var(--muted-foreground))]">
                        © {new Date().getFullYear()} Kitaek Lim
                    </p>

                    <div className="flex gap-6">
                        <a
                            href={settings.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-2"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                            <span className="hidden sm:inline">GitHub</span>
                        </a>
                        <a
                            href={settings.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-2"
                            aria-label="Twitter"
                        >
                            <Twitter className="w-5 h-5" />
                            <span className="hidden sm:inline">Twitter</span>
                        </a>
                        <a
                            href={settings.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-2"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                            <span className="hidden sm:inline">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
