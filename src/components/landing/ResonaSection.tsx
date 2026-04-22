import { Section } from "./Section";
import { ProductShot } from "./ProductShot";
import { Activity, Eye, Lock, Zap } from "lucide-react";

export function ResonaSection() {
  return (
    <Section
      id="resona-ai"
      eyebrow="Agentic & Spatial AI"
      title={
        <>
          Resona AI.
          <br />
          <span className="text-gradient-mesh">The Spatial AI Database Architect.</span>
        </>
      }
      description="Resona isn't a chatbot — it's the world's first Spatial AI Database Agent. Anchored directly to your ER diagram nodes, it executes 55+ tools to perform surgical multi-file edits across your entire project."
    >
      <div className="mt-16 grid lg:grid-cols-3 gap-6">
        {/* Card 1 — Table AI */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
          <ProductShot
            src="/images/sql-editor/resona-ai-table.png"
            caption="Table AI — Anchored PostgreSQL Agent Context"
            glow="emerald"
          />
          <div className="p-6 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
              <img src="/resona.png" alt="" className="w-3.5 h-3.5 object-contain" />
              Table AI
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">Localized Context.</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Anchor Resona to a specific table. It receives the full column, index, and relationship context for that node alone for hyper-focused analysis and DDL generation.
            </p>
          </div>
        </div>

        {/* Card 2 — Group AI */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
          <ProductShot
            src="/images/sql-editor/resona-ai-group-table.png"
            caption="Group AI — analyzing auth schema"
            glow="blue"
          />
          <div className="p-6 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-secondary font-bold">
              <img src="/resona.png" alt="" className="w-3.5 h-3.5 object-contain border border-secondary/20 rounded-sm bg-secondary/5" />
              Group AI
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">Domain Awareness.</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Deploy Resona to a Schema Group. It reasons across entire namespaces (like `billing` or `auth`) to ensure consistency and normalization across related tables.
            </p>
          </div>
        </div>

        {/* Card 3 — Global AI */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
          <ProductShot
            src="/images/sql-editor/resona-ai-global.png"
            caption="Global AI — project-wide reasoning"
            glow="none"
          />
          <div className="p-6 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold">
              <img src="/resona.png" alt="" className="w-3.5 h-3.5 object-contain grayscale opacity-70" />
              Global AI
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">Project-Wide Intelligence.</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              The master architect. Global AI understands every file, every relationship, and every compiler layer in your project. Perfect for major refactors and new service scaffolding.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card/50 p-8">
          <h4 className="font-display font-semibold text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Surgical Workspace Patching
          </h4>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Resona doesn't just output code. It uses <code className="text-foreground">workspace_patch_file</code> to find exact lines in your modular files and surgically updates them — preserving your comments, formatting, and file structure.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card/50 p-8">
          <h4 className="font-display font-semibold text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-secondary" />
            ReAct Agentic Loop
          </h4>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Watch the AI work in real-time. Resona plans its steps, executes its 55 purpose-built tools, observes the compiler feedback, and self-heals until the schema is production-ready.
          </p>
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
            Schema-first analysis means maximum privacy and zero exfiltration risk.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs text-muted-foreground">
          <Eye className="w-3.5 h-3.5" /> Privacy-Centric
        </div>
      </div>
    </Section>
  );
}