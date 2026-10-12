import { useState, useEffect, useRef } from "react";
import {
  Mic,
  MessageSquare,
  LayoutDashboard,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const agents = [
  {
    id: "voice",
    title: "Resona Voice",
    tabLabel: "Voice Analytics",
    badge: "Voice AI Agent",
    icon: Mic,
    headline: "Talk to PostgreSQL out loud.",
    summary:
      "Speak directly to your database. Resona streams audio, formulates verified read-only SQL, and speaks back analytical metrics in real time.",
    points: [
      "Real-time voice streaming and audio synthesis",
      "Strict AST-verified read-only query execution",
      "Hands-free KPI updates and metric lookups",
    ],
    image: "/images/voice.png",
    fallbackImage: "/images/de/resona-ai/va/resona-voice-connected.png",
    ctaText: "Try Voice Demo",
  },
  {
    id: "chat",
    title: "Resona AI",
    tabLabel: "Resona AI",
    badge: "Autonomous AI Agent",
    icon: MessageSquare,
    headline: "Deep reasoning over live data.",
    summary:
      "Your main analyst — ask anything, get answers and files back. An autonomous agent that deep-dives your live database and writes the report.",
    points: [
      "Ask complex analytical questions across all tables in text",
      "Autonomously inspects schemas and writes verified read-only SQL",
      "Instant data export to CSV, Excel, Google Sheets, and reports",
    ],
    image: "/images/de/resona-ai/de/de.png",
    fallbackImage: "/images/de.png",
    ctaText: "Try Resona AI",
  },
  {
    id: "dashboard",
    title: "Resona Dashboard",
    tabLabel: "Executive Dashboards",
    badge: "Dashboard Agent",
    icon: LayoutDashboard,
    headline: "Instant automated dashboards.",
    summary:
      "Turn raw tables into executive charts in seconds. Resona auto-detects metric distributions, cohort aggregations, and trends without BI setup.",
    points: [
      "Auto-detected time-series and KPI cards",
      "Interactive drill-downs from charts into live rows",
      "Zero configuration BI for any PostgreSQL database",
    ],
    image: "/images/de/resona-ai/ds-ai/ds-generated.png",
    fallbackImage: "/images/de/resona-ai/ds-ai/dashabord-ai.png",
    ctaText: "Try Dashboards",
  },
];

export function ResonaExplorerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isManualClickRef = useRef(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll-driven progression through agents ("magic" scroll carousel)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isManualClickRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = sectionRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            // Pinned below fixed announcement bar + header (~96px)
            const pinOffset = 96;
            const totalScrollable = el.offsetHeight - window.innerHeight;
            if (totalScrollable > 0) {
              const rawProgress = (pinOffset - rect.top) / totalScrollable;
              const progress = Math.min(1, Math.max(0, rawProgress));

              // Clean 3-agent progression across scroll distance:
              // 0.00 to 0.35 -> Voice Analytics (Slide 1: Text Left, Image Right)
              // 0.35 to 0.70 -> Resona AI (Slide 2: Text Right, Image Left)
              // 0.70 to 1.00 -> Executive Dashboards (Slide 3: Text Left, Image Right)
              let newIdx = 0;
              if (progress >= 0.70) {
                newIdx = 2;
              } else if (progress >= 0.35) {
                newIdx = 1;
              } else {
                newIdx = 0;
              }
              setActiveIdx(newIdx);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth jump on direct tab click and sync scroll position
  const handleTabClick = (index: number) => {
    setActiveIdx(index);
    isManualClickRef.current = true;
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 800);

    const el = sectionRef.current;
    if (el) {
      const totalScrollable = el.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const pinOffset = 96;
        const targetPercent = index === 0 ? 0.12 : index === 1 ? 0.52 : 0.86;
        const elTop = el.getBoundingClientRect().top + window.scrollY - pinOffset;
        const targetY = elTop + targetPercent * totalScrollable;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  };

  const activeAgent = agents[activeIdx];
  const Icon = activeAgent.icon;

  // Alternating layout: 1st text on left, 2nd text on right, 3rd text on left
  const isTextOnRight = activeIdx === 1;

  return (
    <section
      ref={sectionRef}
      id="resona-ai"
      className="relative h-[320vh] sm:h-[340vh] w-full bg-background border-t border-border/40 scroll-mt-28"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 grid-bg-emerald opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

      {/* Sticky pinned container: comfortably fits entire card + header + tabs within viewport */}
      <div className="sticky top-[88px] sm:top-[96px] h-[calc(100vh-92px)] sm:h-[calc(100vh-100px)] flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 py-1 sm:py-2">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-1.5 shrink-0">
          <h2 className="font-display font-bold tracking-tight text-xl sm:text-2xl md:text-3xl text-foreground leading-tight">
            Resona AI.
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm font-semibold text-gradient-mesh tracking-tight">
            Three Specialized Agents for Live PostgreSQL Data.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center mb-2 sm:mb-2.5 shrink-0">
          <div className="inline-flex p-1 sm:p-1.5 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-sm gap-1 max-w-full overflow-x-auto no-scrollbar">
            {agents.map((agent, index) => {
              const TabIcon = agent.icon;
              const isActive = index === activeIdx;

              return (
                <button
                  key={agent.id}
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer select-none",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow-emerald font-semibold scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  <TabIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                  <span className="whitespace-nowrap">{agent.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Outer Card Box: sized to fit 100% in viewport without cutoff, 71% image / 29% text */}
        <div className="relative shrink-0 w-full">
          <div className="absolute -inset-x-8 -top-8 -bottom-8 bg-primary/10 blur-3xl opacity-30 -z-10 rounded-full pointer-events-none" />

          <div className="relative rounded-2xl border border-slate-800 bg-[#0b101b] shadow-2xl overflow-hidden transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-stretch min-h-[380px] sm:min-h-[420px] lg:h-[440px] xl:h-[450px]">
              {/* Slightly less width for text (29% on desktop) */}
              <div
                className={cn(
                  "w-full lg:w-[29%] flex flex-col justify-center text-left p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-2.5 shrink-0 transition-all duration-300",
                  isTextOnRight ? "lg:order-2" : "lg:order-1"
                )}
              >
                <div className="inline-flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    {activeAgent.badge}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-foreground tracking-tight leading-tight">
                  {activeAgent.headline}
                </h3>

                <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                  {activeAgent.summary}
                </p>

                {/* Concise Highlights */}
                <ul className="space-y-1 sm:space-y-1.5 pt-0.5 text-xs sm:text-[13px] text-foreground/90">
                  {activeAgent.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-1">
                  <Button
                    variant="hero"
                    size="sm"
                    className="rounded-xl gap-2 text-xs sm:text-sm shadow-glow-emerald cursor-pointer h-8 sm:h-9 px-3.5"
                    asChild
                  >
                    <a
                      href="https://data-explorer.schemaweaver.dev?demo=true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {activeAgent.ctaText}
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* More width for image (71% on desktop) - stretched height to fill container and centered */}
              <div
                className={cn(
                  "w-full lg:w-[71%] relative min-h-[280px] sm:min-h-[340px] lg:min-h-0 lg:h-full overflow-hidden bg-[#090d16] transition-all duration-300",
                  isTextOnRight
                    ? "lg:order-1 border-b lg:border-b-0 lg:border-r border-slate-800/80"
                    : "lg:order-2 border-t lg:border-t-0 lg:border-l border-slate-800/80"
                )}
              >
                <img
                  key={activeAgent.id}
                  src={activeAgent.image}
                  alt={`${activeAgent.title} interface`}
                  className="w-full h-full absolute inset-0 object-cover object-center animate-fade-in transition-all duration-300 block"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (activeAgent.fallbackImage && target.src !== activeAgent.fallbackImage) {
                      target.src = activeAgent.fallbackImage;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






