import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getPublishedPosts, getPublishedPostsCount } from '@/lib/db';
import { PostsList } from '@/components/PostsList';
import { PageHeader } from '@/components/PageHeader';
import SearchInput from '@/components/SearchInput';
import WritingPagination from '@/components/WritingPagination';

export const dynamic = 'force-dynamic';

const POSTS_PER_PAGE = 6;

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WritingPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
    const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
    const offset = (page - 1) * POSTS_PER_PAGE;

    const [posts, totalCount] = await Promise.all([
        getPublishedPosts(POSTS_PER_PAGE, offset, search),
        getPublishedPostsCount(search)
    ]);

    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    return (
        <div className="flex-1">
            <PageHeader
                title="Writing"
                subtitle="Thoughts & Insights"
                description="Thoughts on Web3 product, development, and building useful things"
                action={
                    <SignedIn>
                        <Link href="/admin/posts/new">
                            <Button size="sm" className="gap-2">
                                <Plus className="w-4 h-4" />
                                Post
                            </Button>
                        </Link>
                    </SignedIn>
                }
            />

            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Search Bar */}
                <div className="mb-12">
                    <SearchInput placeholder="Search posts by title, content, or tags..." />
                </div>

                {/* Search Results Info */}
                {search && (
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                        {totalCount === 0
                            ? `No posts found for "${search}"`
                            : `Found ${totalCount} post${totalCount === 1 ? '' : 's'} for "${search}"`
                        }
                    </p>
                )}

                {/* Posts List */}
                <PostsList posts={posts} />

                {/* Pagination */}
                <WritingPagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalPosts={totalCount}
                />
            </div>
        </div>
    );
}

