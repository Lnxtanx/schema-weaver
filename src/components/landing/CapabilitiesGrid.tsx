import { Section } from "./Section";
import { Brain, Database, EyeOff, GitMerge, Network, Users, Workflow, Zap } from "lucide-react";

const caps = [
  { icon: Database, title: "Database Sync", body: "Pull live schema, diff project vs production, apply migrations with advisory locking and drift detection." },
  { icon: Brain, title: "Spatial AI", body: "Table-anchored, Group-aware, and Global AI co-pilots for schema design and surgical multi-file edits." },
  { icon: Network, title: "Graph Intelligence", body: "Dijkstra-powered path analysis, schema clustering, and namespace color-coding for massive schemas." },
  { icon: Zap, title: "Safe Migrations", body: "Automated 6-phase column type changes with shadow columns and sync triggers to avoid production downtime." },
  { icon: Users, title: "Team Collaboration", body: "Cloud projects, role-based access (Owner/Editor/Viewer), and shared connections — never share credentials again." },
  { icon: EyeOff, title: "Data Masking", body: "Automatic PII redaction (emails, phones, credit cards) in the Data Explorer for non-admin roles." },
  { icon: Workflow, title: "Multi-File DDL", body: "The Merge Model resolves cross-file references in real-time, allowing modular, maintainable schema projects." },
  { icon: GitMerge, title: "Tamper-Evident", body: "Immutable version history and cryptographic hash chains ensure a verifiable audit trail of every schema change." },
];

export function CapabilitiesGrid() {
  return (
    <Section
      eyebrow="Core Capabilities"
      title={
        <>
          Every database tool you need.{" "}
          <span className="text-gradient-mesh">In one workspace.</span>
        </>
      }
      description="Schema Weaver replaces an entire workflow of disconnected tools with a single, deeply integrated platform — built specifically for the way modern teams ship PostgreSQL."
    >
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border shadow-card-soft">
        {caps.map((c) => (
          <div
            key={c.title}
            className="relative bg-card p-7 hover:bg-card/80 transition-colors group overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="mt-5 font-display font-semibold text-base relative">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed relative">{c.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}