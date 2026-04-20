import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Minus, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Schema Weaver | PostgreSQL Schema & Data Platform" },
      {
        name: "description",
        content:
          "Transparent pricing for Schema Weaver. Free for solo developers, Team plans from $19/user/month, and Enterprise SSO + on-prem deployment. Compare features.",
      },
      { name: "keywords", content: "Schema Weaver pricing, PostgreSQL tools pricing, ER diagram pricing, database migration tool cost, SQL editor team plan, enterprise database platform" },
      { property: "og:title", content: "Pricing — Schema Weaver" },
      {
        property: "og:description",
        content:
          "Free for individuals, scalable plans for teams, and Enterprise-ready security. Compare every feature side by side.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://schemaweaver.vivekmind.com/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pricing — Schema Weaver" },
      {
        name: "twitter:description",
        content: "Free, Team, and Enterprise plans for the complete PostgreSQL workspace.",
      },
      { rel: "canonical", href: "https://schemaweaver.vivekmind.com/pricing" } as never,
    ],
    links: [
      { rel: "canonical", href: "https://schemaweaver.vivekmind.com/pricing" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Schema Weaver",
          description:
            "PostgreSQL Schema platform with SQL editor, ER diagrams, agentic AI, sync and high-performance data explorer.",
          brand: { "@type": "Brand", name: "VivekMind" },
          offers: [
            {
              "@type": "Offer",
              name: "Free",
              price: "0",
              priceCurrency: "USD",
              description: "For individual developers and learners",
            },
            {
              "@type": "Offer",
              name: "Team",
              price: "19",
              priceCurrency: "USD",
              description: "Per user / month, billed annually",
            },
            {
              "@type": "Offer",
              name: "Enterprise",
              priceCurrency: "USD",
              description: "Custom pricing, SSO, on-prem and dedicated support",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "For solo developers exploring PostgreSQL.",
    cta: "Start for free",
    href: "https://sql-editor.schemaweaver.vivekmind.com",
    highlight: false,
    perks: [
      "1 cloud project",
      "1 live database connection",
      "Multi-file SQL editor",
      "Live ER diagram",
      "20-layer Schema Compiler",
      "100 Resona AI messages / month",
    ],
  },
  {
    name: "Team",
    price: "$19",
    cadence: "per user / month",
    tagline: "For small teams shipping production schema.",
    cta: "Start 14-day trial",
    href: "https://sql-editor.schemaweaver.vivekmind.com",
    highlight: true,
    perks: [
      "Unlimited projects",
      "Unlimited database connections",
      "Real-time collaboration",
      "Role-based access (Owner / Editor / Viewer)",
      "Drift detection & safe migrations",
      "Unlimited Resona AI usage",
      "Data masking for PII",
      "Audit log (90 days)",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "talk to sales",
    tagline: "For organizations with security & compliance needs.",
    cta: "Contact sales",
    href: "/support",
    highlight: false,
    perks: [
      "Everything in Team",
      "SSO (SAML, OIDC) & SCIM",
      "On-prem / VPC deployment",
      "Customer-managed encryption keys",
      "Audit log (unlimited retention)",
      "Dedicated success manager",
      "99.99% uptime SLA",
      "Custom DPA & subprocessor controls",
    ],
  },
];

const compareGroups: Array<{
  group: string;
  rows: Array<{ label: string; values: [boolean | string, boolean | string, boolean | string] }>;
}> = [
  {
    group: "SQL Editor",
    rows: [
      { label: "Multi-file projects", values: [true, true, true] },
      { label: "Live ER diagram", values: [true, true, true] },
      { label: "20-layer Schema Compiler", values: [true, true, true] },
      { label: "Path Analysis", values: [true, true, true] },
      { label: "Branching & PR workflow", values: [false, true, true] },
    ],
  },
  {
    group: "Data Explorer",
    rows: [
      { label: "High-performance data grid", values: [true, true, true] },
      { label: "Server-side filtering", values: [true, true, true] },
      { label: "Column statistics", values: [true, true, true] },
      { label: "Multi-format export", values: ["CSV", "All formats", "All formats"] },
      { label: "PII data masking", values: [false, true, true] },
    ],
  },
  {
    group: "Resona AI",
    rows: [
      { label: "Schema co-pilot", values: ["100/mo", "Unlimited", "Unlimited"] },
      { label: "Natural-language SQL", values: ["100/mo", "Unlimited", "Unlimited"] },
      { label: "Auto-generated charts", values: [false, true, true] },
      { label: "Bring-your-own LLM key", values: [false, false, true] },
    ],
  },
  {
    group: "Collaboration & Security",
    rows: [
      { label: "Cloud projects", values: ["1", "Unlimited", "Unlimited"] },
      { label: "Database connections", values: ["1", "Unlimited", "Unlimited"] },
      { label: "Role-based access", values: [false, true, true] },
      { label: "SSO (SAML / OIDC)", values: [false, false, true] },
      { label: "Audit log", values: [false, "90 days", "Unlimited"] },
      { label: "On-prem / VPC", values: [false, false, true] },
      { label: "Support", values: ["Community", "Priority email", "Dedicated CSM"] },
    ],
  },
];

const faqs = [
  {
    q: "Is there really a free tier?",
    a: "Yes. Free is permanent, not a trial. It includes the full SQL Editor, live ER diagram, the 20-layer Schema Compiler, and 100 Resona AI messages every month — perfect for solo developers and learners.",
  },
  {
    q: "Where does my data live?",
    a: "Schema metadata (DDL, ER graph) is stored in our managed cloud, encrypted at rest. Row-level data from your databases is never persisted by Schema Weaver — queries stream directly from your database to your browser.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Team plans are month-to-month or annual. Cancel any time and keep using the Free plan with your existing projects (within Free limits).",
  },
  {
    q: "Does Resona AI see my row-level data?",
    a: "No. Resona AI receives schema metadata and your natural-language question, then generates SQL that runs in your browser against your database. Row-level data never leaves your infrastructure.",
  },
  {
    q: "Do you offer discounts?",
    a: "Yes — 50% off for verified students and educators, and 100% free for registered open-source projects. Reach out via the Support page.",
  },
  {
    q: "What does Enterprise include that Team doesn't?",
    a: "SSO (SAML/OIDC), SCIM provisioning, on-prem or VPC deployment, customer-managed encryption keys, unlimited audit log retention, custom DPA, a dedicated CSM, and a 99.99% uptime SLA.",
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-primary mx-auto" />;
  if (value === false) return <Minus className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
  return <span className="text-xs text-foreground/80">{value}</span>;
}

function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Pricing"
          title={
            <>
              Simple pricing for{" "}
              <span className="text-gradient-mesh">every team size.</span>
            </>
          }
          description="Start free. Scale when you're ready. Schema Weaver pricing is transparent — no per-database fees, no hidden migration limits, no surprise overages."
        />

        {/* Tier cards */}
        <section className="relative -mt-10 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {tiers.map((t, i) => (
                <div
                  key={t.name}
                  className={cn(
                    "relative rounded-2xl border p-8 flex flex-col animate-fade-up",
                    t.highlight
                      ? "border-primary/40 bg-card shadow-glow-emerald"
                      : "border-border bg-card/60 shadow-card-soft",
                  )}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {t.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      Most popular
                    </div>
                  )}
                  <div>
                    <h3 className="font-display font-semibold text-xl">{t.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t.tagline}</p>
                  </div>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display font-bold text-5xl tracking-tight">
                      {t.price}
                    </span>
                    <span className="text-sm text-muted-foreground">/ {t.cadence}</span>
                  </div>
                  <Button
                    variant={t.highlight ? "hero" : "glass"}
                    size="lg"
                    className="mt-6 w-full"
                    asChild
                  >
                    {t.href.startsWith("/") ? (
                      <Link to={t.href as "/support"}>
                        {t.cta} <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a href={t.href}>
                        {t.cta} <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </Button>
                  <ul className="mt-8 space-y-3 text-sm">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground/90">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                <span className="w-6 h-px bg-primary" />
                Compare plans
              </div>
              <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
                Every feature, side by side.
              </h2>
            </div>

            <div className="mt-14 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="text-left font-medium text-muted-foreground p-4 w-1/3">
                      Feature
                    </th>
                    <th className="text-center font-display font-semibold p-4">Free</th>
                    <th className="text-center font-display font-semibold p-4 text-primary">
                      Team
                    </th>
                    <th className="text-center font-display font-semibold p-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {compareGroups.map((g) => (
                    <>
                      <tr key={`${g.group}-h`} className="bg-card/40">
                        <td
                          colSpan={4}
                          className="px-4 py-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground border-t border-border"
                        >
                          {g.group}
                        </td>
                      </tr>
                      {g.rows.map((r) => (
                        <tr
                          key={`${g.group}-${r.label}`}
                          className="border-t border-border/60"
                        >
                          <td className="p-4 text-foreground/90">{r.label}</td>
                          <td className="p-4 text-center">
                            <Cell value={r.values[0]} />
                          </td>
                          <td className="p-4 text-center bg-primary/5">
                            <Cell value={r.values[1]} />
                          </td>
                          <td className="p-4 text-center">
                            <Cell value={r.values[2]} />
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t border-border bg-muted/20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                <span className="w-6 h-px bg-primary" />
                FAQ
              </div>
              <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
                Frequently asked questions.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Can't find what you're looking for?{" "}
                <Link to="/support" className="text-primary hover:underline">
                  Talk to our team
                </Link>
                .
              </p>
            </div>

            <Accordion type="single" collapsible className="mt-12">
              {faqs.map((f) => (
                <AccordionItem
                  key={f.q}
                  value={f.q}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}