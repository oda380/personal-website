import Link from 'next/link';
import { getSettings } from '@/lib/db-settings';
import { Settings } from '@/lib/types';
import { Activity, ArrowRight, BellRing, Blocks, CreditCard, Network, WalletCards } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  product: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  code: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
};

export const dynamic = 'force-dynamic';

async function getHomeSettings(): Promise<Settings> {
  try {
    return await getSettings();
  } catch (error) {
    console.error('Failed to load home settings:', error);
    return {
      github_url: '',
      twitter_url: '',
      linkedin_url: '',
      email: '',
      about_content: '',
      home_skills: [],
    };
  }
}

const focusAreas = [
  {
    title: 'Payments',
    description: 'Cost visibility, customer withdrawal flows, and operational payment rails that teams can monitor.',
    icon: CreditCard,
    label: 'COST / FLOW',
  },
  {
    title: 'Wallet Ops',
    description: 'Wallet onboarding, smart-wallet UX, and the boring details that decide whether users actually finish.',
    icon: WalletCards,
    label: 'UX / SUPPORT',
  },
  {
    title: 'On-chain Data',
    description: 'Dashboards, attribution limits, and signal detection for activity that would otherwise stay noisy.',
    icon: Network,
    label: 'SIGNAL / NOISE',
  },
  {
    title: 'Internal Tools',
    description: 'POCs, scripts, runbooks, and workflows that turn fuzzy product questions into working systems.',
    icon: Blocks,
    label: 'POC / RUNBOOK',
  },
];

const proofPoints = [
  { value: '60%', label: 'fee spend reduction target tracked through wallet operations' },
  { value: '700+', label: 'learners and operators helped through practical Web3 education' },
  { value: '01:00', label: 'night-shift mindset: alerts, edge cases, and what happens after launch' },
];

export default async function Home() {
  const settings = await getHomeSettings();
  const skills = settings?.home_skills || [];

  return (
    <div className="flex-1">
      <section className="border-b border-[hsl(var(--border))] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-7 animate-fade-in">
                <span className="signal-chip"><span className="signal-dot" />Available for operator-heavy builds</span>
                <span className="signal-chip mono-meta">WEB3 PAYMENTS</span>
                <span className="signal-chip mono-meta">WALLET FLOWS</span>
                <span className="signal-chip mono-meta">ON-CHAIN DATA</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-fade-in text-balance">
                From wallet flows to monitoring systems, I make Web3 work in production.
              </h1>

              <p className="text-xl text-[hsl(var(--muted-foreground))] mb-10 leading-relaxed animate-fade-in-delay">
                I help turn messy Web3, payments, wallet, and on-chain data problems into usable products, measurable systems, and operational clarity.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-[hsl(var(--primary-foreground))] font-medium rounded-lg transition-all shadow-lg shadow-[hsl(var(--primary))]/16"
                >
                  View case studies
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/writing"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/45 hover:bg-[hsl(var(--muted))] font-medium rounded-lg transition-colors bg-[hsl(var(--card))]/70 backdrop-blur-sm"
                >
                  Read operator notes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="operator-panel p-6 sm:p-8 animate-fade-in-delay">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="operator-label">Control Room</p>
                  <h2 className="text-2xl font-bold mt-2">Signal over hype</h2>
                </div>
                <Activity className="w-6 h-6 text-[hsl(var(--primary))]" />
              </div>

              <div className="space-y-4">
                {[
                  ['Signal', 'Wallet costs, user friction, attribution gaps, production alerts.'],
                  ['Constraint', 'Support load, data accuracy, stakeholder clarity, operational limits.'],
                  ['Output', 'Dashboards, POCs, runbooks, product flows, and measurable decisions.'],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[92px_1fr] gap-4 border-t border-[hsl(var(--border))] pt-4">
                    <span className="mono-meta text-[hsl(var(--primary))]">{label.toUpperCase()}</span>
                    <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-8">
          <p className="operator-label mb-3">Operating Surface</p>
          <h2 className="text-3xl font-bold">Product, payments, wallets, and data: connected.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div key={area.title} className="operator-panel operator-panel-hover p-5">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="mono-meta text-[hsl(var(--muted-foreground))]">{area.label}</span>
                  <Icon className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{area.title}</h3>
                <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {proofPoints.map((point) => (
            <div key={point.value} className="border-t border-[hsl(var(--border))] pt-5">
              <div className="text-3xl font-bold text-[hsl(var(--primary))] mb-2">{point.value}</div>
              <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      {skills.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="mb-8">
            <p className="operator-label mb-3">Working Style</p>
            <h2 className="text-3xl font-bold">How I approach messy systems.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
            <div
              key={skill.title}
              className="operator-panel operator-panel-hover p-6"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-4 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20">
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
      )}

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="operator-panel p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="operator-label mb-3">Operator Notes</p>
              <h2 className="text-2xl font-bold mb-3">The demo is not the system.</h2>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed max-w-2xl">
                I care about what happens after launch: support paths, alert thresholds, cost visibility, data quality, and whether the workflow can survive real users.
              </p>
            </div>
            <BellRing className="w-8 h-8 text-[hsl(var(--primary))] flex-shrink-0" />
          </div>
        </div>
      </section>
    </div>
  );
}
