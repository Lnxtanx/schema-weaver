import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SqlEditorSection } from "@/components/landing/SqlEditorSection";
import { ResonaSection } from "@/components/landing/ResonaSection";
import { SyncSection } from "@/components/landing/SyncSection";
import { CapabilitiesGrid } from "@/components/landing/CapabilitiesGrid";
import { TeamSection } from "@/components/landing/TeamSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaSection } from "@/components/landing/CtaSection";
import { ConnectorVideoSection } from "@/components/landing/ConnectorVideoSection";
import { ResonaExplorerSection } from "@/components/landing/ResonaExplorerSection";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Schema Weaver — The First Voice-Native Analytics Workspace for PostgreSQL",
      },
      {
        name: "description",
        content:
          "Schema Weaver is the first voice-native analytics workspace for PostgreSQL. Browse live data in high-performance grids, talk to your database by voice, query in plain English, and build instant AI charts.",
      },
      {
        name: "keywords",
        content:
          "Schema Weaver, voice-native analytics, PostgreSQL analytics, voice database query, Resona AI, agentic SQL, PostgreSQL visualization, live data grid, schema compiler, ER diagrams",
      },
      {
        property: "og:title",
        content:
          "Schema Weaver — The First Voice-Native Analytics Workspace for PostgreSQL",
      },
      {
        property: "og:description",
        content:
          "Schema Weaver is the first voice-native analytics workspace for PostgreSQL. Talk to your database by voice, query in plain English, inspect live schemas, and build instant AI charts.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://schemaweaver.dev/" },
      { property: "og:site_name", content: "Schema Weaver" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Schema Weaver — The First Voice-Native Analytics Workspace for PostgreSQL",
      },
      {
        name: "twitter:description",
        content:
          "The first voice-native analytics workspace for PostgreSQL. Talk to your database, explore live tables, and generate AI charts.",
      },
    ],
    links: [{ rel: "canonical", href: "https://schemaweaver.dev/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Schema Weaver",
          alternateName: "schemaweaver",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          url: "https://schemaweaver.dev/",
          downloadUrl: "https://data-explorer.schemaweaver.dev",
          screenshot: "https://schemaweaver.dev/images/de.png",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            url: "https://schemaweaver.dev/pricing",
          },
          description:
            "The first voice-native analytics workspace for PostgreSQL. Features voice-driven queries, high-performance data grids, live ER diagrams, and Resona AI.",
          publisher: {
            "@type": "Organization",
            name: "Schema Weaver",
            url: "https://schemaweaver.dev",
          },
          featureList: [
            "Voice-Native Database Analytics",
            "Voice-to-SQL & Natural Language Querying",
            "High-Performance Live Data Grids",
            "Automated AI Chart Synthesis",
            "Interactive Live ER Diagrams",
            "20-layer Schema Compiler",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeTab, setActiveTab] = useState<"explorer" | "editor">("explorer");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero activeTab={activeTab} onTabChange={setActiveTab} />
        {/*
          Both tab panels are always rendered so their headings and copy are
          present in the server-rendered HTML for crawlers. Only visibility is
          toggled on the client, so search engines can index every section.
        */}
        <div className={activeTab === "editor" ? undefined : "hidden"}>
          <SqlEditorSection />
          <ResonaSection />
          <SyncSection />
          <CapabilitiesGrid />
          <TeamSection />
        </div>
        <div className={activeTab === "explorer" ? undefined : "hidden"}>
          <ConnectorVideoSection />
          <ResonaExplorerSection />
        </div>
        <CtaSection activeTab={activeTab} />
      </main>
      <Footer />
    </div>
  );
}
