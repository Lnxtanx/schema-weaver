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

/* ─────────────────────────────────────────────────────────────────────────────
 * FAQ data — hoisted so schema.org script can reference it.
 * ───────────────────────────────────────────────────────────────────────────── */

const faqs = [
  {
    q: "Is there really a free tier?",
    a: "Yes. Free is permanent, not a trial. It includes 3,000 AI credits/month, 8 fast models, the full SQL Editor, live ER diagrams, and the 20-layer Schema Compiler — perfect for solo developers and learners.",
  },
  {
    q: "What are AI credits?",
    a: "AI credits are the currency for using Resona AI models. Different models cost different amounts of credits — fast models cost 1–10 credits per 1K tokens, while powerful models like Claude Opus cost 100+ credits per 1K tokens. You choose the model, the credits are deducted automatically.",
  },
  {
    q: "Where does my data live?",
    a: "Schema metadata (DDL, ER graph) is stored in our managed cloud, encrypted at rest. Row-level data from your databases is never persisted by Schema Weaver — queries stream directly from your database to your browser.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All paid plans are month-to-month. Cancel any time and keep using the Free plan with your existing projects (within Free limits).",
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
    q: "What's the difference between model tiers?",
    a: "Fast models (GPT-4o mini, Gemini Flash Lite, etc.) are great for everyday tasks. Smart models (Claude Haiku, Gemini Flash) offer better quality. Advanced models (GPT-4o, Claude Sonnet, Gemini Pro) handle complex schema work. Powerful models (Claude Opus) are for elite tasks. Higher tiers cost more credits per use.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Route
 * ───────────────────────────────────────────────────────────────────────────── */

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Schema Weaver | AI-Powered PostgreSQL Platform" },
      {
        name: "description",
        content:
          "Transparent pricing for Schema Weaver. Free for solo developers with 3K AI credits. Starter from $15/mo, Pro at $29/mo, Power at $79/mo. Compare all features.",
      },
      { name: "keywords", content: "Schema Weaver pricing, PostgreSQL tools pricing, AI SQL editor pricing, Resona AI credits, database platform cost" },
      { property: "og:title", content: "Pricing — Schema Weaver" },
      {
        property: "og:description",
        content:
          "Free for individuals. Starter, Pro, and Power plans for teams. Compare every feature side by side.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://schemaweaver.vivekmind.com/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pricing — Schema Weaver" },
      {
        name: "twitter:description",
        content: "Free, Starter, Pro, and Power plans for the complete AI-powered PostgreSQL workspace.",
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
            "AI-powered PostgreSQL platform with SQL editor, ER diagrams, agentic AI, and high-performance data explorer.",
          brand: { "@type": "Brand", name: "VivekMind" },
          offers: [
            {
              "@type": "Offer",
              name: "Free",
              price: "0",
              priceCurrency: "USD",
              description: "3,000 AI credits/month, 8 fast models, full SQL Editor",
            },
            {
              "@type": "Offer",
              name: "Starter",
              price: "15",
              priceCurrency: "USD",
              description: "100,000 AI credits/month, 19 models (Fast + Smart tiers)",
            },
            {
              "@type": "Offer",
              name: "Pro",
              price: "29",
              priceCurrency: "USD",
              description: "200,000 AI credits/month, 36 models including Advanced tier",
            },
            {
              "@type": "Offer",
              name: "Power",
              price: "79",
              priceCurrency: "USD",
              description: "500,000 AI credits/month, 39 models including Claude Opus",
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

/* ─────────────────────────────────────────────────────────────────────────────
 * Tier card data
 *
 * CTA buttons redirect to SQL Editor with ?plan= param.
 * The SQL Editor handles login + Razorpay checkout.
 * ───────────────────────────────────────────────────────────────────────────── */

const SQL_EDITOR_URL = "https://sql-editor.schemaweaver.vivekmind.com";

const tiers = [
  {
    name: "Free",
    price: "$0",
    priceInr: "₹0",
    cadence: "forever",
    tagline: "For solo developers exploring PostgreSQL.",
    cta: "Get started free",
    href: SQL_EDITOR_URL,
    highlight: false,
    perks: [
      "3,000 AI credits / month",
      "8 fast models (GPT-4o mini, Gemini Flash Lite, etc.)",
      "Multi-file SQL editor with autosave",
      "Live ER diagram (16 node types)",
      "20-layer Schema Compiler (A–F grading)",
      "Schema diff & version history",
      "Pull / Diff / Push migrations",
      "High-performance data grid & export (CSV)",
      "Community support",
    ],
  },
  {
    name: "Starter",
    price: "$15",
    priceInr: "₹1,199",
    cadence: "per month",
    tagline: "For developers who need smarter AI models.",
    cta: "Choose Starter",
    href: `${SQL_EDITOR_URL}?plan=starter`,
    highlight: false,
    perks: [
      "100,000 AI credits / month",
      "19 models — Fast + Smart tiers",
      "2 concurrent agents · 10-min runs",
      "Claude Haiku 4.5, Gemini Flash, DeepSeek V3.2",
      "AI charts & data analysis",
      "Multi-format export (CSV, JSON, Excel, SQL)",
      "Everything in Free",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    priceInr: "₹2,499",
    cadence: "per month",
    tagline: "For teams shipping production schema.",
    cta: "Choose Pro",
    href: `${SQL_EDITOR_URL}?plan=pro_monthly`,
    highlight: true,
    perks: [
      "200,000 AI credits / month",
      "36 models — Fast + Smart + Advanced tiers",
      "5 concurrent agents · 20-min runs",
      "GPT-4o, Claude Sonnet 4.6, Gemini 2.5 Pro",
      "Team workspaces & role-based access",
      "AI report generation (PPT, PDF)",
      "Everything in Starter",
      "Priority support",
    ],
  },
  {
    name: "Power",
    price: "$79",
    priceInr: "₹6,999",
    cadence: "per month",
    tagline: "For power users who need the best models.",
    cta: "Choose Power",
    href: `${SQL_EDITOR_URL}?plan=power_monthly`,
    highlight: false,
    perks: [
      "500,000 AI credits / month",
      "39 models — all tiers including Powerful",
      "5 concurrent agents · 1-hour runs",
      "Claude Opus 4.6, Kimi K2 Thinking",
      "Unlimited version history",
      "Shared database connections",
      "Everything in Pro",
      "Priority support",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Feature comparison table — comprehensive product showcase
 * ───────────────────────────────────────────────────────────────────────────── */

const compareGroups: Array<{
  group: string;
  rows: Array<{ label: string; values: [boolean | string, boolean | string, boolean | string, boolean | string] }>;
}> = [
  {
    group: "Resona AI",
    rows: [
      { label: "Monthly credits", values: ["3,000", "100,000", "200,000", "500,000"] },
      { label: "Daily credit limit", values: ["300", "10,000", "20,000", "50,000"] },
      { label: "Concurrent agents", values: ["1", "2", "5", "5"] },
      { label: "Max tokens per run", values: ["50K", "100K", "200K", "500K"] },
      { label: "Fast models (GPT-4o mini, etc.)", values: [true, true, true, true] },
      { label: "Smart models (Claude Haiku, Gemini Flash)", values: [false, true, true, true] },
      { label: "Advanced models (GPT-4o, Sonnet, Gemini Pro)", values: [false, false, true, true] },
      { label: "Powerful models (Claude Opus)", values: [false, false, false, true] },
      { label: "Agent run duration", values: ["2 min", "10 min", "20 min", "1 hour"] },
    ],
  },
  {
    group: "SQL Editor",
    rows: [
      { label: "Multi-file projects (Cloud, Local, Team)", values: [true, true, true, true] },
      { label: "PostgreSQL syntax highlighting & autocomplete", values: [true, true, true, true] },
      { label: "Multi-file tabs with autosave", values: [true, true, true, true] },
      { label: "Split view (editor + ER diagram)", values: [true, true, true, true] },
      { label: "20-layer Schema Compiler (A–F grading)", values: [true, true, true, true] },
      { label: "Schema diff (side-by-side, unified, semantic)", values: [true, true, true, true] },
      { label: "Inline diff overlay in editor", values: [true, true, true, true] },
      { label: "Version history with restore", values: ["30 days", "30 days", true, "Unlimited"] },
      { label: "Compare two historical versions", values: [true, true, true, true] },
      { label: "AI workspace editing (55 tools, ReAct loop)", values: [true, true, true, true] },
    ],
  },
  {
    group: "ER Diagram",
    rows: [
      { label: "Live auto-generated diagram from SQL", values: [true, true, true, true] },
      { label: "16 node types (views, functions, enums, RLS, roles)", values: [true, true, true, true] },
      { label: "Schema grouping & namespace clustering", values: [true, true, true, true] },
      { label: "FK path analysis (BFS / Dijkstra)", values: [true, true, true, true] },
      { label: "Visibility controls & column view modes", values: [true, true, true, true] },
      { label: "Per-table, per-schema & global AI chat on canvas", values: [true, true, true, true] },
      { label: "Export diagram (PNG / SVG)", values: [true, true, true, true] },
    ],
  },
  {
    group: "Database & Migrations",
    rows: [
      { label: "Pull / Diff / Push workflow", values: [true, true, true, true] },
      { label: "8-step migration pipeline with transaction wrapping", values: [true, true, true, true] },
      { label: "Drift detection (external changes)", values: [true, true, true, true] },
      { label: "Safe mode migration (multi-phase type changes)", values: [true, true, true, true] },
      { label: "Rollback with auto-generated reverse SQL", values: [true, true, true, true] },
      { label: "Migration history with hash chain integrity", values: [true, true, true, true] },
      { label: "Built-in terminal (sw commands)", values: [true, true, true, true] },
    ],
  },
  {
    group: "Data Explorer",
    rows: [
      { label: "High-performance data grid", values: [true, true, true, true] },
      { label: "Server-side sorting & filtering", values: [true, true, true, true] },
      { label: "Column statistics (null %, distributions)", values: [true, true, true, true] },
      { label: "Multi-format export", values: ["CSV", "All formats", "All formats", "All formats"] },
      { label: "Full database export (ZIP archive)", values: [false, true, true, true] },
      { label: "AI charts & visualizations (10+ chart types)", values: [true, true, true, true] },
      { label: "Agentic data analysis (40+ tools)", values: [true, true, true, true] },
      { label: "Voice input for AI queries", values: [true, true, true, true] },
      { label: "AI report generation (PPT, PDF, Markdown)", values: [true, true, true, true] },
    ],
  },
  {
    group: "Team & Collaboration",
    rows: [
      { label: "Team creation & email invitation", values: [true, true, true, true] },
      { label: "Role-based access (Owner / Member)", values: [true, true, true, true] },
      { label: "Shared database connections (no credential sharing)", values: [true, true, true, true] },
      { label: "Audit trail (who changed what, when)", values: [true, true, true, true] },
      { label: "AES-256 credential encryption", values: [true, true, true, true] },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Support channel", values: ["Community", "Email", "Priority email", "Priority email"] },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Helper components
 * ───────────────────────────────────────────────────────────────────────────── */

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-primary mx-auto" />;
  if (value === false) return <Minus className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
  return <span className="text-xs text-foreground/80">{value}</span>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Page component
 * ───────────────────────────────────────────────────────────────────────────── */

function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Pricing"
          title={
            <>
              Simple, transparent{" "}
              <span className="text-gradient-mesh">AI‑powered pricing.</span>
            </>
          }
          description="Start free with 3,000 AI credits. Scale when you're ready — no per-database fees, no hidden limits, no surprise overages."
        />

        {/* Tier cards */}
        <section className="relative -mt-10 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
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
                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-bold text-5xl tracking-tight">
                        {t.price}
                      </span>
                      <span className="text-sm text-muted-foreground">/ {t.cadence}</span>
                    </div>
                    {t.priceInr !== "₹0" && (
                      <p className="mt-1 text-sm text-muted-foreground/70">
                        or {t.priceInr}/mo for India
                      </p>
                    )}
                  </div>
                  <Button
                    variant={t.highlight ? "hero" : "glass"}
                    size="lg"
                    className="mt-6 w-full"
                    asChild
                  >
                    <a href={t.href}>
                      {t.cta} <ArrowRight className="w-4 h-4" />
                    </a>
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
              <table className="w-full text-sm min-w-[860px]">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="text-left font-medium text-muted-foreground p-4 w-1/4">
                      Feature
                    </th>
                    <th className="text-center font-display font-semibold p-4">Free</th>
                    <th className="text-center font-display font-semibold p-4">Starter</th>
                    <th className="text-center font-display font-semibold p-4 text-primary">
                      Pro
                    </th>
                    <th className="text-center font-display font-semibold p-4">Power</th>
                  </tr>
                </thead>
                <tbody>
                  {compareGroups.map((g) => (
                    <>
                      <tr key={`${g.group}-h`} className="bg-card/40">
                        <td
                          colSpan={5}
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
                          <td className="p-4 text-center">
                            <Cell value={r.values[1]} />
                          </td>
                          <td className="p-4 text-center bg-primary/5">
                            <Cell value={r.values[2]} />
                          </td>
                          <td className="p-4 text-center">
                            <Cell value={r.values[3]} />
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