import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32", className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          {eyebrow && (
            <div className={cn("inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary")}>
              <span className="w-6 h-px bg-primary" />
              {eyebrow}
            </div>
          )}
          <h2 className="mt-4 font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
            {title}
          </h2>
          {description && (
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}