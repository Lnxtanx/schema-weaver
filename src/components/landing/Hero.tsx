import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, BarChart3, Database, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  activeTab?: "explorer" | "editor";
  onTabChange?: (tab: "explorer" | "editor") => void;
}

const explorerImages = [
  "/images/de/resona-ai/ds-ai/ds-generated.png",
  "/images/de/resona-ai/va/on-ds.png",
  "/images/voice.png",
  "/images/de.png",
];

const dataExplorerTags = [
  "Resona Voice",
  "Resona AI",
  "Live Data Grid",
  "Executive Dashboards",
  "Flash & Deep Modes",
  "Read-Only by Design",
  "Full Schema ZIP Export",
  "Column Profiling",
  "Direct Postgres Wire",
  "Zero Credential Exfiltration",
];

const sqlEditorTags = [
  "20-Layer Schema Compiler",
  "ER Graph Intelligence",
  "Dijkstra Path Analysis",
  "Modular DDL",
  "Schema Diff & Sync",
  "Drift Detection",
  "Safe Migrations",
  "100% Client-Side Compiler",
];

export function Hero({ activeTab: controlledTab, onTabChange }: HeroProps) {
  const [internalTab, setInternalTab] = useState<"explorer" | "editor">("explorer");
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = onTabChange ?? setInternalTab;
  const tags = activeTab === "explorer" ? dataExplorerTags : sqlEditorTags;

  // Auto-advancing image carousel in the first section
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (activeTab !== "explorer" || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % explorerImages.length);
    }, 3600);

    return () => clearInterval(timer);
  }, [activeTab, isPaused]);

  return (
    <section className="relative pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-16 overflow-hidden bg-background">
      {/* Green Grid Lines Background (Initial 48px grid) */}
      <div className="absolute inset-0 grid-bg-emerald opacity-80 [mask-image:radial-gradient(ellipse_at_top,black_60%,transparent_90%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Headline */}
        <h1 className="text-center font-display font-bold tracking-tight text-2xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.15] max-w-5xl mx-auto text-foreground">
          <span className="block">
            The first <span className="text-gradient-mesh">voice-native</span> analytics
          </span>
          <span className="block mt-1 sm:mt-2">
            workspace for PostgreSQL
          </span>
        </h1>

        {/* Dual CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full px-2 sm:px-0">
          <Button
            variant="hero"
            size="xl"
            className="w-full sm:w-auto rounded-xl shadow-glow-emerald px-6 sm:px-8 text-center cursor-pointer"
            asChild
          >
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
                : "Launch SQL Editor — Free"}
              <ArrowRight className="w-4 h-4 ml-2" />
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

        {/* Sign In Button in Mid */}
        <div className="mt-3.5 flex items-center justify-center">
          <Button
            variant="outline"
            size="xl"
            className="w-full sm:w-auto rounded-xl border border-border/80 bg-card hover:bg-muted/80 text-foreground font-semibold px-6 sm:px-8 shadow-sm hover:border-primary/50 transition-all cursor-pointer"
            asChild
          >
            <a
              href={
                activeTab === "explorer"
                  ? "https://data-explorer.schemaweaver.dev"
                  : "https://sql-editor.schemaweaver.dev"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <span>Sign in to workspace</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </a>
          </Button>
        </div>

        {/* Product Workspace Preview (High-Contrast Dark Window on Light Background) */}
        <div className="relative mt-12 md:mt-16">
          {/* Subtle ambient glow behind the container */}
          <div className="absolute -inset-x-10 -top-10 -bottom-10 bg-primary/10 blur-3xl opacity-50 -z-10 rounded-full pointer-events-none" />

          {/* Interactive Switcher Tabs */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex p-1 rounded-xl border border-border bg-card/90 backdrop-blur shadow-sm">
              <button
                onClick={() => setActiveTab("explorer")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === "explorer"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Data Explorer</span>
              </button>
              <button
                onClick={() => setActiveTab("editor")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === "editor"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>SQL Editor</span>
              </button>
            </div>
          </div>

          {/* High-contrast application window */}
          <div className="relative rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-[#0b101b] shadow-2xl overflow-hidden">
            {/* Active Workspace Screenshot */}
            <div
              className="relative bg-card dark:bg-[#0b101b] group/hero-preview"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {activeTab === "explorer" ? (
                <div className="relative">
                  <img
                    key={explorerImages[currentSlide]}
                    src={explorerImages[currentSlide]}
                    alt="Schema Weaver Voice Data Explorer"
                    className="w-full h-auto block animate-fade-in transition-all duration-300"
                  />

                  {/* Prev / Next Arrows */}
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + explorerImages.length) % explorerImages.length)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/hero-preview:opacity-100 transition-opacity duration-200 cursor-pointer shadow-lg z-10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % explorerImages.length)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/hero-preview:opacity-100 transition-opacity duration-200 cursor-pointer shadow-lg z-10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 z-10">
                    {explorerImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                          i === currentSlide
                            ? "w-6 bg-emerald-400 shadow-glow-emerald"
                            : "w-1.5 bg-slate-600 hover:bg-slate-400"
                        )}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <img
                  src="/images/sql-editor/sql-editor.png"
                  alt="Schema Weaver SQL Editor with live ER Diagram"
                  className="w-full h-auto block"
                />
              )}
            </div>
          </div>
        </div>

        {/* Infinite Marquee Ticker */}
        <div className="mt-14 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex items-center gap-6 select-none py-1.5">
            {[...tags, ...tags].map((tag, idx) => (
              <div
                key={`${tag}-${idx}`}
                className="flex items-center gap-6 shrink-0"
              >
                <span className="text-xs sm:text-sm font-mono text-muted-foreground/80 hover:text-foreground transition-colors tracking-wide">
                  {tag}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-border/80 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
