import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FeedbackDialog } from "@/components/marketing/FeedbackDialog";
import { MessageSquare } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border/40">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
          >
            <img src="/resona.png" alt="Schema Weaver" className="w-5 h-5 object-contain" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">
            Schema Weaver
          </span>
          <a 
            href="https://vivekmind.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:inline text-xs text-muted-foreground border border-border rounded-md px-1.5 py-0.5 ml-1 hover:text-primary hover:border-primary/40 transition-all"
          >
            by VivekMind
          </a>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground transition-colors"
          >
            Product
          </Link>
          <Link
            to="/pricing"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            to="/support"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground transition-colors"
          >
            Support
          </Link>
          <a
            href="https://docs.schemaweaver.vivekmind.com"
            className="hover:text-foreground transition-colors"
          >
            Docs
          </a>
        </div>

        <div className="flex items-center gap-2">
          <FeedbackDialog 
            trigger={
              <Button variant="ghost" size="sm" className="hidden lg:flex gap-2">
                <MessageSquare className="w-4 h-4" />
                Feedback
              </Button>
            }
          />
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
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