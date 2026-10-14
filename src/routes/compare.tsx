import { Fragment, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  Minus,
  ArrowRight,
  Brain,
  LayoutDashboard,
  Table,
  Users,
  ShieldCheck,
  CreditCard,
  DollarSign,
  Sparkles,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { breadcrumbList } from "@/lib/seo/site";

/* ─────────────────────────────────────────────────────────────────────────────
 * Route Metadata
 * ───────────────────────────────────────────────────────────────────────────── */

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      {
        title: "Schema Weaver vs Power BI, Tableau, Metabase & ThoughtSpot",
      },
      {
        name: "description",
        content:
          "Compare Schema Weaver against Power BI, Tableau, Metabase, Outerbase, and ThoughtSpot for live PostgreSQL visualization, AI querying, and pricing.",
      },
      {
        name: "keywords",
        content:
          "Schema Weaver vs Power BI, Schema Weaver vs Tableau, Schema Weaver vs Metabase, Schema Weaver vs Outerbase, Schema Weaver vs Draxlr, PostgreSQL data visualization comparison, AI BI tools",
      },
      {
        property: "og:title",
        content: "Schema Weaver vs Competitors — Data Visualization & Analytics Benchmark",
      },
      {
        property: "og:description",
        content:
          "See how Schema Weaver compares to Power BI, Tableau, Metabase, Outerbase, Draxlr, and ThoughtSpot in live PostgreSQL visualization, voice querying, and transparent pricing.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://schemaweaver.dev/compare",
      },
    ],
    links: [{ rel: "canonical", href: "https://schemaweaver.dev/compare" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Schema Weaver — Competitor Comparison",
          description:
            "Technical and pricing comparison of Schema Weaver against Power BI, Tableau, Metabase, Outerbase, Draxlr, and ThoughtSpot.",
          url: "https://schemaweaver.dev/compare",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
          ]),
        ),
      },
    ],
  }),
  component: ComparePage,
});

/* ─────────────────────────────────────────────────────────────────────────────
 * Unique Innovations (Found Only in Schema Weaver)
 * ───────────────────────────────────────────────────────────────────────────── */

interface Innovation {
  icon: LucideIcon;
  title: string;
  description: string;
}

const uniqueInnovations: Innovation[] = [
  {
    icon: Brain,
    title: "Resona AI",
    description:
      "A unified intelligence architecture with three specialized agents: Voice-to-Voice AI for real-time conversational database queries, Dashboard AI for 1-click executive dashboard synthesis, and Data Explorer AI for deep schema profiling, anomaly scans, and multi-artifact reasoning.",
  },
  {
    icon: LayoutDashboard,
    title: "1-Click Advanced Statistics & Dashboards",
    description:
      "Generate comprehensive statistical metrics and interactive executive dashboards in a single click. Automatically computes KPI distributions, quartile spreads, and trends across live PostgreSQL tables, complete with an 'Investigate Why' root-cause diagnosis engine.",
  },
  {
    icon: Table,
    title: "Live Data Explorer Grid & Exports",
    description:
      "High-performance virtualized grid for browsing, filtering, and analyzing live PostgreSQL data in real time. Inspect columns with instant statistical profiling and export live datasets across View (WYSIWYG), Table, or Database scopes into Google Sheets, Excel, CSV, JSON, and SQL.",
  },
  {
    icon: Users,
    title: "Seamless Team Database Collaboration",
    description:
      "Collaborate effortlessly across engineering and product teams on live databases without sharing raw credentials. Share interactive dashboards, saved queries, and virtual data views with granular role-based access control (RBAC), team workspaces, and transparent audit trails.",
  },
  {
    icon: ShieldCheck,
    title: "pg-connector & Credential Boundary",
    description:
      "Connect any PostgreSQL database (Localhost, Supabase, Neon, AWS RDS, GCP) through the open-source @schema-weaver/pg-connector daemon. Establishes an outbound-only TLS tunnel with zero open inbound ports, local AES-256 credential storage, and AST read-only query safety guards.",
  },
  {
    icon: Zap,
    title: "Zero ETL & Zero Cloud Data Storage",
    description:
      "Execute queries directly against your live PostgreSQL database in real time with zero extract lag and zero intermediate data warehousing. Schema Weaver never caches, stages, or retains your customer database records in the cloud.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Comparison Matrix Types & Data
 * ───────────────────────────────────────────────────────────────────────────── */

type CellValue = "Y" | "P" | "N";

interface CompetitorMeta {
  name: string;
  role: string;
  highlight?: boolean;
}

const competitors: CompetitorMeta[] = [
  { name: "Schema Weaver", role: "Voice-Native Workspace", highlight: true },
  { name: "Power BI", role: "Enterprise BI" },
  { name: "Tableau", role: "Visual Analytics" },
  { name: "Metabase", role: "Open-Source BI" },
  { name: "Outerbase", role: "AI Database Studio" },
  { name: "Draxlr", role: "Postgres Dashboards" },
  { name: "ThoughtSpot", role: "Search AI Analytics" },
];

interface ComparisonRow {
  feature: string;
  detail: string;
  values: CellValue[];
}

interface ComparisonCategory {
  title: string;
  tag: string;
  rows: ComparisonRow[];
}

const categories: ComparisonCategory[] = [
  {
    title: "Resona AI (3 Specialized Agents)",
    tag: "Resona AI",
    rows: [
      {
        feature: "Resona Voice: Full-duplex voice-to-voice agent",
        detail: "Bidirectional audio streaming over live PostgreSQL with ambient orb and speech barge-in.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "Resona AI Chat: Autonomous multi-step ReAct agent",
        detail: "Schema introspection, self-correcting SQL loops, @table mentions, and analytical reports.",
        values: ["Y", "P", "P", "P", "P", "N", "P"],
      },
      {
        feature: "Resona Dashboard AI: Autonomous multi-query execution loop",
        detail: "Multi-query parallel planning ('Ran N queries' trace) to synthesize and refine executive cards.",
        values: ["Y", "P", "P", "N", "N", "N", "P"],
      },
      {
        feature: "Dual execution tiers (Flash mode vs Deep thinking)",
        detail: "Instant toggle between rapid exploratory queries (Flash) and deep extended reasoning traces (Deep).",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "Cross-agent persistent business memory & directives",
        detail: "Shared memory across Voice, Chat, and Dashboards with founder directives & metric rules.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
    ],
  },
  {
    title: "Data Explorer & Live Grid",
    tag: "Data Explorer",
    rows: [
      {
        feature: "Virtualized live PostgreSQL grid with canvas auto-sizing",
        detail: "Infinite scrolling with canvas-measured smart auto column widths and double-click reset.",
        values: ["Y", "P", "P", "P", "Y", "P", "P"],
      },
      {
        feature: "Dual-mode filtering (Client in-memory + Server pushdown)",
        detail: "One-click toggle between zero-latency client search and server-side SQL pushdown.",
        values: ["Y", "P", "P", "P", "P", "P", "P"],
      },
      {
        feature: "Instant cell hover preview & rich multi-line inspector",
        detail: "Zero-click hover tooltips for truncated strings and dedicated inspector for JSON & arrays.",
        values: ["Y", "P", "P", "P", "Y", "P", "N"],
      },
      {
        feature: "Live column statistical profiling & distribution metrics",
        detail: "Live computation of null %, distinct counts, min/max, and quartile distributions in headers.",
        values: ["Y", "P", "P", "P", "N", "P", "N"],
      },
      {
        feature: "Multi-scope & multi-format exports (Google Sheets sync)",
        detail: "Export at View, Table, or DB scope into 1-click Google Sheets sync, Excel, CSV, JSON, and SQL.",
        values: ["Y", "P", "P", "P", "P", "P", "P"],
      },
    ],
  },
  {
    title: "Dashboards & Executive Metrics",
    tag: "Dashboards",
    rows: [
      {
        feature: "1-Click autonomous dashboard synthesis from raw schema",
        detail: "Auto-discovers tables, foreign keys, and metrics to synthesize executive dashboards in seconds.",
        values: ["Y", "P", "P", "P", "N", "P", "P"],
      },
      {
        feature: "Executive Read cards with actionable strategic recommendations",
        detail: "Headline KPIs paired with written business diagnosis and actionable strategic recommendations.",
        values: ["Y", "P", "P", "N", "N", "N", "P"],
      },
      {
        feature: "'Investigate Why' root-cause anomaly diagnosis",
        detail: "One-click drilldown into metric anomalies via autonomous targeted diagnostic SQL probes.",
        values: ["Y", "P", "P", "N", "N", "N", "P"],
      },
      {
        feature: "Interactive multi-panel visualizations & time-series trends",
        detail: "Dynamic Line, Area, Donut, and Bar charts with period-over-period deltas and cumulative growth.",
        values: ["Y", "Y", "Y", "Y", "P", "Y", "Y"],
      },
      {
        feature: "Conversational dashboard tailoring & card controls",
        detail: "Add, resize, adjust metrics, or reorder cards conversationally without drag-and-drop builders.",
        values: ["Y", "P", "P", "N", "N", "N", "P"],
      },
    ],
  },
  {
    title: "Team Collaboration & pg-connector Security",
    tag: "Team & Security",
    rows: [
      {
        feature: "Local Credential Boundary (LCB — Zero cloud passwords)",
        detail: "Database passwords remain in your local AES-256 vault; never sent to or stored in any cloud.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "Zero-Ingress outbound TLS daemon (0 open inbound ports)",
        detail: "Reverse-polling daemon connects outbound over TLS 1.3; 0 open inbound ports or public IPs.",
        values: ["Y", "P", "P", "N", "P", "N", "P"],
      },
      {
        feature: "Connector-Enforced Read-Only execution guard (CERO)",
        detail: "Local AST inspection at the daemon boundary strictly rejects writes and data mutations.",
        values: ["Y", "P", "P", "P", "N", "P", "P"],
      },
      {
        feature: "Zero ETL & zero cloud data storage architecture",
        detail: "Direct queries with zero intermediate data warehousing or cloud row retention.",
        values: ["Y", "P", "P", "Y", "Y", "Y", "P"],
      },
      {
        feature: "Team collaboration with zero credential sharing",
        detail: "Invite colleagues with Owner/Admin/Member RBAC without exposing raw database passwords.",
        values: ["Y", "P", "P", "P", "P", "P", "P"],
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Pricing Comparison Data
 * ───────────────────────────────────────────────────────────────────────────── */

interface PricingTierComparison {
  name: string;
  freeTier: string;
  freeDetails: string;
  entryPaid: string;
  paidModel: string;
  setupComplexity: string;
  highlight?: boolean;
}

const pricingComparisons: PricingTierComparison[] = [
  {
    name: "Schema Weaver",
    freeTier: "Permanent Free ($0)",
    freeDetails: "3,000 AI credits/mo, full live grid, dashboards, voice, and zero-tunnel connector.",
    entryPaid: "$29 / mo (Pro)",
    paidModel: "Month-to-month, credit-based (200k credits). Team workspaces at $15/seat.",
    setupComplexity: "30s outbound daemon (`pg-connector init`). Zero firewall changes.",
    highlight: true,
  },
  {
    name: "Draxlr",
    freeTier: "Limited Free",
    freeDetails: "Limited to 5 queries and 1 dashboard.",
    entryPaid: "$39 / mo (Starter)",
    paidModel: "Tiered query & dashboard limits ($99/mo Pro, $299/mo Scale).",
    setupComplexity: "Requires public connection string and firewall IP allowlisting.",
  },
  {
    name: "ThoughtSpot",
    freeTier: "30-Day Trial Only",
    freeDetails: "No permanent free tier.",
    entryPaid: "$95 / mo (Team)",
    paidModel: "Query consumption credits + high annual enterprise contracts.",
    setupComplexity: "Requires pre-configured cloud data warehouse (Snowflake, BigQuery).",
  },
  {
    name: "Outerbase",
    freeTier: "Limited Free",
    freeDetails: "Basic query limits. Hosted SaaS acquired by Cloudflare.",
    entryPaid: "$20 / user / mo",
    paidModel: "Monthly per-user subscription for hosted features.",
    setupComplexity: "Requires sharing database connection credentials with cloud servers.",
  },
  {
    name: "Metabase",
    freeTier: "Self-Hosted OSS Free",
    freeDetails: "Free open-source binary, but you must pay for server, hosting, and DevOps.",
    entryPaid: "$85 / mo (Cloud)",
    paidModel: "Starts at $85/mo for 5 users ($5/user after). Pro is $500/month.",
    setupComplexity: "Requires Docker/JVM hosting or opening database ports to Metabase Cloud.",
  },
  {
    name: "Tableau",
    freeTier: "14-Day Trial Only",
    freeDetails: "No permanent free plan. Full trial expires after 14 days.",
    entryPaid: "$75 / user / mo ($900/yr)",
    paidModel: "Mandatory annual contracts ($900/yr per Creator license minimum).",
    setupComplexity: "Requires Tableau Server or direct cloud firewall port exposure.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Compact Comparison Cell
 * ───────────────────────────────────────────────────────────────────────────── */

function CompareCell({
  value,
  isSchemaWeaver,
}: {
  value: CellValue;
  isSchemaWeaver?: boolean;
}) {
  if (value === "Y")
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center w-5 h-5 rounded-full transition-transform",
          isSchemaWeaver
            ? "bg-primary/20 ring-1 ring-primary/40 text-primary"
            : "bg-emerald-500/15 text-emerald-500",
        )}
      >
        <Check className="w-3 h-3 stroke-[2.5]" />
      </span>
    );
  if (value === "P")
    return (
      <span
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 text-amber-500"
        title="Partial or limited support"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
      </span>
    );
  return <Minus className="w-3.5 h-3.5 text-muted-foreground/30 mx-auto" />;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Main Compare Page Component
 * ───────────────────────────────────────────────────────────────────────────── */

function ComparePage() {
  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = [
    "All",
    "Resona AI",
    "Data Explorer",
    "Dashboards",
    "Team & Security",
  ];

  const visibleCategories =
    activeTag === "All"
      ? categories
      : categories.filter((c) => c.tag === activeTag);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />

      <main className="pb-16 sm:pb-24">
        {/* ── Hero Section ──────────────────────────────────────────────── */}
        <section className="pt-28 sm:pt-36 pb-8 sm:pb-12 text-center px-4 max-w-5xl mx-auto">
          <p className="font-display font-semibold text-sm sm:text-base tracking-tight text-primary mb-2">
            Schema Weaver
          </p>
          <h1 className="font-display font-bold tracking-tight text-3xl sm:text-5xl lg:text-6xl text-foreground">
            How Schema Weaver{" "}
            <span className="text-gradient-mesh">stacks up.</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            An objective comparison of Schema Weaver against Power BI, Tableau, Metabase, Outerbase, Draxlr, and ThoughtSpot
            across data visualization, AI querying, and live PostgreSQL capabilities.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <Button variant="hero" size="sm" className="h-9 px-4 text-xs font-semibold" asChild>
              <a href="https://data-explorer.schemaweaver.dev">
                Launch Data Explorer <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </Button>
            <Button variant="glass" size="sm" className="h-9 px-4 text-xs font-medium" asChild>
              <Link to="/pricing">View Pricing Plans</Link>
            </Button>
          </div>


        </section>

        {/* ── Unique Architectural Innovations ─────────────────────────── */}
        <section className="py-8 sm:py-12 border-t border-border/60 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Unique Innovations
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-foreground mt-1">
                Things only Schema Weaver does.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {uniqueInnovations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border/70 bg-card/60 p-5 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-xs"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="mt-3.5 font-display font-semibold text-base text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Technical Matrix Table ────────────────────────────────────── */}
        <section className="py-8 sm:py-12 border-t border-border/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Technical Benchmark
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-foreground mt-1">
                  20 capabilities benchmarked.
                </h2>
              </div>

              {/* Segmented Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-muted/40 border border-border/60">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t)}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
                      activeTag === t
                        ? "bg-card text-foreground shadow-xs border border-border/80"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 text-xs text-muted-foreground mb-3 pb-2 border-b border-border/40">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-500">
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </span>
                <span className="text-xs">Full support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500/10 text-amber-500">
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                </span>
                <span className="text-xs">Partial / limited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Minus className="w-3 h-3 text-muted-foreground/40" />
                <span className="text-xs">Not available</span>
              </div>
            </div>

            {/* Clean, Dense Table */}
            <div className="overflow-x-auto rounded-xl border border-border/70 bg-card/30 shadow-xs">
              <table className="w-full text-xs min-w-[1060px] border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border/70 sticky top-0 z-10 backdrop-blur">
                    <th className="text-left font-semibold text-muted-foreground py-3 px-3.5 w-[330px]">
                      Capability
                    </th>
                    {competitors.map((c) => (
                      <th
                        key={c.name}
                        className={cn(
                          "text-center py-3 px-2 w-[105px]",
                          c.highlight && "bg-primary/5 border-x border-primary/20",
                        )}
                      >
                        <div
                          className={cn(
                            "font-display font-semibold text-xs",
                            c.highlight ? "text-primary font-bold" : "text-foreground",
                          )}
                        >
                          {c.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-normal mt-0.5">
                          {c.role}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleCategories.map((cat) => (
                    <Fragment key={cat.title}>
                      <tr className="bg-muted/30 border-t border-border/70">
                        <td
                          colSpan={competitors.length + 1}
                          className="py-2 px-3.5 text-xs font-semibold uppercase tracking-wider text-primary"
                        >
                          {cat.title}
                        </td>
                      </tr>
                      {cat.rows.map((row) => (
                        <tr
                          key={row.feature}
                          className="border-t border-border/40 hover:bg-muted/20 transition-colors"
                        >
                          <td className="py-2.5 px-3.5 align-middle">
                            <div className="font-medium text-foreground text-xs">
                              {row.feature}
                            </div>
                            <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                              {row.detail}
                            </div>
                          </td>
                          {row.values.map((val, idx) => (
                            <td
                              key={idx}
                              className={cn(
                                "py-2.5 px-2 text-center align-middle",
                                idx === 0 && "bg-primary/5 border-x border-primary/20",
                              )}
                            >
                              <CompareCell
                                value={val}
                                isSchemaWeaver={idx === 0}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Pricing & Commercial Comparison Section ───────────────────── */}
        <section className="py-10 sm:py-16 border-t border-border/70 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Transparent Pricing Benchmark
              </span>
              <h2 className="text-xl sm:text-3xl font-display font-bold tracking-tight text-foreground mt-1">
                How pricing compares.
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Traditional visualization and analytics platforms lock teams into expensive annual contracts,
                opaque query limits, or mandatory server management. Schema Weaver
                provides a permanent free plan and transparent, pay-first credits.
              </p>
            </div>

            {/* Pricing Comparison Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pricingComparisons.map((item) => (
                <div
                  key={item.name}
                  className={cn(
                    "rounded-xl border p-5 flex flex-col justify-between transition-all",
                    item.highlight
                      ? "border-primary/50 bg-card shadow-sm ring-1 ring-primary/20"
                      : "border-border/70 bg-card/50",
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/50">
                      <div className="font-display font-bold text-base text-foreground">
                        {item.name}
                      </div>
                      {item.highlight && (
                        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                          Recommended
                        </span>
                      )}
                    </div>

                    <div className="mt-4 space-y-3 text-xs">
                      <div>
                        <div className="text-muted-foreground text-[11px] font-medium">Free Plan</div>
                        <div className="font-semibold text-foreground text-sm mt-0.5">
                          {item.freeTier}
                        </div>
                        <div className="text-muted-foreground text-[11px] mt-0.5 leading-snug">
                          {item.freeDetails}
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-border/40">
                        <div className="text-muted-foreground text-[11px] font-medium">Entry Paid Tier</div>
                        <div className="font-semibold text-foreground text-sm mt-0.5">
                          {item.entryPaid}
                        </div>
                        <div className="text-muted-foreground text-[11px] mt-0.5 leading-snug">
                          {item.paidModel}
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-border/40">
                        <div className="text-muted-foreground text-[11px] font-medium">Connection & Setup</div>
                        <div className="text-foreground text-[11px] mt-0.5 leading-snug">
                          {item.setupComplexity}
                        </div>
                      </div>
                    </div>
                  </div>

                  {item.highlight && (
                    <div className="mt-5 pt-3 border-t border-border/50">
                      <Button variant="hero" size="sm" className="w-full text-xs font-semibold h-8" asChild>
                        <Link to="/pricing">
                          View Schema Weaver Plans <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground text-center">
              Pricing verified from official public vendor pricing pages as of Q4 2026. Third-party cloud infrastructure and hosting costs are excluded.
            </p>
          </div>
        </section>

        {/* ── Compact Final CTA ─────────────────────────────────────────── */}
        <section className="py-12 sm:py-16 border-t border-border/70 text-center px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground">
              Ready to explore live PostgreSQL with{" "}
              <span className="text-gradient-mesh">speed and voice?</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Connect your database in 30 seconds with the open-source connector.
              No open ports, credentials never leave your machine.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <Button variant="hero" size="sm" className="h-9 px-4 text-xs font-semibold" asChild>
                <a href="https://data-explorer.schemaweaver.dev">
                  Launch Data Explorer Free <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </Button>
              <Button variant="glass" size="sm" className="h-9 px-4 text-xs font-medium" asChild>
                <Link to="/pricing">See Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
