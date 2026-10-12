import { Section } from "./Section";
import {
  Briefcase,
  Layers,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const audiences = [
  {
    role: "Founders & Executives",
    badge: "Executive Speed",
    icon: Briefcase,
    accent: "emerald",
    tagline: "Instant answers, zero waiting on reports.",
    description:
      "Get revenue metrics, active user counts, and burn rates instantly without waiting on data team sprint cycles.",
    features: [
      "Ask voice queries while commuting or between meetings",
      "1-Click executive KPI and distribution charts",
      "100% read-only safety with zero mutation risk",
    ],
    tag: "Voice Analytics · Live Executive KPIs",
    ctaLink: "https://data-explorer.schemaweaver.dev?demo=true",
  },
  {
    role: "Product Managers & Analysts",
    badge: "Data Autonomy",
    icon: Layers,
    accent: "blue",
    tagline: "Validate hypotheses without writing SQL.",
    description:
      "Inspect user cohorts, funnel conversion, and feature retention directly from live PostgreSQL in plain English.",
    features: [
      "Natural language queries with precision @table mentions",
      "Instant drill-downs into raw customer event rows",
      "1-Click export to CSV, Excel, and Google Sheets",
    ],
    tag: "Natural Language Query · Instant Exports",
    ctaLink: "https://data-explorer.schemaweaver.dev?demo=true",
  },
  {
    role: "Engineers & DBAs",
    badge: "Architect Grade",
    icon: Terminal,
    accent: "orange",
    tagline: "Zero credential exfiltration. Total control.",
    description:
      "Empower your business stakeholders with self-serve data while retaining strict zero-trust security boundaries.",
    features: [
      "Outbound-only TLS daemon (@schema-weaver/pg-connector)",
      "AST AST query validator blocks DROP & DELETE execution",
      "Zero open inbound firewall ports or VPC changes required",
    ],
    tag: "Outbound Daemon · AST Read-Only Gate",
    ctaLink: "https://data-explorer.schemaweaver.dev?demo=true",
  },
];

export function AudienceSection() {
  return (
    <Section
      id="audience"
      eyebrow="Targeted For Your Entire Team"
      headerClassName="max-w-4xl"
      title={
        <>
          <span className="block text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            One database workspace.
          </span>
          <span className="block text-xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-bold text-gradient-mesh mt-2 tracking-tight">
            Tailored for every stakeholder.
          </span>
        </>
      }
      description="Whether you run the business, build the product, or manage infrastructure — Schema Weaver gives each role the power of PostgreSQL without traditional bottlenecks."
    >
      <div className="mt-12 sm:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {audiences.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={idx}
              className="relative rounded-2xl border border-border/80 bg-card/75 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-border hover:shadow-xl hover:-translate-y-1 group"
            >
              {/* Header with Icon & Role Badge */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-105">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md border border-border/60">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  {item.role}
                </h3>

                <p className="mt-1.5 text-sm sm:text-base font-semibold text-emerald-400">
                  {item.tagline}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Features list */}
                <div className="mt-6 pt-5 border-t border-border/50 space-y-2.5 text-left">
                  {item.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tag & CTA */}
              <div className="mt-7 pt-4 border-t border-border/40">
                <span className="block text-[11px] font-mono text-muted-foreground mb-3 font-medium">
                  {item.tag}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl text-xs sm:text-sm border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer font-medium"
                  asChild
                >
                  <a
                    href={item.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5"
                  >
                    <span>Explore for {item.role.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
