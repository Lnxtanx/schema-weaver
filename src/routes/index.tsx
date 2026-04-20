import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SqlEditorSection } from "@/components/landing/SqlEditorSection";
import { DataExplorerSection } from "@/components/landing/DataExplorerSection";
import { ResonaSection } from "@/components/landing/ResonaSection";
import { SyncSection } from "@/components/landing/SyncSection";
import { CapabilitiesGrid } from "@/components/landing/CapabilitiesGrid";
import { TeamSection } from "@/components/landing/TeamSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Schema Weaver — The Complete PostgreSQL Operating System" },
      {
        name: "description",
        content:
          "Design, visualize, migrate, and explore your PostgreSQL databases in a single AI-powered workspace. SQL Editor, live ER diagrams, agentic AI, and a high-performance data explorer.",
      },
      {
        name: "keywords",
        content:
          "PostgreSQL, schema management, ER diagram, SQL editor, database migration, AI data assistant, Resona AI, Schema Weaver, VivekMind, database tooling, drift detection, data explorer",
      },
      { property: "og:title", content: "Schema Weaver — The Complete PostgreSQL Operating System" },
      {
        property: "og:description",
        content:
          "Design, visualize, migrate, and explore your PostgreSQL databases in a single AI-powered workspace.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://schemaweaver.vivekmind.com/" },
      { property: "og:site_name", content: "Schema Weaver" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Schema Weaver — The Complete PostgreSQL Operating System" },
      {
        name: "twitter:description",
        content:
          "One AI-powered workspace for designing, migrating, and exploring PostgreSQL — built by VivekMind.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://schemaweaver.vivekmind.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Schema Weaver",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "182",
          },
          description:
            "The complete PostgreSQL operating system: SQL editor, live ER diagrams, agentic AI, drift-aware sync, and a high-performance data explorer.",
          publisher: { "@type": "Organization", name: "VivekMind" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <SqlEditorSection />
        <DataExplorerSection />
        <ResonaSection />
        <SyncSection />
        <CapabilitiesGrid />
        <TeamSection />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
