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
      { title: "PostgreSQL SQL Editor & ER Diagram Tool | Resona AI - Schema Weaver (SW)" },
      {
        name: "description",
        content:
          "Design and visualize PostgreSQL with Schema Weaver (SW). The world's first Spatial AI assistant for database architecture. Features modular SQL editing, Dijkstra-powered path analysis, and drift-aware migrations.",
      },
      {
        name: "keywords",
        content:
          "PostgreSQL SQL Editor, schemaweaver, ER diagram tool, agentic SQL, spatial AI, database migration tool, postgres visualization, DDL editor, sw-db, database AI agent, Resona AI",
      },
      { property: "og:title", content: "PostgreSQL SQL Editor & ER Diagram Tool | Resona AI - Schema Weaver" },
      {
        property: "og:description",
        content:
          "A unified infrastructure workspace for designing, visualizing, and exploring PostgreSQL databases. Built for the AI era.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://schemaweaver.vivekmind.com/" },
      { property: "og:site_name", content: "Schema Weaver (SW)" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "PostgreSQL SQL Editor & ER Diagram Tool | Resona AI" },
      {
        name: "twitter:description",
        content:
          "The agentic operating system for PostgreSQL. Modular schema design and Dijkstra-powered visualization — built by VivekMind.",
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
          name: "Schema Weaver (SW)",
          alternateName: "schemaweaver",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "182",
          },
          description:
            "A browser-native PostgreSQL operating system for schema engineering. Includes modular DDL editor, live ER diagrams with Dijkstra-powered path analysis, and Resona AI for spatial database architecture.",
          publisher: { 
            "@type": "Organization", 
            name: "VivekMind",
            url: "https://vivekmind.com"
          },
          featureList: [
            "Modular PostgreSQL SQL Editor",
            "Live Interactive ER Diagrams",
            "Resona Spatial AI Assistant",
            "Dijkstra-powered Path Analysis",
            "Drift-aware Database Migrations",
            "20-layer Schema Compiler"
          ]
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
