import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FeedbackDialog } from "@/components/marketing/FeedbackDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MessageSquare } from "lucide-react";

export function Navbar() {
  const NavLinks = () => (
    <>
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
        to="/compare"
        activeProps={{ className: "text-foreground" }}
        className="hover:text-foreground transition-colors"
      >
        Compare
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
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border/40">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
            >
              <img src="/resona.png" alt="Schema Weaver" className="w-5 h-5 object-contain" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight">
              Schema Weaver
            </span>
          </Link>
          <a 
            href="https://vivekmind.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:inline text-xs text-muted-foreground border border-border rounded-md px-1.5 py-0.5 ml-1 hover:text-primary hover:border-primary/40 transition-all"
          >
            by VivekMind
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
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
          </div>

          <Button variant="hero" size="sm" asChild className="hidden md:inline-flex">
            <a href="https://sql-editor.schemaweaver.vivekmind.com">Launch Editor</a>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card border-border">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2 mt-4">
                    <img src="/resona.png" alt="" className="w-6 h-6 object-contain" />
                    <span className="font-display font-bold">Schema Weaver</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-10 text-lg font-medium text-muted-foreground">
                  <NavLinks />
                  <div className="h-px bg-border my-2" />
                  <div className="flex flex-col gap-4">
                    <FeedbackDialog 
                      trigger={
                        <Button variant="ghost" className="justify-start gap-3 w-full h-12">
                          <MessageSquare className="w-5 h-5" />
                          Feedback
                        </Button>
                      }
                    />
                    <Button variant="ghost" asChild className="justify-start w-full h-12">
                      <a href="https://sql-editor.schemaweaver.vivekmind.com">Sign in</a>
                    </Button>
                    <Button variant="hero" asChild className="w-full h-12">
                      <a href="https://sql-editor.schemaweaver.vivekmind.com">Launch Editor</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}