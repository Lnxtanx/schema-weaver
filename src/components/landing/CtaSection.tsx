import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

interface CtaSectionProps {
  activeTab?: "explorer" | "editor";
}

export function CtaSection({ activeTab = "explorer" }: CtaSectionProps) {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 dot-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display font-bold tracking-tight text-2xl sm:text-4xl lg:text-5xl leading-[1.15]">
          {activeTab === "explorer" ? (
            <>
              Explore live PostgreSQL data <br />
              <span className="text-gradient-mesh">with voice and speed.</span>
            </>
          ) : (
            <>
              Ship your next migration <br />
              <span className="text-gradient-mesh">with confidence.</span>
            </>
          )}
        </h2>

        <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
          {activeTab === "explorer"
            ? "Talk to your database by voice, inspect tables in high-performance grids, and build instant executive dashboards. Connects directly in seconds."
            : "Join the teams using Schema Weaver to design, visualize, sync, and compile their PostgreSQL schemas. Free to start."}
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full px-2 sm:px-0">
          <Button variant="hero" size="xl" className="w-full sm:w-auto text-center shadow-glow-emerald" asChild>
            <a
              href={
                activeTab === "explorer"
                  ? "https://data-explorer.schemaweaver.dev?demo=true"
                  : "https://sql-editor.schemaweaver.dev"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {activeTab === "explorer"
                ? "Try Live Demo — Instant"
                : "Launch SQL Editor — Free"}{" "}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </a>
          </Button>

          <Button
            size="xl"
            className="w-full sm:w-auto rounded-xl border border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 hover:border-blue-400 shadow-lg shadow-blue-500/10 px-6 sm:px-7 text-center cursor-pointer transition-all font-semibold"
            asChild
          >
            <a
              href="https://calendar.app.google/1BLuy4FkJwWGLcwFA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="w-4 h-4 mr-2 text-blue-400" />
              Book a Demo
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
