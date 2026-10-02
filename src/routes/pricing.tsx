import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check,
  Minus,
  ArrowRight,
  User,
  Users,
  Plus,
  Minus as MinusIcon,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────────
 * FAQ data — hoisted so schema.org script can reference it.
 * ───────────────────────────────────────────────────────────────────────────── */

const faqs = [
  {
    q: "Is there really a free tier?",
    a: "Yes. Free is a permanent plan (not a trial). It includes 3,000 AI credits per month, Flash and Deep modes, the full SQL Editor, live ER diagrams, the 20-layer Schema Compiler, and data grid export. Free users can also join teams as invited members with no paywall.",
  },
  {
    q: "How does billing work?",
    a: "Billing is pay-first with no auto-debit. When you purchase Pro or Team, your subscription stays active until the end of the billing period. We never automatically charge your card; you renew manually to continue.",
  },
  {
    q: "How does the Team plan and seat billing work?",
    a: "The Team plan is $15 / seat / month with a minimum base of 2 seats ($30 / month). Seats can be added anytime — seat additions are prorated and not locked to renewal. Every member gets their own 100,000 AI credits per month.",
  },
  {
    q: "What is the policy on Pro cancellations or changes?",
    a: "Individual plans (Pro) are non-refundable and locked until the billing period ends (no mid-cycle switch, downgrade, or cancellation). Since there is no auto-debit, your plan simply expires at the end of the term unless you choose to renew.",
  },
  {
    q: "What are AI credits and modes?",
    a: "AI credits power natural-language queries, AI charts, and data analysis in Data Explorer. Both Flash mode (fast everyday tasks) and Deep mode (deep multi-table reasoning and synthesis) are available across all tiers.",
  },
  {
    q: "Where does my data live? Does AI see my database rows?",
    a: "Your row-level data never leaves your infrastructure. Queries execute locally or stream directly to your browser. AI models only reason over schema metadata and query summaries to generate SQL and visual insights.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * Route definition
 * ───────────────────────────────────────────────────────────────────────────── */

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Schema Weaver" },
      {
        name: "description",
        content:
          "See pricing for Schema Weaver Data Explorer. Free with 3,000 AI credits, Pro at $29/mo, and Team at $15/seat/mo.",
      },
      {
        name: "keywords",
        content:
          "Schema Weaver pricing, Data Explorer pricing, PostgreSQL AI workspace, Resona AI credits, team database pricing",
      },
      { property: "og:title", content: "Pricing — Schema Weaver" },
      {
        property: "og:description",
        content:
          "Free, Pro ($29/mo), and Team ($15/seat/mo) plans for Schema Weaver Data Explorer.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://schemaweaver.dev/pricing",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pricing — Schema Weaver" },
      {
        name: "twitter:description",
        content:
          "Free, Pro, and Team plans for the complete AI-powered PostgreSQL data workspace.",
      },
      {
        rel: "canonical",
        href: "https://schemaweaver.dev/pricing",
      } as never,
    ],
    links: [{ rel: "canonical", href: "https://schemaweaver.dev/pricing" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Schema Weaver Data Explorer",
          description:
            "AI-powered PostgreSQL data explorer and SQL workspace with natural-language queries, live ER diagrams, AI charts, and team collaboration.",
          brand: { "@type": "Brand", name: "Schema Weaver" },
          offers: [
            {
              "@type": "Offer",
              name: "Free",
              price: "0",
              priceCurrency: "USD",
              description:
                "3,000 AI credits/month, full SQL editor, ER diagrams, and compiler",
            },
            {
              "@type": "Offer",
              name: "Pro",
              price: "29",
              priceCurrency: "USD",
              description:
                "200,000 AI credits/month, Flash & Deep modes, 5 concurrent agents, AI charts & reports",
            },
            {
              "@type": "Offer",
              name: "Team",
              price: "15",
              priceCurrency: "USD",
              description:
                "$15/seat/month (min 2 seats), 100,000 AI credits per seat, shared database connections",
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

const DATA_EXPLORER_URL = "https://data-explorer.schemaweaver.dev";

/* ─────────────────────────────────────────────────────────────────────────────
 * Comparison table data (3 Live Plans: Free, Pro, Team)
 * ───────────────────────────────────────────────────────────────────────────── */

const compareGroups: Array<{
  group: string;
  rows: Array<{
    label: string;
    values: [boolean | string, boolean | string, boolean | string];
  }>;
}> = [
  {
    group: "Resona AI & Compute",
    rows: [
      {
        label: "Monthly AI credits",
        values: ["3,000", "200,000", "100,000 / seat"],
      },
      {
        label: "AI modes",
        values: ["Flash & Deep", "Flash & Deep", "Flash & Deep"],
      },
      { label: "Concurrent agents", values: ["1", "5", "2"] },
      { label: "Natural-language to SQL", values: [true, true, true] },
      {
        label: "Agentic data analysis",
        values: [true, true, true],
      },
    ],
  },
  {
    group: "Data Explorer & Analytics",
    rows: [
      {
        label: "High-performance data grid",
        values: [true, true, true],
      },
      {
        label: "Server-side sorting & filtering",
        values: [true, true, true],
      },
      {
        label: "Column statistics & distributions",
        values: [true, true, true],
      },
      {
        label: "Export formats",
        values: ["CSV", "CSV, JSON, Excel, SQL", "CSV, JSON, Excel, SQL"],
      },
      {
        label: "AI charts & visualizations",
        values: [false, true, true],
      },
      {
        label: "AI report generation (PPT, PDF)",
        values: [false, true, true],
      },
    ],
  },
  {
    group: "SQL Editor & Schema Tools",
    rows: [
      {
        label: "Full SQL editor with autosave",
        values: [true, true, true],
      },
      {
        label: "Live ER diagrams",
        values: [true, true, true],
      },
      {
        label: "20-layer Schema Compiler",
        values: [true, true, true],
      },
      {
        label: "Schema diff & version history",
        values: [true, true, true],
      },
      {
        label: "Pull / Diff / Push migrations",
        values: [true, true, true],
      },
    ],
  },
  {
    group: "Team & Collaboration",
    rows: [
      {
        label: "Team access model",
        values: [
          "Join as invited member",
          "Workspaces (up to 5 members)",
          "Per-seat workspaces (owner bills)",
        ],
      },
      {
        label: "Seats included",
        values: ["Solo", "Solo", "2 to 1,000 seats"],
      },
      {
        label: "Add seats anytime (prorated)",
        values: [false, false, true],
      },
      {
        label: "Shared database connections",
        values: [false, false, true],
      },
      {
        label: "Credit structure",
        values: [
          "Individual credits",
          "Individual (not pooled)",
          "Per-seat credits",
        ],
      },
    ],
  },
  {
    group: "Support & Billing Policy",
    rows: [
      {
        label: "Billing policy",
        values: [
          "Permanent Free",
          "Pay-first, locked to period",
          "Pay-first, seats addable anytime",
        ],
      },
      {
        label: "Auto-debit",
        values: ["None", "No auto-debit", "No auto-debit"],
      },
      {
        label: "Support channel",
        values: ["Community", "Priority email", "Priority support"],
      },
    ],
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-primary mx-auto" />;
  if (value === false)
    return <Minus className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
  return (
    <span className="text-xs text-foreground/85 font-medium">{value}</span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Page Component
 * ───────────────────────────────────────────────────────────────────────────── */

function PricingPage() {
  const [activeSlab, setActiveSlab] = useState<"individual" | "team">(
    "individual",
  );
  const [teamSeats, setTeamSeats] = useState(2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Simple & Clean Header with Schema Weaver brand colors */}
        <section className="pt-36 pb-12 text-center px-6">
          <p className="font-display font-semibold text-base sm:text-lg tracking-tight text-primary">
            Schema Weaver
          </p>
          <h1 className="mt-3 font-display font-bold tracking-tight text-5xl sm:text-6xl text-foreground">
            Pricing
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            See pricing for our individual, team, and enterprise plans.
          </p>

          {/* Theme Pill Toggle */}
          <div className="mt-8 inline-flex p-1.5 rounded-xl border border-border bg-card/80 backdrop-blur shadow-sm">
            <button
              onClick={() => setActiveSlab("individual")}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all",
                activeSlab === "individual"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <User className="w-4 h-4" />
              <span>Individual</span>
            </button>
            <button
              onClick={() => setActiveSlab("team")}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all",
                activeSlab === "team"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Users className="w-4 h-4" />
              <span>Business & Enterprise</span>
            </button>
          </div>
        </section>

        {/* Tier cards section with Schema Weaver theme & glow */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            {activeSlab === "individual" ? (
              /* ── Individual Slab: Free & Pro ───────────────────────────── */
              <div className="grid md:grid-cols-2 gap-8">
                {/* FREE CARD */}
                <div className="relative rounded-2xl border border-border bg-card/60 p-8 flex flex-col justify-between shadow-card-soft hover:border-primary/30 transition-all">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-foreground">
                      Free
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground min-h-[36px]">
                      For solo developers exploring PostgreSQL.
                    </p>

                    <div className="mt-6 mb-6">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-bold text-5xl tracking-tight text-foreground">
                          $0
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / month
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Permanent free plan · No credit card required
                      </p>
                    </div>

                    <Button
                      variant="glass"
                      size="lg"
                      className="w-full rounded-xl"
                      asChild
                    >
                      <a href={DATA_EXPLORER_URL}>
                        Get started free{" "}
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </a>
                    </Button>

                    <ul className="mt-8 space-y-3 text-sm border-t border-border/60 pt-6">
                      {[
                        "3,000 AI credits / month",
                        "Full SQL editor with autosave",
                        "Live ER diagram",
                        "20-layer Schema Compiler",
                        "Schema diff & version history",
                        "Pull / Diff / Push migrations",
                        "Data grid & CSV export",
                        "Join teams as a member — invited by an owner, no upgrade needed",
                        "Community support",
                      ].map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground/90">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* PRO CARD */}
                <div className="relative rounded-2xl border border-primary/50 bg-card p-8 flex flex-col justify-between shadow-glow-emerald hover:border-primary transition-all">
                  <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    Most popular
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl text-foreground">
                      Pro
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground min-h-[36px]">
                      For power developers shipping production schema.
                    </p>

                    <div className="mt-6 mb-6">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-bold text-5xl tracking-tight text-foreground">
                          $29
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / month
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Billed monthly
                      </p>
                    </div>

                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full rounded-xl"
                      asChild
                    >
                      <a href={`${DATA_EXPLORER_URL}?plan=pro_monthly`}>
                        Choose Pro <ArrowRight className="w-4 h-4 ml-1.5" />
                      </a>
                    </Button>

                    <ul className="mt-8 space-y-3 text-sm border-t border-border/60 pt-6">
                      {[
                        "200,000 AI credits / month",
                        "Flash & Deep modes",
                        "5 concurrent agents",
                        "AI charts & data analysis",
                        "Multi-format export (CSV, JSON, Excel, SQL)",
                        "AI report generation (PPT, PDF)",
                        "Team sharing — workspaces & role-based access (credits are not pooled)",
                        "Priority support",
                        "Everything in Free",
                      ].map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground/90 font-medium">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Business & Enterprise Slab: Team & Enterprise ────────── */
              <div className="grid md:grid-cols-2 gap-8">
                {/* TEAM CARD */}
                <div className="relative rounded-2xl border border-primary/50 bg-card p-8 flex flex-col justify-between shadow-glow-emerald hover:border-primary transition-all">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-foreground">
                      Team
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground min-h-[36px]">
                      Per-seat billing for whole workspaces.
                    </p>

                    <div className="mt-6 mb-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-bold text-5xl tracking-tight text-foreground">
                          $15
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / seat / month
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Min 2 seats (${teamSeats * 15}/mo total)
                      </p>
                    </div>

                    {/* Clean seat adjuster */}
                    <div className="mb-6 p-3 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">
                        Team seats:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setTeamSeats((s) => Math.max(2, s - 1))
                          }
                          disabled={teamSeats <= 2}
                          className="w-7 h-7 rounded-md border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
                        >
                          <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono font-semibold text-foreground px-1">
                          {teamSeats} seats
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setTeamSeats((s) => Math.min(1000, s + 1))
                          }
                          className="w-7 h-7 rounded-md border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full rounded-xl"
                      asChild
                    >
                      <a
                        href={`${DATA_EXPLORER_URL}?plan=team_monthly&seats=${teamSeats}`}
                      >
                        Start with {teamSeats} Seats{" "}
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </a>
                    </Button>

                    <ul className="mt-8 space-y-3 text-sm border-t border-border/60 pt-6">
                      {[
                        "100,000 AI credits per seat / month",
                        "Per-seat billing — $15 / seat, base 2 seats",
                        "Add seats anytime — prorated, not locked to renewal",
                        "Team workspaces & role-based access",
                        "Shared database connections",
                        "Buyer becomes workspace owner; each member gets their own credits",
                        "Flash & Deep modes (2 concurrent agents)",
                        "Everything in Pro tooling",
                      ].map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground/90 font-medium">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ENTERPRISE CARD */}
                <div className="relative rounded-2xl border border-border bg-card/60 p-8 flex flex-col justify-between shadow-card-soft hover:border-primary/30 transition-all">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-foreground">
                      Enterprise
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground min-h-[36px]">
                      For organizations requiring custom scale and security.
                    </p>

                    <div className="mt-6 mb-6">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-bold text-5xl tracking-tight text-foreground">
                          Custom
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Annual invoicing · Custom seat packages
                      </p>
                    </div>

                    <Button
                      variant="glass"
                      size="lg"
                      className="w-full rounded-xl"
                      asChild
                    >
                      <Link to="/support">
                        Contact Sales <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Link>
                    </Button>

                    <ul className="mt-8 space-y-3 text-sm border-t border-border/60 pt-6">
                      {[
                        "Up to 1,000+ seats with custom pooled or per-seat credits",
                        "Dedicated VPC peering & private database connections",
                        "Custom SLA with 99.99% uptime guarantee",
                        "Enterprise SSO / SAML & SCIM directory sync",
                        "Audit logging & compliance exports",
                        "Dedicated Customer Success Manager",
                      ].map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground/90">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Comparison table (Compact & Clean: Free, Pro, Team with brand emerald) */}
        <section className="py-20 border-t border-border bg-muted/10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center">
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-foreground">
                Compare plans
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">
                Every feature, side by side.
              </p>
            </div>

            <div className="mt-12 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
              <table className="w-full text-sm min-w-[680px]">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="text-left font-medium text-muted-foreground p-4 w-1/3">
                      Feature
                    </th>
                    <th className="text-center font-display font-semibold p-4 w-1/5">
                      <div>Free</div>
                      <div className="text-xs font-normal text-muted-foreground font-mono">
                        $0
                      </div>
                    </th>
                    <th className="text-center font-display font-semibold p-4 w-1/5 text-primary bg-primary/5 border-x border-primary/20">
                      <div>Pro</div>
                      <div className="text-xs font-normal text-primary/80 font-mono">
                        $29
                      </div>
                    </th>
                    <th className="text-center font-display font-semibold p-4 w-1/5">
                      <div>Team</div>
                      <div className="text-xs font-normal text-muted-foreground font-mono">
                        $15 / seat
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareGroups.map((g) => (
                    <div key={g.group} style={{ display: "contents" }}>
                      <tr className="bg-muted/30">
                        <td
                          colSpan={4}
                          className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-muted-foreground border-t border-border font-semibold"
                        >
                          {g.group}
                        </td>
                      </tr>
                      {g.rows.map((r) => (
                        <tr
                          key={`${g.group}-${r.label}`}
                          className="border-t border-border/60 hover:bg-muted/20 transition-colors"
                        >
                          <td className="p-3.5 text-foreground/90 font-medium">
                            {r.label}
                          </td>
                          <td className="p-3.5 text-center">
                            <Cell value={r.values[0]} />
                          </td>
                          <td className="p-3.5 text-center bg-primary/5 border-x border-primary/20">
                            <Cell value={r.values[1]} />
                          </td>
                          <td className="p-3.5 text-center">
                            <Cell value={r.values[2]} />
                          </td>
                        </tr>
                      ))}
                    </div>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-t border-border">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center">
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-foreground">
                Frequently asked questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="mt-10">
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
