import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex-1 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                <div className="p-6">
                    <h2 className="text-lg font-bold mb-6">Admin Dashboard</h2>

                    <nav className="space-y-2">
                        <Link
                            href="/admin"
                            className="block px-4 py-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/projects"
                            className="block px-4 py-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/admin/posts"
                            className="block px-4 py-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            Posts
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="block px-4 py-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            Settings
                        </Link>
                    </nav>
                </div>

                <div className="absolute bottom-0 left-0 w-64 p-6 border-t border-[hsl(var(--border))]">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
