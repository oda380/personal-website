import Link from 'next/link';
import { getSettings } from '@/lib/db-settings';

const ICON_MAP: Record<string, React.ReactNode> = {
  product: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  code: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const settings = await getSettings();

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="border-b border-[hsl(var(--border))] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
              Turning Web3 ideas into products
              <br />
              <span className="text-[hsl(var(--primary))] relative inline-block">
                that feel effortless to use
                <span className="absolute bottom-2 left-0 h-3 w-full bg-[hsl(var(--primary))]/20 -z-10 -rotate-1" />
              </span>
            </h1>

            <p className="text-xl text-[hsl(var(--muted-foreground))] mb-10 leading-relaxed animate-fade-in-delay">
              Product-minded Web3 builder focused on making blockchain feel effortless—smooth wallet onboarding, payments, and on-chain features people can actually use. I work across engineering, design, and go-to-market to turn fuzzy ideas into shipped releases.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
              <Link
                href="/projects"
                className="px-6 py-3 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white font-medium rounded-lg transition-all hover:scale-105 shadow-lg shadow-[hsl(var(--primary))]/20"
              >
                View Projects →
              </Link>
              <Link
                href="/writing"
                className="px-6 py-3 border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] font-medium rounded-lg transition-colors bg-[hsl(var(--card))]/50 backdrop-blur-sm"
              >
                Read Writing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(settings?.home_skills || []).map((skill, idx) => (
            <div
              key={skill.title}
              className="bg-[hsl(var(--card))]/50 backdrop-blur-sm border border-[hsl(var(--border))] rounded-xl p-8 hover:border-[hsl(var(--primary))]/50 transition-colors shadow-sm hover:shadow-md hover:-translate-y-1 duration-300"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-4 text-[hsl(var(--primary))]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {ICON_MAP[skill.iconName] || ICON_MAP['code']}
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
