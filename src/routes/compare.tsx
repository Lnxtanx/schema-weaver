import { Fragment } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/button";
import {
  Check,
  Minus,
  ArrowRight,
  Sparkles,
  Fingerprint,
  Code2,
  Route as RouteIcon,
  Brain,
  Shield,
  GitCompareArrows,
  Clock,
  BarChart3,
  FileText,
  FileCode2,
  Layers,
  Zap,
  PenTool,
  Focus,
  Box,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────────
 * Route
 * ───────────────────────────────────────────────────────────────────────────── */

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare — Schema Weaver vs DBeaver, DataGrip, pgAdmin & More" },
      {
        name: "description",
        content:
          "See how Schema Weaver compares to DBeaver, DataGrip, Supabase Studio, pgAdmin, Navicat, and Atlas. 48 features compared across 20 PostgreSQL tools.",
      },
      {
        name: "keywords",
        content:
          "Schema Weaver vs DBeaver, Schema Weaver vs DataGrip, Schema Weaver vs pgAdmin, PostgreSQL IDE comparison, database tool comparison, ER diagram tool comparison",
      },
      { property: "og:title", content: "Schema Weaver vs Competitors — Feature Comparison" },
      {
        property: "og:description",
        content: "5 features no competitor has. 14 strong differentiators. Full comparison matrix against the top 6 PostgreSQL tools.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://schemaweaver.vivekmind.com/compare" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Schema Weaver vs Competitors" },
      {
        name: "twitter:description",
        content: "See exactly how Schema Weaver stacks up against DBeaver, DataGrip, Supabase, pgAdmin, Navicat, and Atlas.",
      },
      { rel: "canonical", href: "https://schemaweaver.vivekmind.com/compare" } as never,
    ],
    links: [
      { rel: "canonical", href: "https://schemaweaver.vivekmind.com/compare" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Schema Weaver — Competitor Comparison",
          description: "Feature-by-feature comparison of Schema Weaver against 20 PostgreSQL tools across 48 capabilities.",
          url: "https://schemaweaver.vivekmind.com/compare",
        }),
      },
    ],
  }),
  component: ComparePage,
});

/* ─────────────────────────────────────────────────────────────────────────────
 * Unique features (no competitor has these)
 * ───────────────────────────────────────────────────────────────────────────── */

const uniqueFeatures: Array<{ icon: LucideIcon; title: string; description: string; competitors: string }> = [
  {
    icon: Brain,
    title: "Spatial AI on the ER Canvas",
    description: "Three levels of AI — Table, Group, and Global — floating as interactive nodes directly on the diagram canvas, anchored to their subject with edges. Ask an AI that sees exactly what you see.",
    competitors: "0 of 20 competitors",
  },
  {
    icon: Code2,
    title: "Complete Browser-Native PostgreSQL OS",
    description: "The only complete PostgreSQL IDE that runs entirely in the browser. SQL editor, live ER diagrams with 16 node types, 20-layer schema compiler, migration engine, data explorer, and agentic AI — in one tab, no install, works offline.",
    competitors: "0 of 20 competitors with full IDE",
  },
  {
    icon: Shield,
    title: "Two-Track Migration Engine (All Object Types)",
    description: "Most tools migrate tables and columns only. Schema Weaver handles views, functions, triggers, RLS policies, and materialized views via a dual-track engine — structural DDL (Atlas) + behavioral DDL (CREATE OR REPLACE / DROP+CREATE) — in one 8-step pipeline with advisory locking.",
    competitors: "0 of 20 competitors",
  },
  {
    icon: Layers,
    title: "20-Layer Schema Compiler (A–F Health Grade)",
    description: "Real-time quality grading across 20 analysis layers — tables, columns, indexes, constraints, partitions, views, functions, triggers, RLS, privileges, storage, replication, naming, and more. Get a live health score as you type.",
    competitors: "0 of 20 competitors (1 partial)",
  },
  {
    icon: Box,
    title: "Visual Schema Clustering & Namespaces",
    description: "Cluster nodes by PostgreSQL schema into resizable, color-coded, and lockable containers. Move entire domains as a unit while maintaining cross-group FK edges. A visual 'operating system' for your database namespaces.",
    competitors: "0 of 20 competitors",
  },
  {
    icon: FileCode2,
    title: "Schema-to-Code Export (Prisma, Drizzle, DBML, TypeScript)",
    description: "Export your live ER diagram directly to Prisma Schema, Drizzle ORM, DBML, TypeScript interfaces, or Markdown documentation. Generate framework-ready code from your visual diagram in one click.",
    competitors: "0 of 20 competitors",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Strong differentiators (≤3 of 20 competitors have these)
 * ───────────────────────────────────────────────────────────────────────────── */

const strongDifferentiators: Array<{ feature: string; availableIn: string; icon: LucideIcon }> = [
  { feature: "FK path analysis (BFS / Dijkstra)", availableIn: "0 of 20 tools", icon: RouteIcon },
  { feature: "Visual table editor on ER canvas (bidirectional SQL ↔ form)", availableIn: "0 of 20 tools", icon: PenTool },
  { feature: "AI memory across sessions (4-layer compression)", availableIn: "0 of 20 tools", icon: Brain },
  { feature: "Focus mode — subgraph view (configurable depth 1–5)", availableIn: "0 of 20 tools", icon: Focus },
  { feature: "Cascade risk indicator on table nodes", availableIn: "0 of 20 tools", icon: Zap },
  { feature: "Safe mode migration (6-phase column type changes)", availableIn: "1 of 20 tools", icon: Shield },
  { feature: "Per-table AI chat on ER canvas", availableIn: "1 of 20 tools (partial)", icon: Brain },
  { feature: "Global schema AI chat", availableIn: "1 of 20 tools (partial)", icon: Brain },
  { feature: "Inline diff overlay in editor", availableIn: "2 of 20 tools (partial)", icon: GitCompareArrows },
  { feature: "Drift detection (external schema changes)", availableIn: "2 of 20 tools", icon: Fingerprint },
  { feature: "AI data analysis with 10+ chart types", availableIn: "2 of 20 tools", icon: BarChart3 },
  { feature: "AI reports export (PowerPoint, PDF)", availableIn: "2 of 20 tools", icon: FileText },
  { feature: "Agentic AI with 55 purpose-built tools", availableIn: "2 of 20 tools (partial)", icon: Zap },
  { feature: "Live ER diagram updates as you type SQL", availableIn: "3 of 20 tools (partial)", icon: Sparkles },
  { feature: "Compare two historical file versions", availableIn: "2 of 20 tools", icon: Clock },
  { feature: "Shared DB connections (no credential sharing)", availableIn: "3 of 20 tools", icon: Shield },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Competitor comparison matrix
 *
 * Top 6 competitors by feature score:
 *   DataGrip (55.2%), Supabase Studio (51.0%), Navicat (39.6%),
 *   DbVisualizer (30.2%), DBeaver (28.1%), Atlas (26.6%)
 *
 * Using: DataGrip, DBeaver, Supabase Studio, pgAdmin, Navicat, Atlas
 * (pgAdmin included because it's the default PG admin tool everyone knows)
 * ───────────────────────────────────────────────────────────────────────────── */

type CellValue = "Y" | "P" | "N";

const competitors = [
  { name: "Schema Weaver", highlight: true },
  { name: "DataGrip" },
  { name: "DBeaver" },
  { name: "Supabase" },
  { name: "pgAdmin" },
  { name: "Navicat" },
  { name: "Atlas" },
];

const comparisonGroups: Array<{
  group: string;
  rows: Array<{ feature: string; values: CellValue[] }>;
}> = [
  {
    group: "SQL Editor",
    rows: [
      { feature: "Multi-file project management",        values: ["Y", "Y", "P", "P", "N", "P", "N"] },
      { feature: "Syntax highlighting & autocomplete",   values: ["Y", "Y", "Y", "Y", "Y", "Y", "N"] },
      { feature: "Autosave",                             values: ["Y", "Y", "N", "Y", "N", "P", "N"] },
      { feature: "Split view (editor + ER diagram)",     values: ["Y", "Y", "P", "N", "N", "P", "N"] },
    ],
  },
  {
    group: "Schema Compiler & Quality",
    rows: [
      { feature: "Real-time schema grading (A–F)",       values: ["Y", "N", "N", "N", "N", "N", "P"] },
      { feature: "20-layer quality analysis",            values: ["Y", "N", "P", "N", "N", "P", "P"] },
    ],
  },
  {
    group: "ER Diagram",
    rows: [
      { feature: "Auto-generated ER diagram",            values: ["Y", "Y", "Y", "Y", "Y", "Y", "P"] },
      { feature: "Live updates as you edit SQL",          values: ["Y", "P", "N", "N", "N", "P", "N"] },
      { feature: "Multiple node types (views, enums, etc.)", values: ["Y", "P", "P", "P", "N", "P", "P"] },
      { feature: "Schema grouping & clustering",          values: ["Y", "Y", "N", "P", "P", "P", "P"] },
      { feature: "FK path analysis",                      values: ["Y", "N", "N", "N", "N", "N", "N"] },
      { feature: "Visual table editor (on canvas)",        values: ["Y", "N", "N", "N", "N", "N", "N"] },
      { feature: "Focus mode (subgraph, depth 1–5)",       values: ["Y", "N", "N", "N", "N", "N", "N"] },
      { feature: "Visibility controls",                   values: ["Y", "P", "P", "P", "P", "P", "N"] },
      { feature: "Export PNG / SVG",                      values: ["Y", "Y", "Y", "N", "Y", "Y", "P"] },
      { feature: "Schema-to-code (Prisma, Drizzle, DBML, TS)", values: ["Y", "N", "N", "N", "N", "N", "N"] },
    ],
  },
  {
    group: "Schema Diff & History",
    rows: [
      { feature: "Schema comparison (project vs live DB)", values: ["Y", "Y", "P", "P", "Y", "Y", "Y"] },
      { feature: "Semantic diff (object-level)",          values: ["Y", "Y", "P", "P", "P", "P", "Y"] },
      { feature: "Inline diff overlay in editor",         values: ["Y", "P", "N", "N", "N", "N", "N"] },
      { feature: "Version snapshots with restore",         values: ["Y", "P", "N", "Y", "N", "P", "N"] },
      { feature: "Compare two historical versions",        values: ["Y", "Y", "N", "N", "N", "P", "N"] },
    ],
  },
  {
    group: "Database & Migrations",
    rows: [
      { feature: "Pull/import live schema",               values: ["Y", "Y", "Y", "Y", "Y", "Y", "Y"] },
      { feature: "Apply/push migrations",                 values: ["Y", "Y", "P", "Y", "Y", "Y", "Y"] },
      { feature: "Drift detection",                       values: ["Y", "N", "N", "N", "N", "N", "Y"] },
      { feature: "Auto-generated rollback SQL",            values: ["Y", "N", "N", "P", "N", "P", "Y"] },
      { feature: "Safe mode migration (multi-phase)",      values: ["Y", "N", "N", "N", "N", "N", "Y"] },
      { feature: "Built-in terminal",                     values: ["Y", "Y", "Y", "Y", "Y", "P", "Y"] },
    ],
  },
  {
    group: "Data Explorer",
    rows: [
      { feature: "High-performance data grid",            values: ["Y", "Y", "Y", "Y", "Y", "Y", "N"] },
      { feature: "Server-side sorting & filtering",        values: ["Y", "Y", "Y", "Y", "Y", "Y", "N"] },
      { feature: "Column statistics & distributions",      values: ["Y", "P", "P", "N", "N", "P", "N"] },
      { feature: "Multi-format export (CSV, JSON, Excel)", values: ["Y", "Y", "Y", "Y", "Y", "Y", "N"] },
    ],
  },
  {
    group: "AI Features",
    rows: [
      { feature: "AI SQL generation (natural language)",   values: ["Y", "Y", "N", "Y", "N", "N", "N"] },
      { feature: "AI data analysis with charts",           values: ["Y", "N", "N", "Y", "N", "N", "N"] },
      { feature: "AI schema design / generation",          values: ["Y", "P", "N", "Y", "N", "N", "N"] },
      { feature: "AI reports export (PPT, PDF)",           values: ["Y", "N", "N", "Y", "N", "N", "N"] },
      { feature: "Voice input for AI",                     values: ["Y", "N", "N", "N", "N", "N", "N"] },
      { feature: "Multiple AI model tiers",                values: ["Y", "P", "N", "P", "N", "N", "N"] },
      { feature: "Agentic AI (autonomous tool loop)",      values: ["Y", "P", "N", "P", "N", "N", "N"] },
      { feature: "Per-table AI chat on ER diagram",        values: ["Y", "P", "N", "N", "N", "N", "N"] },
      { feature: "AI memory across sessions",              values: ["Y", "N", "N", "N", "N", "N", "N"] },
    ],
  },
  {
    group: "Team & Collaboration",
    rows: [
      { feature: "Team creation & invitation",            values: ["Y", "P", "N", "Y", "N", "P", "N"] },
      { feature: "Role-based access control",              values: ["Y", "P", "N", "Y", "N", "P", "N"] },
      { feature: "Shared DB connections (no cred sharing)", values: ["Y", "N", "N", "Y", "N", "N", "N"] },
      { feature: "Audit trail",                            values: ["Y", "P", "N", "Y", "N", "P", "Y"] },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Helper components
 * ───────────────────────────────────────────────────────────────────────────── */

function CompareCell({ value, isSchemaWeaver }: { value: CellValue; isSchemaWeaver?: boolean }) {
  if (value === "Y")
    return (
      <span className={cn("inline-flex items-center justify-center w-6 h-6 rounded-full", isSchemaWeaver ? "bg-primary/20" : "bg-emerald-500/10")}>
        <Check className={cn("w-3.5 h-3.5", isSchemaWeaver ? "text-primary" : "text-emerald-500")} />
      </span>
    );
  if (value === "P")
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10" title="Partial">
        <span className="w-2 h-2 rounded-full bg-amber-500" />
      </span>
    );
  return <Minus className="w-4 h-4 text-muted-foreground/30 mx-auto" />;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Page component
 * ───────────────────────────────────────────────────────────────────────────── */

function ComparePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Compare"
          title={
            <>
              See how Schema Weaver{" "}
              <span className="text-gradient-mesh">stacks up.</span>
            </>
          }
          description="We analyzed 20 PostgreSQL tools across 48 features. Schema Weaver has 6 capabilities no competitor offers, and 15 strong differentiators available in 3 or fewer tools."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="hero" size="xl" asChild>
              <a href="https://sql-editor.schemaweaver.vivekmind.com">
                Try Schema Weaver free <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/pricing">View pricing</Link>
            </Button>
          </div>
        </PageHero>

        {/* ── Only in Schema Weaver ───────────────────────────────────────── */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                <span className="w-6 h-px bg-primary" />
                6 Unique Features
              </div>
              <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
                Things only Schema Weaver does.
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                We researched 20 PostgreSQL tools — these capabilities exist only in Schema Weaver.
              </p>
            </div>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {uniqueFeatures.map((f, i) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-card/60 p-8 flex flex-col animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                    {f.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-primary bg-primary/5 border border-primary/10 rounded-full px-3 py-1 w-fit">
                    <Sparkles className="w-3 h-3" />
                    {f.competitors}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Strong differentiators ──────────────────────────────────────── */}
        <section className="py-24 border-t border-border bg-muted/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                <span className="w-6 h-px bg-primary" />
                Strong differentiators
              </div>
              <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
                15 features most tools lack.
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                These capabilities are available in 3 or fewer of the 20 PostgreSQL tools we analyzed.
              </p>
            </div>

            <div className="mt-14 grid sm:grid-cols-2 gap-4">
              {strongDifferentiators.map((d, i) => (
                <div
                  key={d.feature}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card/40 px-6 py-4 animate-fade-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <d.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-foreground">{d.feature}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{d.availableIn}</div>
                  </div>
                  <Check className="w-5 h-5 text-primary ml-auto shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Full comparison matrix ──────────────────────────────────────── */}
        <section className="py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                <span className="w-6 h-px bg-primary" />
                Full comparison
              </div>
              <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
                Feature-by-feature matrix.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Schema Weaver vs the 6 most popular PostgreSQL tools. Data sourced from official documentation and product pages.
              </p>
            </div>

            {/* Legend */}
            <div className="mt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10">
                  <Check className="w-3 h-3 text-emerald-500" />
                </span>
                Full support
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                </span>
                Partial / limited
              </div>
              <div className="flex items-center gap-2">
                <Minus className="w-4 h-4 text-muted-foreground/30" />
                Not available
              </div>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm min-w-[960px]">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="text-left font-medium text-muted-foreground p-4 w-[260px]">
                      Feature
                    </th>
                    {competitors.map((c) => (
                      <th
                        key={c.name}
                        className={cn(
                          "text-center font-display font-semibold p-4 whitespace-nowrap",
                          c.highlight && "text-primary",
                        )}
                      >
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonGroups.map((g) => (
                    <Fragment key={g.group}>
                      <tr className="bg-card/40">
                        <td
                          colSpan={competitors.length + 1}
                          className="px-4 py-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground border-t border-border"
                        >
                          {g.group}
                        </td>
                      </tr>
                      {g.rows.map((r) => (
                        <tr
                          key={`${g.group}-${r.feature}`}
                          className="border-t border-border/60"
                        >
                          <td className="p-4 text-foreground/90">{r.feature}</td>
                          {r.values.map((v, vi) => (
                            <td
                              key={vi}
                              className={cn("p-4 text-center", vi === 0 && "bg-primary/5")}
                            >
                              <CompareCell value={v} isSchemaWeaver={vi === 0} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              Comparison based on official documentation, product pages, and web research as of April 2026.
              "Partial" means the feature exists in a limited or basic form.
            </p>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section className="py-24 border-t border-border bg-muted/20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">
              Ready to try the{" "}
              <span className="text-gradient-mesh">complete platform?</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Start free with 3,000 AI credits. No credit card required. Full SQL Editor, ER diagrams, migrations, and data explorer included.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="hero" size="xl" asChild>
                <a href="https://sql-editor.schemaweaver.vivekmind.com">
                  Launch SQL Editor <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
