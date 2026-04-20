import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import productImage from "@/assets/product-placeholder.png";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-glass border border-border rounded-full px-4 py-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-muted-foreground">Now with</span>
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-foreground font-medium">Resona AI v2 — Agentic Schema & Data Co-pilot</span>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="mt-8 text-center font-display font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] animate-fade-up"
          style={{ animationDelay: "60ms" }}
        >
          The Complete{" "}
          <span className="text-gradient-mesh">PostgreSQL</span>
          <br />
          Operating System.
        </h1>

        <p
          className="mt-8 max-w-3xl mx-auto text-center text-lg sm:text-xl text-muted-foreground leading-relaxed animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          Design your schema, visualize relationships, safely migrate production, and explore your
          data with an agentic AI co-pilot. Stop juggling DBeaver, PGAdmin, and brittle migration
          scripts — <span className="text-foreground font-medium">Schema Weaver consolidates your entire database lifecycle</span> into a single,
          high-performance workspace.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          <Button variant="hero" size="xl" asChild>
            <a href="https://sql-editor.schemaweaver.vivekmind.com">
              Launch SQL Editor — Free
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <a href="https://data-explorer.schemaweaver.vivekmind.com">
              <BookOpen className="w-4 h-4" />
              Explore Data
            </a>
          </Button>
        </div>

        <p
          className="mt-4 text-center text-xs text-muted-foreground animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          No credit card required · Connect once. Available everywhere.
        </p>

        {/* Product hero image */}
        <div
          className="relative mt-20 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent blur-3xl opacity-70 -z-10" />

          <div className="relative rounded-2xl border border-border bg-card shadow-elevated overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 h-9 px-4 border-b border-border bg-muted/40">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-primary/80" />
              </div>
              <div className="flex-1 text-center text-xs font-mono text-muted-foreground">
                schema-weaver — sql-editor — production
              </div>
            </div>
            <img
              src={productImage}
              alt="Schema Weaver SQL Editor with live ER Diagram"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs uppercase tracking-widest text-muted-foreground/70">
          <span>Trusted by teams shipping at</span>
          <span className="font-display text-base normal-case tracking-tight text-muted-foreground">FairyForge</span>
          <span className="font-display text-base normal-case tracking-tight text-muted-foreground">VivekMind Press</span>
          <span className="font-display text-base normal-case tracking-tight text-muted-foreground">Resona Labs</span>
          <span className="font-display text-base normal-case tracking-tight text-muted-foreground">Cloop</span>
          <span className="font-display text-base normal-case tracking-tight text-muted-foreground">+ 40 more</span>
        </div>
      </div>
    </section>
  );
}