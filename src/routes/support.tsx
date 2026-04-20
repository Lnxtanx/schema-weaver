import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BookOpen, Github, LifeBuoy, Mail, MessageSquare, Send, Shield, Zap } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Schema Weaver | Help, Docs & Contact" },
      {
        name: "description",
        content:
          "Get help with Schema Weaver. Browse docs, ask the community, file a bug, or contact our support and sales teams. Enterprise support available.",
      },
      { name: "keywords", content: "Schema Weaver support, contact sales, PostgreSQL help, database migration support, enterprise SLA, customer success" },
      { property: "og:title", content: "Support — Schema Weaver" },
      {
        property: "og:description",
        content: "Docs, community, bug reports, and direct contact with the Schema Weaver team.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://schemaweaver.vivekmind.com/support" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Support — Schema Weaver" },
      {
        name: "twitter:description",
        content: "Get help with Schema Weaver — docs, community, and direct support.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://schemaweaver.vivekmind.com/support" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Schema Weaver Support",
          url: "https://schemaweaver.vivekmind.com/support",
          contactOption: ["Email", "Community"],
        }),
      },
    ],
  }),
  component: SupportPage,
});

const channels = [
  {
    icon: BookOpen,
    title: "Documentation",
    body: "Guides, references, and recipes for every feature in Schema Weaver.",
    cta: "Browse docs",
    href: "#",
  },
  {
    icon: MessageSquare,
    title: "Community",
    body: "Ask questions and share patterns with thousands of database engineers.",
    cta: "Join Discord",
    href: "#",
  },
  {
    icon: Github,
    title: "Bug reports",
    body: "Found something off? File an issue on GitHub — we triage daily.",
    cta: "Open issue",
    href: "https://github.com",
  },
  {
    icon: LifeBuoy,
    title: "Priority support",
    body: "Team and Enterprise plans get priority email and a dedicated CSM.",
    cta: "See plans",
    href: "/pricing",
  },
];

const slaCards = [
  { icon: Zap, label: "Free & Team", value: "< 24h email response, business days" },
  { icon: Shield, label: "Enterprise", value: "1h response, 99.99% uptime SLA" },
  { icon: Mail, label: "Security", value: "security@schemaweaver.vivekmind.com" },
];

function SupportPage() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent — we'll be in touch within one business day.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Support"
          title={
            <>
              We're here when{" "}
              <span className="text-gradient-mesh">you need us.</span>
            </>
          }
          description="Self-serve docs, an active community, and a real human team behind every Team and Enterprise plan. Pick the channel that fits."
        />

        {/* Channels */}
        <section className="pb-20 -mt-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {channels.map((c, i) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-border bg-card p-7 flex flex-col hover:border-primary/40 hover:-translate-y-0.5 transition-all animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-lg">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{c.body}</p>
                  <div className="mt-5">
                    {c.href.startsWith("/") ? (
                      <Button variant="glass" size="sm" asChild className="w-full">
                        <Link to={c.href as "/pricing"}>{c.cta}</Link>
                      </Button>
                    ) : (
                      <Button variant="glass" size="sm" asChild className="w-full">
                        <a href={c.href}>{c.cta}</a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLA strip */}
        <section className="py-12 border-t border-border bg-muted/20">
          <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-6">
            {slaCards.map((s) => (
              <div key={s.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="mt-1 text-sm font-medium text-foreground/90">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section className="py-24 border-t border-border">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                <span className="w-6 h-px bg-primary" />
                Contact
              </div>
              <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
                Send us a message.
              </h2>
              <p className="mt-4 text-muted-foreground">
                For sales, partnerships, or general questions. Security disclosures go to{" "}
                <a href="mailto:security@schemaweaver.vivekmind.com" className="text-primary hover:underline">
                  security@schemaweaver.vivekmind.com
                </a>
                .
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="mt-12 rounded-2xl border border-border bg-card p-8 grid gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Ada Lovelace" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" name="email" type="email" required placeholder="ada@company.com" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" name="topic" required placeholder="Enterprise pricing, security review, …" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us a bit about your team, your stack, and what you're trying to do."
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  We typically respond within 1 business day.
                </p>
                <Button variant="hero" size="lg" type="submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Send message"} <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}