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
      { property: "og:title", content: "Schema Weaver — The Complete PostgreSQL Operating System" },
      {
        property: "og:description",
        content:
          "Design, visualize, migrate, and explore your PostgreSQL databases in a single AI-powered workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
