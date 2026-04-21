import { Section } from "./Section";
import { Quote } from "lucide-react";

const quotes = [
  {
    body: "We replaced DBeaver and a bespoke migration runner with Schema Weaver in a single afternoon. The compiler caught three potential production incidents in our first week.",
    author: "Arjun Mehta",
    role: "Lead Database Engineer",
  },
  {
    body: "The Dijkstra-powered path analysis is a game-changer for our junior devs. They can finally understand the 400-table schema without asking me for JOIN paths every hour.",
    author: "Sneha Nair",
    role: "CTO, Fintech Solutions",
  },
  {
    body: "Finally, an ER diagram that isn't just a static SVG. Being able to anchor Resona AI to a specific table to generate RLS policies is like having a DBA on demand.",
    author: "Rohan Gupta",
    role: "Backend Architect",
  },
];

export function Testimonials() {
  return (
    <Section
      eyebrow="Customers"
      title={
        <>
          Loved by the people <br />
          <span className="text-gradient-mesh">who actually own the database.</span>
        </>
      }
    >
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {quotes.map((q) => (
          <figure key={q.author} className="rounded-2xl border border-border bg-card p-7 flex flex-col">
            <Quote className="w-6 h-6 text-primary/60" />
            <blockquote className="mt-4 text-base leading-relaxed text-foreground/90 flex-1">
              "{q.body}"
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-border">
              <div className="font-semibold">{q.author}</div>
              <div className="text-xs text-muted-foreground">{q.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}