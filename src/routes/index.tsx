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
import { AudienceSection } from "@/components/landing/AudienceSection";
import { Footer } from "@/components/landing/Footer";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/seo/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          DEFAULT_TITLE,
      },
      {
        name: "description",
        content: DEFAULT_DESCRIPTION,
      },
      {
        name: "keywords",
        content:
          "Schema Weaver, voice-native analytics, PostgreSQL analytics, voice database query, Resona AI, agentic SQL, PostgreSQL visualization, live data grid, schema compiler, ER diagrams",
      },
      {
        property: "og:title",
        content: DEFAULT_TITLE,
      },
      {
        property: "og:description",
        content: DEFAULT_DESCRIPTION,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://schemaweaver.dev/" },
      { property: "og:site_name", content: "Schema Weaver" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: DEFAULT_TITLE,
      },
      {
        name: "twitter:description",
        content: DEFAULT_DESCRIPTION,
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is Schema Weaver?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Schema Weaver is the first voice-native analytics and database workspace for PostgreSQL. It includes Data Explorer with Resona AI for speech-to-SQL, natural language reasoning, and automated charts, alongside a full SQL Editor with a 20-layer Schema Compiler and live ER diagrams.",
              },
            },
            {
              "@type": "Question",
              name: "Where does my data live? Does AI see my database rows?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Your row-level data never leaves your infrastructure. Queries execute locally or stream directly to your browser. AI models only reason over schema metadata and query summaries to formulate SQL and visual charts.",
              },
            },
            {
              "@type": "Question",
              name: "Can Schema Weaver accidentally modify or delete my PostgreSQL data?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "In Data Explorer, Resona AI enforces a strict AST-verified read-only gate that permanently blocks mutating statements such as DROP, DELETE, UPDATE, and INSERT. In the SQL Editor, developers retain full SQL authority with schema diff validation and safe DDL migration planning.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need to open inbound firewall ports to connect my database?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. You can connect using the pg-connector daemon (npm i -g @schema-weaver/pg-connector). It connects via an outbound-only TLS tunnel, requiring zero open inbound firewall ports or public IP exposure, and connection credentials never leave your machine.",
              },
            },
            {
              "@type": "Question",
              name: "Is there a free tier available?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Free is a permanent plan that includes 3,000 monthly AI credits, Flash and Deep modes, the full SQL Editor, live ER diagrams, the 20-layer Schema Compiler, shared database connections, and data grid export. A live demo is also accessible at https://data-explorer.schemaweaver.dev?demo=true with no sign-up required.",
              },
            },
            {
              "@type": "Question",
              name: "Which PostgreSQL versions and cloud providers are supported?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Schema Weaver supports PostgreSQL 12 through 16+, including Supabase, Neon, AWS RDS, DigitalOcean Managed Databases, Google Cloud SQL, Azure, Railway, Render, Timescale, and self-hosted Linux databases.",
              },
            },
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
          <AudienceSection />
        </div>
        <CtaSection activeTab={activeTab} />
      </main>
      <Footer />
    </div>
  );
}
