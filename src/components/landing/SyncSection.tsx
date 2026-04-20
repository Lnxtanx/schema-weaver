import { Section } from "./Section";
import { ProductShot } from "./ProductShot";
import { ArrowDownToLine, ArrowUpFromLine, GitCompare, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ArrowDownToLine,
    label: "Pull",
    title: "Introspection",
    body: "Import any existing live database into a Schema Weaver project with one click. Tables, indexes, functions, triggers, RLS policies — all reverse-engineered into clean, multi-file DDL you can actually review.",
  },
  {
    icon: GitCompare,
    label: "Diff",
    title: "Drift Detection",
    body: "Instantly see if someone made manual changes to production that aren't in your code. Side-by-side, syntax-highlighted, semantic diffs — not just text. Catch hot-fixes before they become incidents.",
  },
  {
    icon: ArrowUpFromLine,
    label: "Push",
    title: "Safe Migrations",
    body: "Diff your changes, preview the generated DDL, and apply with PostgreSQL advisory locking, transactional execution, and automatic rollback on error. Schema Weaver writes the migration; you stay in control of when it runs.",
  },
  {
    icon: ShieldCheck,
    label: "Audit",
    title: "Full History",
    body: "Every pull, diff, and migration is recorded with author, timestamp, and resulting hash. Roll back to any point in your schema's history — production or local — without leaving the app.",
  },
];

export function SyncSection() {
  return (
    <Section
      id="sync"
      eyebrow="Database Lifecycle"
      title={
        <>
          Pull. Diff. Push. <span className="text-gradient-emerald">Migrate.</span>
        </>
      }
      description="The bridge between your local code and live production. Schema Weaver manages the sync so you don't have to write the same migration glue for the hundredth time."
    >
      <div className="mt-16 grid lg:grid-cols-2 gap-10 items-start">
        <ProductShot caption="connection-dashboard.tsx — production · drift detected" glow="emerald" />

        <ol className="space-y-5">
          {steps.map((s, i) => (
            <li
              key={s.label}
              className="relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-mono text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary">{s.label}</span>
                    <h3 className="font-display font-semibold text-lg">{s.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}