import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation Policy — Schema Weaver" },
      {
        name: "description",
        content: "Schema Weaver cancellation policy — details on how to cancel your subscription and what happens to your data and team access.",
      },
      { property: "og:title", content: "Cancellation Policy — Schema Weaver" },
      { property: "og:description", content: "Our official cancellation policy for Schema Weaver accounts and subscriptions." },
      { property: "og:url", content: "https://schemaweaver.vivekmind.com/cancellation-policy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://schemaweaver.vivekmind.com/cancellation-policy" },
    ],
  }),
  component: CancellationPolicyPage,
});

function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Cancellation Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: April 2026</p>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <p>
              We understand that your project needs may change. This policy explains how to cancel your 
              Schema Weaver subscription and the effect of that cancellation on your projects.
            </p>

            <section className="space-y-4 border-t border-border pt-10">
              <h2 className="text-xl font-semibold text-foreground">1. How to Cancel</h2>
              <p>
                You can cancel your subscription at any time through the <strong>Subscription Settings</strong> 
                in your workspace dashboard. Alternatively, you can request cancellation by contacting 
                our support team at <strong>support@vivekmind.com</strong>.
              </p>
            </section>

            <section className="space-y-4 border-t border-border pt-10">
              <h2 className="text-xl font-semibold text-foreground">2. Effective Date</h2>
              <p>
                Cancellations take effect at the <strong>end of your current billing cycle</strong>. 
                You will retain full access to all Pro or Team features until the end of the paid period. 
                No partial refunds are provided for mid-cycle cancellations.
              </p>
            </section>

            <section className="space-y-4 border-t border-border pt-10">
              <h2 className="text-xl font-semibold text-foreground">3. Effect of Cancellation</h2>
              <ul className="list-disc pl-5 space-y-3">
                <li>Your account will revert to the Free tier at the end of the billing period.</li>
                <li>Advanced features like Dijkstra path analysis and Resona AI depth-edits may be limited.</li>
                <li>Team shared projects will become read-only or private depending on your workspace configuration.</li>
              </ul>
            </section>

            <section className="space-y-4 border-t border-border pt-10">
              <h2 className="text-xl font-semibold text-foreground">4. Contact Us</h2>
              <p>
                Questions about your cancellation? Reach out at:
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
