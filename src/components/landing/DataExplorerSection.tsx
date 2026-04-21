import { Section } from "./Section";
import { ProductShot } from "./ProductShot";
import { BarChart3, Download, Filter, Gauge, Table } from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Canvas-Based Smart Sizing",
    body: "Pixel-perfect column widths calculated using the browser's Canvas API. We sample data at the 95th percentile to ensure your UUIDs, JSON blobs, and long text fields are perfectly readable without manual dragging.",
  },
  {
    icon: BarChart3,
    title: "Live Column Statistics",
    body: "Click any header to open a slide-over panel with real-time distributions, null rates, and distinct counts. Understand your data quality and skew without writing a single aggregate query.",
  },
  {
    icon: Filter,
    title: "Cursor-Based Pagination",
    body: "Browse millions of rows with zero lag. Our cursor-based engine ensures efficient forward navigation and infinite scrolling performance, even on the largest production tables.",
  },
  {
    icon: Download,
    title: "Full Database ZIP Export",
    body: "Download individual tables or bundle your entire schema into a single ZIP archive. Supports CSV, JSON, NDJSON, Excel, and SQL inserts — perfect for hand-offs and local analysis.",
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
        <ProductShot
          src="/images/data-explorer/data-explorer.png"
          caption="data-explorer — public.customers · ~12.5K rows"
          glow="blue"
        />

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
            ["Virtualized", "Handle massive tables"],
            ["Canvas-API", "Smart column sizing"],
            ["6+", "Export formats"],
            ["Local", "No data leaves your DB"],
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