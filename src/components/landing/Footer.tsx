import { Link } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
} from "lucide-react";

const cols = [
  {
    title: "Schema Weaver",
    links: [
      ["Overview", "/"],
      ["Data Explorer", "https://data-explorer.schemaweaver.dev"],
      ["SQL Editor", "https://sql-editor.schemaweaver.dev"],
      ["Documentation", "https://docs.schemaweaver.dev"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Company",
    links: [
      ["News", "/blog"],
      ["Support", "/support"],
      ["VivekMind", "https://vivekmind.com"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Refund Policy", "/refund-policy"],
      ["Cancellation Policy", "/cancellation-policy"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1e293b]/70 bg-[#090d16] text-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
        {/* Brand col */}
        <div className="sm:col-span-2">
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-7 h-7 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <img
                src="/resona.png"
                alt="Schema Weaver"
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Schema Weaver
            </span>
          </Link>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
            The first voice-native analytics workspace for PostgreSQL. Explore
            live data, query by voice, and understand your schemas.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://github.com/schema-weaver"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/schemaweaver"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.reddit.com/r/schemaweaver/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reddit"
              className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.21.06.427.06.646 0 2.734-3.516 4.95-7.85 4.95-4.334 0-7.85-2.216-7.85-4.95 0-.219.022-.435.062-.645a1.736 1.736 0 0 1-1.097-1.597c0-.968.786-1.754 1.754-1.754.463 0 .875.18 1.183.466 1.17-.834 2.8-1.397 4.59-1.477l.799-3.747 2.72.574c.02-.676.58-1.216 1.256-1.216zM9.01 13.035c-.639 0-1.15.509-1.15 1.14 0 .63.511 1.141 1.15 1.141.64 0 1.15-.51 1.15-1.14 0-.63-.51-1.14-1.15-1.14zm5.98 0c-.639 0-1.15.509-1.15 1.14 0 .63.511 1.141 1.15 1.141.64 0 1.15-.51 1.15-1.14 0-.63-.51-1.14-1.15-1.14zm-5.98 2.498c-.147 0-.267.119-.267.266 0 .308.558.556 1.247.556.147 0 .267-.12.267-.267 0-.147-.12-.266-.267-.266-.69 0-1.247-.248-1.247-.556zm5.98 0c-.147 0-.267.119-.267.266 0 .308.558.556 1.247.556.147 0 .267-.12.267-.267 0-.147-.12-.266-.267-.266-.69 0-1.247-.248-1.247-.556z" />
              </svg>
            </a>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Schema Weaver. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
