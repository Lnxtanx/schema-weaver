import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { FeedbackDialog } from "@/components/marketing/FeedbackDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  BookOpen,
  CheckCircle2,
  Github,
  LifeBuoy,
  Mail,
  MessageSquare,
  Send,
  Shield,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Schema Weaver | Help, Docs & Contact" },
      {
        name: "description",
        content:
          "Get help with Schema Weaver. Browse docs, ask the community, file a bug, or contact our support and sales teams. Enterprise support available.",
      },
      {
        name: "keywords",
        content:
          "Schema Weaver support, contact sales, PostgreSQL help, database migration support, enterprise SLA, customer success",
      },
      { property: "og:title", content: "Support — Schema Weaver" },
      {
        property: "og:description",
        content:
          "Docs, community, bug reports, and direct contact with the Schema Weaver team.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://schemaweaver.dev/support",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Support — Schema Weaver" },
      {
        name: "twitter:description",
        content:
          "Get help with Schema Weaver — docs, community, and direct support.",
      },
    ],
    links: [{ rel: "canonical", href: "https://schemaweaver.dev/support" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Schema Weaver Support",
          url: "https://schemaweaver.dev/support",
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
    href: "https://docs.schemaweaver.dev",
    type: "link",
  },
  {
    icon: MessageSquare,
    title: "Product Feedback",
    body: "Have an idea or something isn't working as expected? Tell us directly.",
    cta: "Submit Feedback",
    type: "feedback",
  },
  {
    icon: Github,
    title: "Bug reports",
    body: "Found a technical issue? File a report and our team will triage it.",
    cta: "Report Bug",
    type: "bug",
  },
  {
    icon: LifeBuoy,
    title: "Priority support",
    body: "Team and Enterprise plans get priority email and a dedicated CSM.",
    cta: "See plans",
    href: "/pricing",
    type: "link",
  },
];

const slaCards = [
  {
    icon: Zap,
    label: "Free & Team",
    value: "< 24h email response, business days",
  },
  {
    icon: Shield,
    label: "Enterprise",
    value: "1h response, 99.99% uptime SLA",
  },
  { icon: Mail, label: "Direct Support", value: "support@schemaweaver.dev" },
];

function SupportPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const emailVal = (formData.get("email") as string) || "";

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setSubmittedEmail(emailVal);
      toast.success(
        "Message received! Our team will get back to you within one business day.",
      );
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
          description="Self-serve docs, an active community, and direct support for Team and Enterprise plans. Pick the channel that fits."
        />

        {/* Channels */}
        <section className="pb-20 pt-4">
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
                  <h3 className="mt-5 font-display font-semibold text-lg">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                    {c.body}
                  </p>
                  <div className="mt-5">
                    {c.type === "link" ? (
                      c.href!.startsWith("/") ? (
                        <Button
                          variant="glass"
                          size="sm"
                          asChild
                          className="w-full"
                        >
                          <Link to={c.href as "/pricing"}>{c.cta}</Link>
                        </Button>
                      ) : (
                        <Button
                          variant="glass"
                          size="sm"
                          asChild
                          className="w-full"
                        >
                          <a
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {c.cta}
                          </a>
                        </Button>
                      )
                    ) : (
                      <FeedbackDialog
                        defaultType={c.type as "feedback" | "bug"}
                        trigger={
                          <Button variant="glass" size="sm" className="w-full">
                            {c.cta}
                          </Button>
                        }
                      />
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
                  <div className="mt-1 text-sm font-medium text-foreground/90">
                    {s.value}
                  </div>
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
                For sales, partnerships, or general inquiries — send us a message and our team will get back to you within one business day.
              </p>
            </div>

            {submitted ? (
              <div className="mt-12 rounded-2xl border border-primary/30 bg-card p-10 sm:p-14 text-center animate-fade-up shadow-lg">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                  We've got your message!
                </h3>
                <p className="mt-3 text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                  Thank you for reaching out. We have received your inquiry and our team will get back to you{submittedEmail ? ` at ${submittedEmail}` : ""} within one business day.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="mt-12 rounded-2xl border border-border bg-card p-8 grid gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Ada Lovelace"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="ada@company.com"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    name="topic"
                    required
                    placeholder="Enterprise pricing, security review, …"
                  />
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
                  <Button
                    variant="hero"
                    size="lg"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Sending…" : "Send message"}{" "}
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
