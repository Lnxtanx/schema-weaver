import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative pt-36 pb-20 overflow-hidden bg-hero",
        className,
      )}
    >
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 bg-glass border border-border rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-primary animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            {eyebrow}
          </div>
        )}
        <h1
          className="mt-6 font-display font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.05] animate-fade-up"
          style={{ animationDelay: "60ms" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {description}
          </p>
        )}
        {children && (
          <div
            className="mt-10 animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}