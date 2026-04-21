import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Heart, Lock, Sparkles, Telescope, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Schema Weaver | Built by Vivek.KY" },
      {
        name: "description",
        content:
          "Schema Weaver was founded by Vivek.KY in January 2026 to solve the technical friction of schema building in the AI era. Learn about our solo-mission to build the world's first browser-native PostgreSQL operating system.",
      },
      { name: "keywords", content: "Vivek.KY, Schema Weaver origin, database tools, PostgreSQL IDE, solo founder, VivekMind" },
      { property: "og:title", content: "About Schema Weaver — Built by Vivek.KY" },
      {
        property: "og:description",
        content:
          "The story of a solo mission to rebuild database infrastructure for the browser.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://schemaweaver.vivekmind.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About — Schema Weaver" },
      {
        name: "twitter:description",
        content: "The story of Schema Weaver and its solo-founder mission.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://schemaweaver.vivekmind.com/about" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "VivekMind",
          url: "https://vivekmind.com",
          sameAs: [
            "https://twitter.com/Lnxtanx",
            "https://github.com/lnxtanx",
            "https://linkedin.com/company/schema-weaver",
          ],
          description:
            "VivekMind is the engineering studio of Vivek.KY, focused on building agentic infrastructure for technical teams.",
        }),
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    icon: Compass,
    title: "Respect the craft.",
    body: "Databases are the most important system in your stack. Our tools should feel like high-fidelity instruments, not utility apps.",
  },
  {
    icon: Lock,
    title: "Privacy is the default.",
    body: "Your row-level data never leaves your infrastructure. We reason over schema metadata, ensuring zero exfiltration of user data.",
  },
  {
    icon: Sparkles,
    title: "Agentic Loop architecture.",
    body: "AI should plan, act, and observe — not just autocomplete. Resona AI uses a ReAct loop to perform surgical multi-file edits.",
  },
  {
    icon: Heart,
    title: "Browser-native focus.",
    body: "Desktop apps are too heavy; static charts are too slow. We build for the browser to deliver zero-latency, collaborative engineering.",
  },
];

const milestones = [
  { year: "Jan 3, 2026", text: "Project started as a solo mission by Vivek.KY. After facing friction with existing schema builders, the first lines of the browser-native parser were written." },
  { year: "Feb 2026", text: "The 20-layer Schema Compiler prototype is completed, capable of A-F grading and modular DDL analysis." },
  { year: "Mar 2026", text: "Resona AI integrated with Spatial intelligence, introducing anchored Table and Group nodes directly on the ER canvas." },
  { year: "Today", text: "Schema Weaver evolves into a comprehensive PostgreSQL Operating System, used by engineers to design and explore production schemas." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="The Origin Story"
          title={
            <>
              Built for the browser.
              <br />
              <span className="text-gradient-mesh">Made for the AI era.</span>
            </>
          }
          description="Schema Weaver was born in January 2026 out of a technical frustration. Existing database clients were too heavy, visualization tools were too static, and nothing was built for the speed of agentic AI."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="hero" size="xl" asChild>
              <a href="https://sql-editor.schemaweaver.vivekmind.com">
                Launch SQL Editor <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="mailto:vivek@vivekmind.com">Contact Founder</a>
            </Button>
          </div>
        </PageHero>

        {/* Story */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
              <Telescope className="w-3 h-3" />
              The Mission
            </div>
            <div className="mt-8 space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              <p>
                In early 2026, building complex PostgreSQL schemas still felt like an exercise in friction. 
                Existing desktop clients like <span className="text-foreground font-medium">DBeaver</span> were powerful but heavy, 
                and visualization tools like <span className="text-foreground font-medium">dbdiagram.io</span> were static drawings 
                disconnected from live production reality.
              </p>
              <p>
                Vivek.KY started Schema Weaver on <span className="text-foreground font-medium">January 3rd, 2026</span> as a solo mission 
                to build what was missing: a "PostgreSQL Operating System" that runs entirely in the browser, 
                understands the graph-theory of your database, and integrates agentic AI as a core architectural layer.
              </p>
              <p className="text-foreground font-medium">
                We believe database tools should be as modular as your code, as fast as your IDE, 
                and as intelligent as your best engineer.
              </p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-24 border-t border-border bg-muted/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                <span className="w-6 h-px bg-primary" />
                Engineering Values
              </div>
              <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
                Our core principles.
              </h2>
            </div>
            <div className="mt-14 grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-border bg-border">
              {principles.map((p) => (
                <div key={p.title} className="bg-card p-8">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 border-t border-border bg-muted/20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
              <span className="w-6 h-px bg-primary" />
              Project Evolution
            </div>
            <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
              A short history.
            </h2>
            <ol className="mt-12 relative border-l border-border ml-3">
              {milestones.map((m, i) => (
                <li key={m.year} className="ml-6 pb-10 last:pb-0 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="absolute -left-2 w-4 h-4 rounded-full bg-primary shadow-glow-emerald" />
                  <div className="text-xs font-mono uppercase tracking-widest text-primary">
                    {m.year}
                  </div>
                  <p className="mt-2 text-foreground/90 leading-relaxed">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
