import { Section } from "./Section";
import { Brain, Database, EyeOff, GitMerge, Network, Users, Workflow, Zap } from "lucide-react";

const caps = [
  { icon: Database, title: "Database Sync", body: "Pull live schema, diff project vs production, apply migrations with advisory locking and drift detection." },
  { icon: Brain, title: "Agentic AI", body: "Resona AI co-pilot for both schema design (DDL) and data analysis (SQL generation, charts, summaries)." },
  { icon: Network, title: "Visualization", body: "Auto-generated ER diagrams with path analysis, schema clustering, and namespace color-coding." },
  { icon: Users, title: "Team Collaboration", body: "Cloud projects, role-based access (Owner/Editor/Viewer), and shared connections — never share credentials again." },
  { icon: EyeOff, title: "Data Masking", body: "Automatic PII redaction (emails, phones, credit cards) in the Data Explorer for non-admin roles." },
  { icon: Workflow, title: "Multi-File DDL", body: "Organize tables, functions, and policies into folders. Cross-file references resolved by the compiler in real time." },
  { icon: GitMerge, title: "Git-Aware", body: "Sync your project to a Git remote. Branch your schema, propose changes via PR, and merge with confidence." },
  { icon: Zap, title: "20-Layer Compiler", body: "Static analysis catches missing indexes, circular FKs, naming violations, and orphan tables before they ship." },
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
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border">
        {caps.map((c) => (
          <div
            key={c.title}
            className="bg-card p-7 hover:bg-card/60 transition-colors group"
          >
            <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="mt-5 font-display font-semibold text-base">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}