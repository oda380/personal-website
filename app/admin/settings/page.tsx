'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/Skeleton';

export default function SettingsPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState({
        github_url: '',
        twitter_url: '',
        linkedin_url: '',
        email: '',
        about_content: '',
        profile_image_url: '',
        home_skills: [] as { title: string; description: string; iconName: string }[],
    });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                toast.success('Settings updated successfully!');
                router.refresh();
            } else {
                toast.error('Failed to update settings');
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            toast.error('Error updating settings');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="p-8 max-w-2xl">
                <Skeleton className="h-10 w-48 mb-8" />
                <div className="space-y-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i}>
                            <Skeleton className="h-5 w-24 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                    <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">GitHub URL</label>
                    <input
                        type="url"
                        value={settings.github_url}
                        onChange={(e) => setSettings({ ...settings, github_url: e.target.value })}
                        placeholder="https://github.com/yourusername"
                        className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Twitter URL</label>
                    <input
                        type="url"
                        value={settings.twitter_url}
                        onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                        placeholder="https://twitter.com/yourusername"
                        className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                    <input
                        type="url"
                        value={settings.linkedin_url}
                        onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                        placeholder="https://linkedin.com/in/yourusername"
                        className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    />
                </div>

                <div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">About Page Content</label>
                        <textarea
                            value={settings.about_content || ''}
                            onChange={(e) => setSettings({ ...settings, about_content: e.target.value })}
                            rows={8}
                            placeholder="Write about yourself... (Use double line breaks for paragraphs)"
                            className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                        />
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                            Tip: You can also edit this directly on the /about page when signed in
                        </p>
                    </div>

                    <div className="pt-8 border-t border-[hsl(var(--border))]">
                        <h2 className="text-xl font-bold mb-4">Home Page Skills</h2>
                        <div className="space-y-6">
                            {settings.home_skills?.map((skill, index) => (
                                <div key={index} className="p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))]">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-medium">Skill #{index + 1}</h3>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSkills = [...(settings.home_skills || [])];
                                                newSkills.splice(index, 1);
                                                setSettings({ ...settings, home_skills: newSkills });
                                            }}
                                            className="text-sm text-red-500 hover:text-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Title</label>
                                            <input
                                                type="text"
                                                value={skill.title}
                                                onChange={(e) => {
                                                    const newSkills = [...(settings.home_skills || [])];
                                                    newSkills[index].title = e.target.value;
                                                    setSettings({ ...settings, home_skills: newSkills });
                                                }}
                                                className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Description</label>
                                            <textarea
                                                value={skill.description}
                                                onChange={(e) => {
                                                    const newSkills = [...(settings.home_skills || [])];
                                                    newSkills[index].description = e.target.value;
                                                    setSettings({ ...settings, home_skills: newSkills });
                                                }}
                                                rows={3}
                                                className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Icon</label>
                                            <select
                                                value={skill.iconName}
                                                onChange={(e) => {
                                                    const newSkills = [...(settings.home_skills || [])];
                                                    newSkills[index].iconName = e.target.value;
                                                    setSettings({ ...settings, home_skills: newSkills });
                                                }}
                                                className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]"
                                            >
                                                <option value="product">Product (Lightning/Zap)</option>
                                                <option value="code">Code (Brackets)</option>
                                                <option value="shield">Risk (Shield)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => {
                                    setSettings({
                                        ...settings,
                                        home_skills: [
                                            ...(settings.home_skills || []),
                                            { title: 'New Skill', description: 'Description...', iconName: 'code' }
                                        ]
                                    });
                                }}
                                className="w-full py-3 border-2 border-dashed border-[hsl(var(--border))] rounded-lg text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors"
                            >
                                + Add Skill
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-[hsl(var(--border))]">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))]/90 disabled:opacity-50 transition-colors"
                    >
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
