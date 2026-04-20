import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border/40">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-mesh)" }}>
            <Database className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">
            Schema Weaver
          </span>
          <span className="text-xs text-muted-foreground border border-border rounded-md px-1.5 py-0.5 ml-1">
            by VivekMind
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#sql-editor" className="hover:text-foreground transition-colors">SQL Editor</a>
          <a href="#data-explorer" className="hover:text-foreground transition-colors">Data Explorer</a>
          <a href="#resona-ai" className="hover:text-foreground transition-colors">Resona AI</a>
          <a href="#sync" className="hover:text-foreground transition-colors">Sync</a>
          <a href="#teams" className="hover:text-foreground transition-colors">Teams</a>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://sql-editor.schemaweaver.vivekmind.com">Sign in</a>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <a href="https://sql-editor.schemaweaver.vivekmind.com">Launch Editor</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}