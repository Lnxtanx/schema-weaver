import { Section } from "./Section";
import { ProductShot } from "./ProductShot";
import { ArrowDownToLine, ArrowUpFromLine, GitCompare, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ArrowDownToLine,
    label: "Pull",
    title: "Two-Track Introspection",
    body: "Schema Weaver uses a unique two-track engine: Atlas for structural objects and a custom behavioral layer for RLS policies, triggers, and functions — all reverse-engineered into modular DDL.",
  },
  {
    icon: ShieldCheck,
    label: "Protect",
    title: "Advisory Locking",
    body: "Every migration is protected by PostgreSQL advisory locks and drift detection. We fingerprint your database structural identity to ensure two people never deploy conflicting changes.",
  },
  {
    icon: ArrowUpFromLine,
    label: "Push",
    title: "6-Phase Safe Mode",
    body: "Change column types without downtime. Schema Weaver automates the shadow column, sync triggers, and 5,000-row batch backfilling required to migrate production data safely.",
  },
  {
    icon: GitCompare,
    label: "Audit",
    title: "Hash Chain Integrity",
    body: "Every migration is recorded in a tamper-evident audit chain. Roll back any change with automatically generated reverse SQL, maintaining a perfect history of your schema's evolution.",
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
        <ProductShot
          src="/images/sql-editor/connection-dashboard.png"
          caption="connection-dashboard — production · drift detected"
          glow="emerald"
        />

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