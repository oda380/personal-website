export default function BackgroundGradient() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.28)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.22)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.18]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--primary)/0.10),transparent_28%,transparent_72%,hsl(var(--secondary)/0.08))]" />
            <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-[hsl(var(--primary))]/8 to-transparent" />
            <div className="absolute inset-x-0 top-1/3 h-px bg-[linear-gradient(to_right,transparent,hsl(var(--primary)/0.26),transparent)]" />
        </div>
    );
}
