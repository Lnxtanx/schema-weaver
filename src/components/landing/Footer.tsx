import { Database, Github, Linkedin, Twitter } from "lucide-react";

const cols = [
  {
    title: "Schema Weaver",
    links: [
      ["Overview", "/"],
      ["SQL Editor", "https://sql-editor.schemaweaver.vivekmind.com"],
      ["Data Explorer", "https://data-explorer.schemaweaver.vivekmind.com"],
      ["Documentation", "https://docs.schemaweaver.vivekmind.com"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Company",
    links: [
      ["VivekMind Home", "https://vivekmind.com"],
      ["About", "/about"],
      ["Support", "/support"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "https://vivekmind.com/privacy"],
      ["Terms of Service", "https://vivekmind.com/terms"],
      ["Refund Policy", "/refund-policy"],
      ["Cancellation Policy", "/cancellation-policy"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-5 gap-10">
        {/* Brand col */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="/resona.png" alt="Schema Weaver" className="w-5 h-5 object-contain" />
            </div>
            <span className="font-display font-semibold text-lg text-gradient-mesh">Schema Weaver</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
            The Agentic Operating System for PostgreSQL. Infrastructure for the next generation of technical teams.
          </p>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold">
            Built by VivekMind
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a href="https://twitter.com/Lnxtanx" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://github.com/lnxtanx" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/company/schema-weaver" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
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
        </div>
      </div>
    </footer>
  );
}