'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState({
        github_url: '',
        twitter_url: '',
        linkedin_url: '',
        email: '',
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
                alert('Settings updated successfully!');
                router.refresh();
            } else {
                alert('Failed to update settings');
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Error updating settings');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="text-center py-12">Loading settings...</div>
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
