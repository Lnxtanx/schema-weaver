import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  children,
  className,
  headerClassName,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
}) {
  return (
    <section id={id} className={cn("relative py-14 sm:py-24 lg:py-32", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={cn(
            headerClassName || "max-w-3xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow && (
            <div
              className={cn(
                "inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary",
              )}
            >
              <span className="w-6 h-px bg-primary" />
              {eyebrow}
            </div>
          )}
          <h2 className="mt-4 font-display font-bold tracking-tight text-2xl sm:text-4xl lg:text-5xl leading-[1.15]">
            {title}
          </h2>
          {description && (
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
