'use client';

import { useState, useEffect } from 'react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/Skeleton';
import { motion } from 'framer-motion';

interface Settings {
    about_content: string;
    github_url: string;
    twitter_url: string;
    linkedin_url: string;
    email: string;
    profile_image_url?: string;
}

export default function AboutPage() {
    const [settings, setSettings] = useState<Settings>({
        about_content: '',
        github_url: '',
        twitter_url: '',
        linkedin_url: '',
        email: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    about_content: settings.about_content,
                    profile_image_url: settings.profile_image_url
                }),
            });

            if (res.ok) {
                setIsEditing(false);
                toast.success('About page updated successfully!');
            } else {
                toast.error('Failed to update about page');
            }
        } catch (error) {
            console.error('Error updating about content:', error);
            toast.error('Error updating about page');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1">
                <div className="max-w-5xl mx-auto px-6 py-20">
                    <div className="grid md:grid-cols-[320px_1fr] gap-12 items-start">
                        <div className="space-y-8">
                            <Skeleton className="aspect-square rounded-2xl" />
                            <div className="space-y-4">
                                <div>
                                    <Skeleton className="h-8 w-48 mb-2" />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                                <div className="flex gap-3">
                                    <Skeleton className="h-10 w-10 rounded-lg" />
                                    <Skeleton className="h-10 w-10 rounded-lg" />
                                    <Skeleton className="h-10 w-10 rounded-lg" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full mt-8" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <div className="max-w-5xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-[320px_1fr] gap-12 items-start">
                    {/* Left Column: Profile Card */}
                    <div className="md:sticky md:top-24 space-y-8">
                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 via-[hsl(var(--secondary))]/15 to-[hsl(var(--primary))]/5 border border-[hsl(var(--border))] flex items-center justify-center shadow-sm overflow-hidden relative">
                            {settings.profile_image_url ? (
                                <img
                                    src={settings.profile_image_url}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-6xl font-bold text-[hsl(var(--primary))]/40 select-none">KL</span>
                            )}
                        </div>


                        <div className="space-y-4">
                            <div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-3xl font-bold tracking-tight mb-2"
                                >
                                    Kitaek Lim
                                </motion.h1>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="text-lg text-[hsl(var(--muted-foreground))]"
                                >
                                    <span className="relative inline-block">
                                        Product Builder
                                        <motion.span
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                            className="absolute bottom-1 left-0 h-2 bg-[hsl(var(--primary))]/20 -z-10 -rotate-1"
                                        />
                                    </span>
                                    {' '}& Web3 Enthusiast
                                </motion.div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {settings.github_url && (
                                    <a href={settings.github_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--secondary))]/10 hover:text-[hsl(var(--secondary))] transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                    </a>
                                )}
                                {settings.twitter_url && (
                                    <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--secondary))]/10 hover:text-[hsl(var(--secondary))] transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                    </a>
                                )}
                                {settings.linkedin_url && (
                                    <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--secondary))]/10 hover:text-[hsl(var(--secondary))] transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                    </a>
                                )}
                                {settings.email && (
                                    <a href={`mailto:${settings.email}`} className="p-2 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--secondary))]/10 hover:text-[hsl(var(--secondary))] transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="relative min-h-[400px]">
                        <SignedIn>
                            <div className="absolute -top-12 right-0 flex gap-4">
                                {!isEditing && (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] flex items-center gap-2 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            Edit Profile
                                        </button>
                                    </>
                                )}
                            </div>

                            {isEditing ? (
                                <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                                        <input
                                            type="text"
                                            value={settings.profile_image_url || ''}
                                            onChange={(e) => setSettings({ ...settings, profile_image_url: e.target.value })}
                                            placeholder="https://example.com/my-photo.jpg"
                                            className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                        />
                                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                            Paste a direct link to your profile photo (e.g. from GitHub or LinkedIn)
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">Bio Content</label>
                                        <textarea
                                            value={settings.about_content}
                                            onChange={(e) => setSettings({ ...settings, about_content: e.target.value })}
                                            rows={12}
                                            className="w-full px-4 py-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] font-sans resize-y"
                                            placeholder="Write about yourself..."
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                fetchSettings();
                                            }}
                                            className="px-4 py-2 text-sm font-medium border border-[hsl(var(--border))] rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="px-4 py-2 text-sm font-medium bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))]/90 disabled:opacity-50 transition-colors"
                                        >
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    {settings.about_content.split('\n\n').map((paragraph, idx) => (
                                        <p key={idx} className="text-[hsl(var(--foreground))] leading-relaxed mb-6">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </SignedIn>

                        <SignedOut>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                {settings.about_content.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx} className="text-[hsl(var(--foreground))] leading-relaxed mb-6">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </div>
    );
}
