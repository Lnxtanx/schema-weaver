import { Section } from "./Section";
import { ProductShot } from "./ProductShot";
import { Activity, GitBranch, Layers, Network, Sparkles } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "20-Layer Schema Compiler",
    body: "Every keystroke triggers deep static analysis across your entire project. From circular dependencies and missing indexes to naming convention violations and orphan tables — Schema Weaver grades your schema A through F in real-time, with file-level diagnostics, suggested fixes, and one-click auto-repair.",
    caption: "compiler.tsx — A+ grade",
  },
  {
    icon: Network,
    title: "Graph Intelligence",
    body: "Not a static drawing. An interactive, auto-updating graph of every relationship in your database. Click any table to edit it inline, drag to re-cluster, color-code by namespace, and collapse subsystems. Foreign keys animate as you type — your schema is finally something you can see.",
    caption: "er-diagram.tsx — schema.public",
  },
  {
    icon: GitBranch,
    title: "Dijkstra-Powered Path Analysis",
    body: "Instantly find the shortest JOIN path between any two tables in your schema. Use BFS for fewest hops or Dijkstra for weighted shortest paths that prioritize high-confidence relationships. Schema Weaver renders the resolved path, generates the SQL, and highlights the route on the diagram.",
    caption: "path-analysis.tsx — orders → customers",
    image: "/images/sql-editor/path-analysis.png"
  },
  {
    icon: Activity,
    title: "The Merge Model",
    body: "Stop maintaining 5,000-line schema.sql files. Organize tables, functions, and policies into folders just like a TypeScript codebase. Schema Weaver's local-first compiler resolves cross-file references in real-time, feeding a unified dependency graph.",
    caption: "files/users/schema.sql",
  },
];

export function SqlEditorSection() {
  return (
    <Section
      id="sql-editor"
      eyebrow="The Design Studio"
      title={
        <>
          Architect your database
          <br />
          <span className="text-gradient-emerald">with confidence.</span>
        </>
      }
      description="A professional-grade IDE purpose-built for PostgreSQL. Organize your DDL into projects, folders, and files. Catch entire classes of bugs before a single migration runs. Modular, maintainable, and finally — reviewable."
    >
      <div className="mt-16 grid lg:grid-cols-5 gap-12 items-start">
        {/* Sticky main shot */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-8">
          <ProductShot
            src="/images/sql-editor/sql-editor.png"
            caption="sql-editor — main project view"
            glow="emerald"
          />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="Analysis layers" value="20" />
            <Stat label="Avg compile" value="<50ms" />
            <Stat label="PostgreSQL" value="12+" />
          </div>
          
          <div className="hidden lg:block pt-8 border-t border-border">
            <ProductShot
              src="/images/sql-editor/path-analysis.png"
              caption="Path Analysis — Dijkstra-Powered PostgreSQL Visualization"
              glow="none"
            />
          </div>
        </div>

        {/* Feature stack */}
        <div className="lg:col-span-2 space-y-6">
          {features.map((f) => (
            <article
              key={f.title}
              className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {f.body}
                  </p>
                  {f.caption && (
                    <code className="inline-block mt-3 text-[11px] font-mono text-primary/80 bg-primary/5 border border-primary/20 rounded px-2 py-0.5">
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      {f.caption}
                    </code>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card/60 px-4 py-3">
      <div className="font-display text-2xl font-bold text-gradient-emerald">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}