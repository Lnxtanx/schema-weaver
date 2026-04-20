import { Section } from "./Section";
import { Quote } from "lucide-react";

const quotes = [
  {
    body: "We replaced DBeaver, dbdiagram.io, and a bespoke migration runner with Schema Weaver in a single afternoon. The compiler caught two production-bound bugs in our first hour.",
    author: "Priya N.",
    role: "Staff Engineer, FairyForge",
  },
  {
    body: "Resona AI doesn't feel like a chatbot — it feels like a junior engineer who has actually read the codebase. It refactored our 60-table billing schema in one go.",
    author: "Marcus T.",
    role: "CTO, Resona Labs",
  },
  {
    body: "The Data Explorer is the first grid I've used that doesn't choke on our 200M-row event table. Smart column sizing alone saved my team hours per week.",
    author: "Linh D.",
    role: "Head of Data, VivekMind Press",
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