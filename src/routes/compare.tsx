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
  Terminal,
  CreditCard,
  DollarSign,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────────
 * Route Metadata
 * ───────────────────────────────────────────────────────────────────────────── */

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      {
        title:
          "Compare — Schema Weaver vs Power BI, Tableau, Metabase, Outerbase, Draxlr & ThoughtSpot",
      },
      {
        name: "description",
        content:
          "An authentic technical and pricing comparison of Schema Weaver against Power BI, Tableau, Metabase, Outerbase, Draxlr, and ThoughtSpot across data visualization, AI querying, and live PostgreSQL capabilities.",
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
      {
        rel: "canonical",
        href: "https://schemaweaver.dev/compare",
      } as never,
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
    ],
  }),
  component: ComparePage,
});

/* ─────────────────────────────────────────────────────────────────────────────
 * 6 Unique Innovations (Found Only in Schema Weaver)
 * ───────────────────────────────────────────────────────────────────────────── */

interface Innovation {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
}

const uniqueInnovations: Innovation[] = [
  {
    icon: Brain,
    title: "Resona AI",
    description:
      "A unified intelligence architecture with three specialized agents: Voice-to-Voice AI for real-time conversational database queries, Dashboard AI for 1-click executive dashboard synthesis, and Data Explorer AI for deep schema profiling, anomaly scans, and multi-artifact reasoning.",
    badge: "0 of 6 tools",
  },
  {
    icon: LayoutDashboard,
    title: "1-Click Advanced Statistics & Dashboards",
    description:
      "Generate comprehensive statistical metrics and interactive executive dashboards in a single click. Automatically computes KPI distributions, quartile spreads, and trends across live PostgreSQL tables, complete with an 'Investigate Why' root-cause diagnosis engine.",
    badge: "0 of 6 tools",
  },
  {
    icon: Table,
    title: "Live Data Explorer Grid & Exports",
    description:
      "High-performance virtualized grid for browsing, filtering, and analyzing live PostgreSQL data in real time. Inspect columns with instant statistical profiling and export live datasets across View (WYSIWYG), Table, or Database scopes into Google Sheets, Excel, CSV, JSON, and SQL.",
    badge: "0 of 6 tools",
  },
  {
    icon: Users,
    title: "Seamless Team Database Collaboration",
    description:
      "Collaborate effortlessly across engineering and product teams on live databases without sharing raw credentials. Share interactive dashboards, saved queries, and virtual data views with granular role-based access control (RBAC), team workspaces, and transparent audit trails.",
    badge: "0 of 6 tools",
  },
  {
    icon: ShieldCheck,
    title: "pg-connector & Credential Boundary",
    description:
      "Connect any PostgreSQL database (Localhost, Supabase, Neon, AWS RDS, GCP) through the open-source @schema-weaver/pg-connector daemon. Establishes an outbound-only TLS tunnel with zero open inbound ports, local AES-256 credential storage, and AST read-only query safety guards.",
    badge: "0 of 6 tools",
  },
  {
    icon: Terminal,
    title: "SQL Editor & Spatial Canvas AI",
    description:
      "A multi-tab PostgreSQL query editor paired with a live interactive ER canvas. Features Spatial AI nodes anchored directly to schema tables, automated Dijkstra foreign-key shortest pathfinding, and a real-time 20-layer schema health compiler.",
    badge: "0 of 6 tools",
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
    title: "Visualization & Dashboards",
    tag: "Visualization",
    rows: [
      {
        feature: "1-Click AI dashboard synthesis from raw schema",
        detail: "Synthesizes multi-panel dashboards (KPI cards, charts, retention) in seconds.",
        values: ["Y", "N", "N", "P", "N", "P", "P"],
      },
      {
        feature: "'Investigate Why' root cause anomaly diagnosis",
        detail: "One-click drilldown into metric anomalies that diagnoses cohort behavior via ad-hoc SQL.",
        values: ["Y", "P", "P", "N", "N", "N", "P"],
      },
      {
        feature: "Interactive KPI cards, time-series & cohort matrices",
        detail: "Auto-calculated trends, deltas, distributions, and customizable chart panels.",
        values: ["Y", "Y", "Y", "Y", "P", "Y", "Y"],
      },
      {
        feature: "Executive report export (PowerPoint, PDF)",
        detail: "Package analytical findings and charts into boardroom-ready presentation decks.",
        values: ["Y", "Y", "Y", "P", "N", "P", "Y"],
      },
      {
        feature: "1-Click Google Sheets OAuth sync",
        detail: "Push live database query results directly into a newly created Google Sheet.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "Multi-format exports (CSV, Excel, JSON, SQL)",
        detail: "Export data at View (WYSIWYG), Table, or full Database scope.",
        values: ["Y", "Y", "Y", "Y", "P", "Y", "Y"],
      },
    ],
  },
  {
    title: "AI & Conversational Querying",
    tag: "AI & Voice",
    rows: [
      {
        feature: "Native Voice-to-Voice database queries",
        detail: "Full-duplex audio with zero cascaded STT-TTS delay and native verbal responses.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "Speech barge-in & verbal interruption",
        detail: "Interrupt the AI mid-sentence verbally without losing conversational context.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "Natural language text-to-chart generation",
        detail: "Ask questions in plain English to generate instant interactive visualizations.",
        values: ["Y", "Y", "Y", "P", "Y", "Y", "Y"],
      },
      {
        feature: "Autonomous ReAct analytical tool loop",
        detail: "Multi-step SQL execution with bounded timeouts, retries, and budget controls.",
        values: ["Y", "N", "N", "N", "P", "N", "P"],
      },
      {
        feature: "Dual execution tiers (Flash mode vs Deep thinking)",
        detail: "Choose between rapid exploratory queries or deep extended reasoning with live traces.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "Persistent business memory across sessions",
        detail: "Remembers founder directives and custom metric definitions with code-gated safety.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
    ],
  },
  {
    title: "Live Grid & Column Profiling",
    tag: "Data Grid",
    rows: [
      {
        feature: "Virtualized high-performance live data grid",
        detail: "Smooth infinite scrolling through thousands of records with zero UI lag.",
        values: ["Y", "Y", "Y", "Y", "Y", "Y", "P"],
      },
      {
        feature: "Server-side multi-column sorting & filtering",
        detail: "Pushes filter predicates down to PostgreSQL without pulling full tables into RAM.",
        values: ["Y", "Y", "Y", "Y", "Y", "Y", "Y"],
      },
      {
        feature: "Column distributions & quartile profiling",
        detail: "Live calculation of null %, distinct counts, min/max, quartiles (Q25-Q75), and histograms.",
        values: ["Y", "P", "P", "P", "N", "P", "N"],
      },
      {
        feature: "Foreign key deep linking & cross-table drilling",
        detail: "Click any FK cell to immediately jump to and inspect the referenced record.",
        values: ["Y", "P", "P", "P", "P", "P", "N"],
      },
      {
        feature: "Connector-enforced read-only guard (CERO)",
        detail: "Validated locally by an AST parser to guarantee strict read-only safety.",
        values: ["Y", "P", "P", "P", "N", "P", "P"],
      },
    ],
  },
  {
    title: "SQL & Interactive ER Canvas",
    tag: "SQL & ERD",
    rows: [
      {
        feature: "Multi-file SQL project workspace with autosave",
        detail: "Organize queries across folders and files with automatic local recovery.",
        values: ["Y", "N", "N", "P", "P", "P", "N"],
      },
      {
        feature: "PostgreSQL dialect autocomplete & formatting",
        detail: "Dialect-aware autocomplete for tables, columns, joins, and functions.",
        values: ["Y", "N", "N", "P", "Y", "P", "N"],
      },
      {
        feature: "Live interactive ER diagram canvas",
        detail: "Visualizes the entire database topology, foreign key relationships, and schemas.",
        values: ["Y", "P", "P", "P", "N", "N", "N"],
      },
      {
        feature: "Spatial AI on interactive ER diagram",
        detail: "Visual AI nodes anchored to tables with edges, reasoning over graph relationships.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "FK shortest-path graph traversal (Dijkstra / BFS)",
        detail: "Finds the shortest JOIN path between two arbitrary tables automatically.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "Schema-to-code export (Prisma, Drizzle, DBML, TS)",
        detail: "Export visual database designs directly to modern ORM definitions.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "20-Layer schema health grading (A–F score)",
        detail: "Linting across indexes, constraints, RLS, storage, and partitions.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
    ],
  },
  {
    title: "Security, Connectivity & Privacy",
    tag: "Security",
    rows: [
      {
        feature: "Zero open inbound ports (no public 5432 exposed)",
        detail: "Outbound TLS daemon connects securely through firewalls without VPC peering.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "Local Credential Boundary (passwords stay on local machine)",
        detail: "Database passwords remain in a local AES-256 vault and never touch third-party cloud.",
        values: ["Y", "N", "N", "N", "N", "N", "N"],
      },
      {
        feature: "Live database connection (no heavy ETL warehouse setup)",
        detail: "Queries live PostgreSQL directly without setting up separate warehouse sync pipelines.",
        values: ["Y", "P", "P", "Y", "Y", "Y", "N"],
      },
      {
        feature: "100% browser-native (zero desktop install required)",
        detail: "Access the full database workspace instantly from any web browser.",
        values: ["Y", "P", "P", "Y", "Y", "Y", "Y"],
      },
      {
        feature: "Shared team dashboards without sharing credentials",
        detail: "Invite teammates to query databases without sharing raw connection strings.",
        values: ["Y", "P", "P", "P", "P", "P", "P"],
      },
      {
        feature: "Team role-based access control & audit trail",
        detail: "Granular permissions (Owner, Editor, Viewer) with immutable audit history.",
        values: ["Y", "Y", "Y", "P", "P", "P", "Y"],
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
    "Visualization",
    "AI & Voice",
    "Data Grid",
    "SQL & ERD",
    "Security",
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
            An objective comparison of Schema Weaver against Metabase, Outerbase, Draxlr, and ThoughtSpot
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

        {/* ── 6 Unique Architectural Innovations ─────────────────────────── */}
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
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {item.badge}
                      </span>
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
                  30 capabilities benchmarked.
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
              <table className="w-full text-xs min-w-[1020px] border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border/70 sticky top-0 z-10 backdrop-blur">
                    <th className="text-left font-semibold text-muted-foreground py-3 px-3.5 w-[280px]">
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
                            <div className="text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-1">
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
