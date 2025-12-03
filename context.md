# Project Context: Personal Portfolio & Admin System

**Last Updated:** December 3, 2025

## 1. Project Overview

This is a personal portfolio and blog website built with **Next.js 14 (App Router)**. Unlike a static site, it features a fully dynamic **Admin Dashboard** powered by a **Postgres database** and **Clerk authentication**, allowing the owner to manage content and site settings directly from the browser.

## 2. Tech Stack

- **Framework:** Next.js 14 (App Router, Server Components by default)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with `framer-motion` for animations)
- **Database:** Vercel Postgres (Neon)
- **Authentication:** Clerk (Email/Password + Social)
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel

## 3. Architecture & Key Features

### Public Facing (`/`)

- **Home**: Hero section with staggered animations, skills grid.
- **Projects (`/projects`)**: Dynamic list of portfolio projects fetched from DB.
- **Writing (`/writing`)**: Blog posts with status (draft/published) and tags.
- **About (`/about`)**: Personal bio and profile, editable via admin.
- **Design System**: "Premium Polish" with noise textures, glassmorphism, and ambient gradients.

### Admin Dashboard (`/admin`)

- **Protected Routes**: Middleware ensures only authenticated admins can access `/admin`.
- **CRUD Operations**:
  - **Projects**: Create, Edit, Delete projects (rich fields: stack, highlights, etc.).
  - **Posts**: Create, Edit, Delete blog posts.
  - **Settings**: Manage global links (GitHub, Twitter) and "About" content.
- **Inline Actions**: Admin-only "Edit" and "Delete" buttons appear on public pages when signed in.

## 4. Database Schema (Vercel Postgres)

### `projects` Table

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `title` | TEXT | Project title |
| `slug` | TEXT | URL slug (unique) |
| `one_liner` | TEXT | Short description |
| `role` | TEXT | User's role |
| `timeframe` | TEXT | e.g. "2023 - Present" |
| `stack` | JSONB | Array of tech stack strings |
| `summary` | TEXT | Full description |
| `highlights` | JSONB | Array of bullet points |
| `link` | TEXT | External URL |
| `type` | TEXT | e.g. "Product", "Experiment" |

### `posts` Table

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `title` | TEXT | Post title |
| `slug` | TEXT | URL slug (unique) |
| `one_liner` | TEXT | Short summary |
| `key_idea` | TEXT | Main takeaway |
| `tags` | JSONB | Array of tags |
| `status` | TEXT | 'draft', 'published', 'archived', 'planned' |
| `last_updated` | TEXT | Date string |

### `settings` Table

| Column | Type | Description |
| :--- | :--- | :--- |
| `key` | TEXT | Unique setting key (e.g. 'github_url') |
| `value` | TEXT | Setting value |

## 5. Development Workflow

### Setup

1. `npm install`
2. Configure `.env.local` (Clerk keys + Postgres URL).
3. Run `npm run dev`.

### Database Management

- **Migrations**: Scripts in `/scripts` folder (e.g., `scripts/migrate.ts`, `scripts/create-settings-table.ts`).
- **Running Scripts**: `npx dotenv -e .env.local -- npx tsx scripts/script-name.ts`

### Deployment (Vercel)

- **Env Vars**: Must set Clerk **Production** keys and link Vercel Postgres.
- **Build**: Standard Next.js build process.

## 6. Key Directories

- `/app`: App Router pages and API routes.
  - `/app/admin`: Admin dashboard pages.
  - `/app/api`: Backend API endpoints (protected).
- `/components`: Reusable UI components.
  - `/components/admin`: Admin-specific forms and tables.
- `/lib`: Utilities.
  - `db.ts`: Database connection and helper functions.
  - `utils.ts`: CN utility.
- `/scripts`: Database migration and setup scripts.
