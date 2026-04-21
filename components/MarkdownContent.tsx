'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownContentProps {
    content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
    return (
        <div className="markdown-content prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-4xl font-bold mb-6 mt-12 first:mt-0 text-[hsl(var(--foreground))]">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-3xl font-bold mb-4 mt-10 text-[hsl(var(--foreground))]">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-2xl font-semibold mb-3 mt-8 text-[hsl(var(--foreground))]">
                            {children}
                        </h3>
                    ),
                    p: ({ children }) => (
                        <p className="mb-6 leading-relaxed text-[hsl(var(--foreground))]/90">
                            {children}
                        </p>
                    ),
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            className="text-[hsl(var(--primary))] hover:underline font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-bold text-[hsl(var(--foreground))]">
                            {children}
                        </strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic">
                            {children}
                        </em>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-6 space-y-2 text-[hsl(var(--foreground))]/90">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-6 space-y-2 text-[hsl(var(--foreground))]/90">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="leading-relaxed">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-[hsl(var(--primary))] pl-6 py-2 my-6 italic bg-[hsl(var(--muted))]/30 rounded-r-lg">
                            {children}
                        </blockquote>
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    code: ({ inline, children, ...props }: any) =>
                        inline ? (
                            <code className="bg-[hsl(var(--muted))] px-2 py-1 rounded text-sm font-mono text-[hsl(var(--primary))]">
                                {children}
                            </code>
                        ) : (
                            <code
                                className="block bg-[hsl(var(--muted))] p-4 rounded-lg overflow-x-auto text-sm font-mono mb-6"
                                {...props}
                            >
                                {children}
                            </code>
                        ),
                    pre: ({ children }) => (
                        <pre className="mb-6 overflow-x-auto">{children}</pre>
                    ),
                    img: ({ src, alt }) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={src}
                            alt={alt || ''}
                            className="rounded-lg my-8 w-full shadow-lg"
                        />
                    ),
                    hr: () => (
                        <hr className="my-12 border-t border-[hsl(var(--border))]" />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
