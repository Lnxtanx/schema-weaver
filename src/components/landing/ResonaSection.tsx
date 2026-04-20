import { Section } from "./Section";
import { ProductShot } from "./ProductShot";
import { Brain, Eye, Lock, Workflow } from "lucide-react";

export function ResonaSection() {
  return (
    <Section
      id="resona-ai"
      eyebrow="Agentic AI"
      title={
        <>
          Meet Resona.
          <br />
          <span className="text-gradient-mesh">Your AI Database Architect.</span>
        </>
      }
      description="Resona isn't a chatbot — it's an Agentic System. It plans, executes tools, observes results, and synthesizes answers. It reads your files, reasons about your graph, writes surgical multi-file edits, and runs SQL on your behalf."
    >
      <div className="mt-16 grid lg:grid-cols-2 gap-8">
        {/* Card 1 — DDL */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <ProductShot caption="resona-ai.tsx — schema agent" glow="emerald" />
          <div className="p-7">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary">
              <Workflow className="w-3.5 h-3.5" />
              In the SQL Editor
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold">Multi-file DDL, generated and reviewed.</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Ask Resona to <em>"add a billing system with Stripe integration."</em> It loads the
              relevant files, drafts the migration across <code className="text-foreground">customers</code>,{" "}
              <code className="text-foreground">subscriptions</code>, and{" "}
              <code className="text-foreground">invoices</code>, runs the compiler, fixes its own
              warnings, and presents you with a clean diff to approve.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">→</span> Reads the dependency graph before editing.</li>
              <li className="flex gap-2"><span className="text-primary">→</span> Generates indexes, constraints, and RLS policies by default.</li>
              <li className="flex gap-2"><span className="text-primary">→</span> Self-corrects when the compiler dings it.</li>
            </ul>
          </div>
        </div>

        {/* Card 2 — Data */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <ProductShot caption="resona-ai.tsx — data agent" glow="blue" />
          <div className="p-7">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-secondary">
              <Brain className="w-3.5 h-3.5" />
              In the Data Explorer
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold">Natural language → SQL → charts.</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Ask <em>"Show me revenue trends by region for Q3."</em> Resona writes the SQL, executes
              it against your live connection, and renders interactive bar, line, and table views —
              all inline, all explainable, all editable.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-secondary">→</span> Reasons over schema, not raw rows.</li>
              <li className="flex gap-2"><span className="text-secondary">→</span> Always shows you the SQL it generated.</li>
              <li className="flex gap-2"><span className="text-secondary">→</span> Pin charts to a dashboard with one click.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Privacy banner */}
      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-display font-semibold text-lg">Privacy-first by design.</h4>
          <p className="mt-1 text-muted-foreground leading-relaxed">
            Your row-level data <span className="text-foreground font-medium">never leaves your infrastructure</span>.
            Resona reasons over schema metadata and your questions — never over the rows themselves.
            Schema-first analysis means maximum privacy and zero exfiltration risk, even with PII-heavy tables.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs text-muted-foreground">
          <Eye className="w-3.5 h-3.5" /> SOC 2 ready
        </div>
      </div>
    </Section>
  );
}