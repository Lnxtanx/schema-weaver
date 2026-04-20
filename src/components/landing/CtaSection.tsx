import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 dot-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-glass border border-border rounded-full px-4 py-1.5 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          Connect once. Available everywhere.
        </div>

        <h2 className="mt-6 font-display font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
          Ship your next migration <br />
          <span className="text-gradient-mesh">with confidence.</span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Join the teams using Schema Weaver to design, visualize, sync, and explore their
          PostgreSQL databases. Free to start. No credit card. No strings.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="hero" size="xl" asChild>
            <a href="https://sql-editor.schemaweaver.vivekmind.com">
              Open SQL Editor <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <a href="https://data-explorer.schemaweaver.vivekmind.com">Explore Data</a>
          </Button>
        </div>
      </div>
    </section>
  );
}