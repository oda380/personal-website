'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Skeleton } from '@/components/ui/Skeleton';

const fieldClassName = 'w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]/70 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]';
const labelClassName = 'operator-label mb-2 block text-[hsl(var(--muted-foreground))]';

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
            <div className="max-w-3xl">
                <Skeleton className="mb-8 h-24 w-full" />
                <div className="operator-panel space-y-6 p-6">
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
        <div className="max-w-3xl">
            <AdminPageHeader
                eyebrow="Site Configuration"
                title="Settings"
                description="Update profile links, about copy, and homepage skill modules that feed the public site."
            />

            <form onSubmit={handleSubmit} className="operator-panel space-y-6 p-5 md:p-6">
                <div>
                    <label className={labelClassName}>GitHub URL</label>
                    <input
                        type="url"
                        value={settings.github_url}
                        onChange={(e) => setSettings({ ...settings, github_url: e.target.value })}
                        placeholder="https://github.com/yourusername"
                        className={fieldClassName}
                    />
                </div>

                <div>
                    <label className={labelClassName}>Twitter URL</label>
                    <input
                        type="url"
                        value={settings.twitter_url}
                        onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                        placeholder="https://twitter.com/yourusername"
                        className={fieldClassName}
                    />
                </div>

                <div>
                    <label className={labelClassName}>LinkedIn URL</label>
                    <input
                        type="url"
                        value={settings.linkedin_url}
                        onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                        placeholder="https://linkedin.com/in/yourusername"
                        className={fieldClassName}
                    />
                </div>

                <div>
                    <div>
                        <label className={labelClassName}>Email</label>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                            placeholder="your.email@example.com"
                            className={fieldClassName}
                        />
                    </div>

                    <div className="mt-6">
                        <label className={labelClassName}>About Page Content</label>
                        <textarea
                            value={settings.about_content || ''}
                            onChange={(e) => setSettings({ ...settings, about_content: e.target.value })}
                            rows={8}
                            placeholder="Write about yourself... (Use double line breaks for paragraphs)"
                            className={fieldClassName}
                        />
                        <p className="mono-meta mt-2 text-[hsl(var(--muted-foreground))]">
                            Tip: You can also edit this directly on the /about page when signed in
                        </p>
                    </div>

                    <div className="pt-8 border-t border-[hsl(var(--border))]">
                        <div className="mb-4">
                            <p className="operator-label">Home Modules</p>
                            <h2 className="mt-2 text-xl font-semibold">Home Page Skills</h2>
                        </div>
                        <div className="space-y-6">
                            {settings.home_skills?.map((skill, index) => (
                                <div key={index} className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/25 p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="mono-meta text-[hsl(var(--primary))]">Skill #{index + 1}</h3>
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
                                            <label className={labelClassName}>Title</label>
                                            <input
                                                type="text"
                                                value={skill.title}
                                                onChange={(e) => {
                                                    const newSkills = [...(settings.home_skills || [])];
                                                    newSkills[index].title = e.target.value;
                                                    setSettings({ ...settings, home_skills: newSkills });
                                                }}
                                                className={fieldClassName}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClassName}>Description</label>
                                            <textarea
                                                value={skill.description}
                                                onChange={(e) => {
                                                    const newSkills = [...(settings.home_skills || [])];
                                                    newSkills[index].description = e.target.value;
                                                    setSettings({ ...settings, home_skills: newSkills });
                                                }}
                                                rows={3}
                                                className={fieldClassName}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClassName}>Icon</label>
                                            <select
                                                value={skill.iconName}
                                                onChange={(e) => {
                                                    const newSkills = [...(settings.home_skills || [])];
                                                    newSkills[index].iconName = e.target.value;
                                                    setSettings({ ...settings, home_skills: newSkills });
                                                }}
                                                className={fieldClassName}
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
                                className="w-full rounded-lg border border-dashed border-[hsl(var(--primary))]/35 py-3 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]"
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
                    className="rounded-lg bg-[hsl(var(--primary))] px-6 py-3 font-medium text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/90 disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
