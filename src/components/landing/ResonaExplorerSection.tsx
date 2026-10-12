import { Section } from "./Section";
import { Mic, MessageSquare, LayoutDashboard, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const agents = [
  {
    id: "voice",
    title: "Resona Voice",
    badge: "Voice Analytics Agent",
    tagline: "Talk to your database out loud.",
    description:
      "Speak directly to PostgreSQL in natural conversational English. Resona streams audio, formulates read-only SQL, runs the query, and speaks back key analytical metrics and trends in real-time.",
    icon: Mic,
    image: "/images/voice.png",
    fallbackImage: "/images/de/resona-ai/va/resona-voice-connected.png",
    highlights: [
      "Zero-latency speech recognition & voice synthesis",
      "Hands-free operational KPI and revenue checks",
      "Speaks concise summaries with full data context",
    ],
  },
  {
    id: "chat",
    title: "Resona Chat",
    badge: "NLQ & Query Agent",
    tagline: "Natural language questions to live SQL grids.",
    description:
      "Ask complex questions in plain English with @table mentions. Resona inspects schemas, writes safe read-only queries, self-corrects on errors, and renders interactive data tables and instant exports.",
    icon: MessageSquare,
    image: "/images/de/resona-ai/de/de.png",
    fallbackImage: "/images/data-explorer/resona-ai.png",
    highlights: [
      "Precision @table mentions and column scoping",
      "Auto-recovering ReAct reasoning loop",
      "Instant export to CSV, Excel, JSON, and Google Sheets",
    ],
  },
  {
    id: "dashboard",
    title: "Resona Dashboard",
    badge: "Executive Synthesis Agent",
    tagline: "1-Click automated executive dashboards.",
    description:
      "Transform raw PostgreSQL tables into executive-ready dashboards in seconds. Resona auto-detects metrics, aggregations, time-series trends, and cohorts, synthesizing rich interactive visualization widgets.",
    icon: LayoutDashboard,
    image: "/images/de/resona-ai/ds-ai/ds-generated.png",
    fallbackImage: "/images/de/resona-ai/ds-ai/dashabord-ai.png",
    highlights: [
      "Automated KPI cards, distribution bars, & trends",
      "Custom metric definitions that persist across sessions",
      "Interactive drill-downs directly into the live data grid",
    ],
  },
];

export function ResonaExplorerSection() {
  return (
    <Section
      id="resona-ai"
      eyebrow="Agentic Analytics & Voice AI"
      headerClassName="max-w-5xl"
      title={
        <>
          <span className="block text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Meet Resona AI.
          </span>
          <span className="block text-xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-bold text-gradient-mesh mt-2 tracking-tight whitespace-normal lg:whitespace-nowrap">
            Three Specialized Agents for Live PostgreSQL Data.
          </span>
        </>
      }
      description="Resona isn't a generic chat overlay — it's an intelligent analytics engine tailored specifically for PostgreSQL. It operates in three coordinated agent forms that share unified context memory to inspect, query, and visualize your live database."
    >
      {/* 3 Agents Showcase - Unified, Consistent Enterprise Design */}
      <div className="mt-14 space-y-10 lg:space-y-12">
        {agents.map((agent) => {
          const Icon = agent.icon;

          return (
            <div
              key={agent.id}
              className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm overflow-hidden p-6 sm:p-8 lg:p-10 transition-all hover:border-border hover:shadow-2xl hover:shadow-emerald-950/20"
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Text Side (Consistent Left Orientation for all 3 cards) */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                      {agent.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {agent.title}
                  </h3>

                  <p className="mt-1.5 text-base sm:text-lg font-medium text-emerald-400/90">
                    {agent.tagline}
                  </p>

                  <p className="mt-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Highlights list */}
                  <ul className="mt-6 space-y-2.5">
                    {agent.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg gap-2 text-xs sm:text-sm border-border hover:border-emerald-500/40 hover:bg-emerald-500/5 cursor-pointer"
                      asChild
                    >
                      <a href="https://data-explorer.schemaweaver.dev">
                        Try {agent.title} in Data Explorer
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Screenshot Side (Consistent Right Orientation for all 3 cards) */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-2xl border border-border/80 bg-card overflow-hidden shadow-2xl transition-all duration-300 hover:border-border">
                    <img
                      src={agent.image}
                      alt={`${agent.title} interface`}
                      className="w-full h-auto block object-cover object-top"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (agent.fallbackImage && target.src !== agent.fallbackImage) {
                          target.src = agent.fallbackImage;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
