import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Heart, Lock, Sparkles, Telescope, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Schema Weaver | Built by VivekMind" },
      {
        name: "description",
        content:
          "Schema Weaver is built by VivekMind, a small team obsessed with database craft. Learn our story, principles, and the products we ship for technical teams.",
      },
      { name: "keywords", content: "VivekMind, Schema Weaver about, database tools company, PostgreSQL platform team, FairyForge, Resona AI" },
      { property: "og:title", content: "About Schema Weaver — Built by VivekMind" },
      {
        property: "og:description",
        content:
          "Infrastructure for the next generation of technical teams. Meet the people behind Schema Weaver.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://schemaweaver.vivekmind.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About — Schema Weaver" },
      {
        name: "twitter:description",
        content: "The team and principles behind Schema Weaver.",
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
            "https://twitter.com/vivekmind",
            "https://github.com/vivekmind",
            "https://linkedin.com/company/vivekmind",
          ],
          description:
            "VivekMind builds infrastructure tools for the next generation of technical teams, including Schema Weaver, FairyForge, and Resona AI.",
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
    body: "Databases are the most important system in your stack. Our tools should feel like instruments, not utilities.",
  },
  {
    icon: Lock,
    title: "Privacy is non-negotiable.",
    body: "Your row-level data never leaves your infrastructure. Schema-first analysis is our default, not an afterthought.",
  },
  {
    icon: Sparkles,
    title: "Agentic, not gimmicky.",
    body: "AI should plan, act, and observe — not just autocomplete. Resona AI ships work, not suggestions.",
  },
  {
    icon: Heart,
    title: "Indie energy. Enterprise discipline.",
    body: "Small team, weekly releases, deeply considered defaults. We ship like a startup and review like a bank.",
  },
];

const milestones = [
  { year: "2023", text: "VivekMind founded. First prototype of Schema Weaver compiles its first 10-table schema." },
  { year: "2024", text: "Public beta of SQL Editor + ER Diagram. Resona AI v1 released as a schema co-pilot." },
  { year: "2025", text: "Data Explorer launches with smart column sizing and natural-language SQL via Resona v2." },
  { year: "Today", text: "Trusted by hundreds of teams to design, sync, and explore PostgreSQL safely every day." },
];

const products = [
  {
    name: "Schema Weaver",
    body: "The complete PostgreSQL operating system: SQL Editor, live ER diagrams, agentic AI, and a high-performance Data Explorer.",
  },
  {
    name: "FairyForge",
    body: "A magical workspace for designing and shipping interactive learning experiences for technical content.",
  },
  {
    name: "Resona AI",
    body: "Our agentic AI research lab. Resona powers the co-pilot in Schema Weaver and ships open research on agent design.",
  },
  {
    name: "VivekMind Press",
    body: "Long-form writing on database design, distributed systems, and the craft of building technical tools.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="About VivekMind"
          title={
            <>
              Tools that respect{" "}
              <span className="text-gradient-mesh">your craft.</span>
            </>
          }
          description="We're a small team building infrastructure for the next generation of technical teams. Schema Weaver is our flagship — a single workspace for the entire PostgreSQL lifecycle."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="hero" size="xl" asChild>
              <Link to="/pricing">
                See pricing <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/support">Talk to the team</Link>
            </Button>
          </div>
        </PageHero>

        {/* Mission */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
              <Telescope className="w-3 h-3" />
              Our mission
            </div>
            <p className="mt-6 font-display text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-foreground/90">
              Database tooling has been stuck in 2008 for too long. We're rebuilding it from
              first principles —{" "}
              <span className="text-gradient-mesh">opinionated, AI-native, and made for the way modern teams actually ship.</span>
            </p>
          </div>
        </section>

        {/* Principles */}
        <section className="py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                <span className="w-6 h-px bg-primary" />
                Principles
              </div>
              <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
                What we believe.
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
              Timeline
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

        {/* Products */}
        <section className="py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                <Users className="w-3 h-3" />
                The VivekMind family
              </div>
              <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
                More than one product.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Schema Weaver is part of a wider ecosystem of tools and research from VivekMind.
              </p>
            </div>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.name} className="rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors">
                  <h3 className="font-display font-semibold text-lg">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}