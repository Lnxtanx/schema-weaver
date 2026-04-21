import productImage from "@/assets/product-placeholder.png";
import { cn } from "@/lib/utils";

export function ProductShot({
  caption,
  className,
  glow = "emerald",
  src,
}: {
  caption?: string;
  className?: string;
  glow?: "emerald" | "blue" | "none";
  src?: string;
}) {
  const glowClass =
    glow === "emerald"
      ? "shadow-glow-emerald"
      : glow === "blue"
        ? "shadow-glow-blue"
        : "shadow-elevated";

  return (
    <div className={cn("relative", className)}>
      <div className={cn("relative rounded-xl border border-border bg-card overflow-hidden", glowClass)}>
        <div className="flex items-center gap-2 h-8 px-3 border-b border-border bg-muted/50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
          </div>
          {caption && (
            <div className="flex-1 text-center text-[10px] font-mono text-muted-foreground truncate">
              {caption}
            </div>
          )}
        </div>
        <img src={src ?? productImage} alt={caption ?? "Schema Weaver interface"} className="w-full h-auto block" />
      </div>
    </div>
  );
}