import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Schema Weaver" },
      {
        name: "description",
        content: "Schema Weaver refund policy — details on eligibility, processing, and timelines for refunds for our PostgreSQL tools and services.",
      },
      { property: "og:title", content: "Refund Policy — Schema Weaver" },
      { property: "og:description", content: "Our official refund policy for Schema Weaver subscriptions and services." },
      { property: "og:url", content: "https://schemaweaver.vivekmind.com/refund-policy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://schemaweaver.vivekmind.com/refund-policy" },
    ],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Refund Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: April 2026</p>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <p>
              At Schema Weaver, we strive to build high-fidelity instruments for database engineering. 
              If you are not completely satisfied with your purchase, we are here to help.
            </p>

            <section className="space-y-4 border-t border-border pt-10">
              <h2 className="text-xl font-semibold text-foreground">1. Eligibility for Refunds</h2>
              <p>
                You are eligible for a full refund if you request it within <strong>7 days</strong> of your initial purchase 
                or the start of a new subscription period. To be eligible, please provide proof of purchase 
                and a brief explanation of how our tool did not meet your expectations.
              </p>
            </section>

            <section className="space-y-4 border-t border-border pt-10">
              <h2 className="text-xl font-semibold text-foreground">2. Processing Refunds</h2>
              <p>
                Once we receive your request, we will notify you of the status. Approved refunds are initiated 
                immediately to your original method of payment (e.g., credit card, UPI). 
                Processing typically takes 5 to 10 business days depending on your bank.
              </p>
            </section>

            <section className="space-y-4 border-t border-border pt-10">
              <h2 className="text-xl font-semibold text-foreground">3. Exclusions</h2>
              <ul className="list-disc pl-5 space-y-3">
                <li>Subscription renewals where the user failed to cancel before the billing date.</li>
                <li>Accounts terminated due to a violation of our Terms of Service.</li>
                <li>Consumed usage-based charges (e.g., extra AI credits).</li>
              </ul>
            </section>

            <section className="space-y-4 border-t border-border pt-10">
              <h2 className="text-xl font-semibold text-foreground">4. Contact Us</h2>
              <p>
                If you have any questions regarding refunds, please contact us at:
                <br />
                <strong className="text-primary">support@vivekmind.com</strong>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
