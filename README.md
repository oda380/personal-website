# Personal Portfolio & Admin Dashboard

A premium, high-performance personal website built with Next.js 14, featuring a fully functional admin dashboard for managing projects, writing, and site settings.

![Project Preview](/public/window.svg)

## ✨ Features

### 🎨 Premium UI/UX

- **Modern Design**: Glassmorphism, noise textures, and ambient gradient backgrounds.
- **Animations**: Smooth staggered entrances and micro-interactions using `framer-motion`.
- **Responsive**: Fully responsive layouts optimized for all devices.
- **Dark Mode**: Built-in dark mode support (system preference).

### 🛠️ Admin Dashboard

- **Secure Authentication**: Protected by Clerk (Email + Password / Social).
- **Content Management**:
  - **Projects**: CRUD operations for portfolio projects with rich details (stack, highlights, links).
  - **Writing**: Manage blog posts with draft/published states and tagging.
  - **Settings**: Update global site links (GitHub, Twitter, LinkedIn) and "About" content in real-time.
- **Inline Editing**: Quick "Edit" and "Delete" actions directly on public pages for authenticated admins.

### ⚡ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Vercel Postgres](https://vercel.com/postgres) (Neon)
- **Auth**: [Clerk](https://clerk.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: React Hook Form + Zod

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/personal-website.git
cd personal-website
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database (Vercel Postgres)
POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NO_SSL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...
POSTGRES_USER=default
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=verceldb
```

### 3. Database Initialization

Run the setup scripts to create tables and seed default data:

```bash
# Create Settings Table
npx dotenv -e .env.local -- npx tsx scripts/create-settings-table.ts

# Add Profile Image Support
npx dotenv -e .env.local -- npx tsx scripts/add-profile-image.ts

# (Optional) Migrate existing data
npx dotenv -e .env.local -- npx tsx scripts/migrate.ts
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1. Push your code to GitHub.
2. Import the project in Vercel.
3. Add your **Production** Environment Variables (Clerk Live Keys).
4. Connect your Vercel Postgres database.
5. Deploy!

*See `DEPLOYMENT.md` for a detailed step-by-step deployment guide.*

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
