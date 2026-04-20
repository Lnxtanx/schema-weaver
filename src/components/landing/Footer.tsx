import { Database, Github, Linkedin, Twitter } from "lucide-react";

const cols = [
  {
    title: "Schema Weaver",
    links: [
      ["Overview", "#"],
      ["SQL Editor", "https://sql-editor.schemaweaver.vivekmind.com"],
      ["Data Explorer", "https://data-explorer.schemaweaver.vivekmind.com"],
      ["Resona AI", "#resona-ai"],
      ["Documentation", "#"],
      ["Pricing", "#"],
      ["Changelog", "#"],
    ],
  },
  {
    title: "More Products",
    links: [
      ["FairyForge", "#"],
      ["VivekMind Press", "#"],
      ["Resona AI Research", "#"],
      ["Cloop", "#"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "#"],
      ["Blog", "#"],
      ["Careers", "#"],
      ["Press kit", "#"],
      ["Support", "#"],
      ["Contact", "#"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "#"],
      ["Terms", "#"],
      ["Security", "#"],
      ["DPA", "#"],
      ["Subprocessors", "#"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-5 gap-10">
        {/* Brand col */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-mesh)" }}>
              <Database className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold text-lg">VivekMind</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Infrastructure for the next generation of technical teams. Building tools that respect
            your craft, your data, and your time.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-foreground/80">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} VivekMind, Inc. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}