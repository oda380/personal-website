import { auth, currentUser } from '@clerk/nextjs/server';

type AdminAuthorization =
    | { authorized: true }
    | { authorized: false; status: 401 | 403; error: string };

function configuredAdminEmails(): string[] {
    const raw = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || '';

    return raw
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter((email) => email && email !== 'your.email@example.com');
}

export async function requireAdmin(): Promise<AdminAuthorization> {
    const { userId } = await auth();

    if (!userId) {
        return { authorized: false, status: 401, error: 'Unauthorized' };
    }

    const adminEmails = configuredAdminEmails();

    if (adminEmails.length === 0) {
        return { authorized: true };
    }

    const user = await currentUser();
    const primaryEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

    if (primaryEmail && adminEmails.includes(primaryEmail)) {
        return { authorized: true };
    }

    return { authorized: false, status: 403, error: 'Forbidden' };
}

export async function isCurrentUserAdmin(): Promise<boolean> {
    const result = await requireAdmin();
    return result.authorized;
}
