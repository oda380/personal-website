/**
 * Utility functions for blog functionality
 */

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(markdown: string): number {
    if (!markdown || markdown.trim().length === 0) {
        return 1;
    }

    const wordsPerMinute = 200;
    const wordCount = markdown.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Generate an excerpt from markdown content
 * Strips markdown formatting and truncates to specified length
 */
export function generateExcerpt(markdown: string, maxLength: number = 160): string {
    if (!markdown || markdown.trim().length === 0) {
        return '';
    }

    // Remove markdown formatting
    const plainText = markdown
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, '')
        // Remove inline code
        .replace(/`[^`]+`/g, '')
        // Remove headings
        .replace(/#{1,6}\s+/g, '')
        // Remove bold/italic
        .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
        // Remove links but keep text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // Remove images
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
        // Remove blockquotes
        .replace(/^>\s+/gm, '')
        // Remove horizontal rules
        .replace(/^[-*_]{3,}$/gm, '')
        // Clean up extra whitespace
        .replace(/\s+/g, ' ')
        .trim();

    if (plainText.length <= maxLength) {
        return plainText;
    }

    // Truncate and add ellipsis
    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > maxLength * 0.8) {
        return truncated.substring(0, lastSpace) + '...';
    }

    return truncated + '...';
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number): string {
    if (minutes === 1) {
        return '1 min read';
    }
    return `${minutes} min read`;
}
