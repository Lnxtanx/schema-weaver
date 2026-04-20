import { Section } from "./Section";
import { ProductShot } from "./ProductShot";
import { BarChart3, Download, Filter, Gauge, Table } from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Smart Column Sizing",
    body: "Canvas-measured, 95th-percentile sampling auto-fits columns to your actual data. No more manually dragging UUID columns wider, no more truncated JSON blobs. Open a 30-column table and start reading immediately.",
  },
  {
    icon: BarChart3,
    title: "Column Statistics",
    body: "Click any header to see null rates, distinct counts, min/max, and value distributions. Understand data quality and shape without writing a single COUNT(*), GROUP BY, or histogram query.",
  },
  {
    icon: Filter,
    title: "Server-Side Filtering",
    body: "Filters compile to indexed SQL and run on the server — even on tables with hundreds of millions of rows. Stack equality, range, fuzzy, and JSON-path predicates without leaving the grid.",
  },
  {
    icon: Download,
    title: "Multi-Format Export",
    body: "Download tables or entire schemas as CSV, JSON, NDJSON, Excel, Parquet, or SQL inserts. Bundle a whole database into a single ZIP archive for backups, hand-offs, or analyst sandboxes.",
  },
];

export function DataExplorerSection() {
  return (
    <Section
      id="data-explorer"
      eyebrow="The Insights Engine"
      title={
        <>
          Explore your data
          <br />
          <span style={{ background: "var(--gradient-blue)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            at the speed of thought.
          </span>
        </>
      }
      description="A virtualized data grid that feels like a spreadsheet but performs like a database. Connect to your live PostgreSQL instances and browse millions of rows with zero lag — keyboard-first, pixel-precise, and beautiful in every theme."
    >
      <div className="mt-16 space-y-12">
        <ProductShot caption="data-explorer.tsx — public.topic_goals · ~18.0K rows" glow="blue" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 hover:bg-card/80 hover:border-secondary/40 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-base">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div className="rounded-2xl border border-border bg-card/60 p-8 sm:p-10 grid sm:grid-cols-4 gap-6 text-center">
          {[
            ["100M+", "Rows scrolled smoothly"],
            ["<16ms", "Frame budget"],
            ["6", "Export formats"],
            ["0", "Row-level data leaves your DB"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-3xl sm:text-4xl font-bold text-gradient-mesh">{v}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{l}</div>
            </div>
          ))}
        </div>

        {/* Inline icon row */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <Table className="w-4 h-4" />
          <span>Works with any PostgreSQL 12+ database — Supabase, Neon, RDS, Cloud SQL, self-hosted, all of it.</span>
        </div>
      </div>
    </Section>
  );
}