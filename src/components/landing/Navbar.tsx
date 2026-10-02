import { useState, useEffect } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Menu,
  MessageSquare,
  Sun,
  Moon,
  Database,
  Terminal,
  Sparkles,
  RefreshCw,
  Workflow,
  ShieldCheck,
  BarChart3,
  Users,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    title: "Data Explorer",
    badge: "Primary",
    description:
      "Agentic AI SQL workspace, live data grids & auto-generated AI charts.",
    href: "https://data-explorer.schemaweaver.dev",
    icon: Database,
    isExternal: true,
  },
  {
    title: "SQL Editor",
    description:
      "Multi-file editor with 20-layer Schema Compiler & live ER diagrams.",
    href: "https://sql-editor.schemaweaver.dev",
    icon: Terminal,
    isExternal: true,
  },
  {
    title: "Resona AI Engine",
    description:
      "Flash & Deep reasoning modes for autonomous natural-language SQL.",
    href: "/#resona",
    icon: Sparkles,
    isExternal: false,
  },
  {
    title: "Schema Migrations",
    description:
      "Pull / Diff / Push pipeline with transaction rollback & drift detection.",
    href: "/#sync",
    icon: RefreshCw,
    isExternal: false,
  },
];

const solutions = [
  {
    title: "Visual Schema Design",
    description:
      "Interactive live ER diagrams with 16 node types, auto-clustering & FK paths.",
    href: "/#er-diagram",
    icon: Workflow,
  },
  {
    title: "Safe Database Migrations",
    description:
      "Zero-downtime multi-phase migrations with hash-chain audit logging.",
    href: "/#sync",
    icon: ShieldCheck,
  },
  {
    title: "Natural-Language Analytics",
    description:
      "Turn plain English into complex PostgreSQL queries with instant exports.",
    href: "/#data-explorer",
    icon: BarChart3,
  },
  {
    title: "Team Database Governance",
    description:
      "Per-seat workspaces, role-based access, and shared database connections.",
    href: "/#team",
    icon: Users,
  },
];

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const ThemeToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-9 h-9 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border/40">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/resona.png"
                alt="Schema Weaver"
                className="w-5 h-5 object-contain"
              />
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

        {/* Desktop Navigation Menu (Mega-Menu) */}
        <div className="hidden md:flex items-center justify-center flex-1 px-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {/* Products Mega-Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[680px] p-0 flex flex-col bg-card">
                    <div className="p-4 grid grid-cols-12 gap-4">
                      {/* Featured Highlight Card */}
                      <div className="col-span-5 rounded-xl bg-muted/70 dark:bg-muted/40 border border-primary/25 p-4 flex flex-col justify-between">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-semibold tracking-wider uppercase font-mono mb-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                            Primary Workspace
                          </div>
                          <h4 className="font-display font-bold text-base text-foreground tracking-tight">
                            Data Explorer
                          </h4>
                          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                            The complete AI data workspace for PostgreSQL. Query
                            in natural language, build AI charts, and explore
                            live schemas.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-primary/20">
                          <a
                            href="https://data-explorer.schemaweaver.dev"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
                          >
                            Launch Data Explorer
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </a>
                        </div>
                      </div>

                      {/* Product Links */}
                      <div className="col-span-7 flex flex-col justify-between gap-1">
                        {products.map((item) => {
                          const Icon = item.icon;
                          const inner = (
                            <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-muted/60 transition-colors group text-left">
                              <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0 mt-0.5">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                                  {item.title}
                                  {item.badge && (
                                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-primary/15 text-primary font-semibold">
                                      {item.badge}
                                    </span>
                                  )}
                                  {item.isExternal && (
                                    <ExternalLink className="w-3 h-3 text-muted-foreground/40 ml-0.5" />
                                  )}
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          );

                          return item.isExternal ? (
                            <a key={item.title} href={item.href}>
                              {inner}
                            </a>
                          ) : (
                            <Link key={item.title} to={item.href}>
                              {inner}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Utility Bar */}
                    <div className="bg-muted/80 dark:bg-muted/50 border-t border-border px-4 py-2.5 rounded-b-2xl flex items-center justify-between text-xs text-muted-foreground">
                      <span>Looking for guides & documentation?</span>
                      <div className="flex items-center gap-3.5">
                        <a
                          href="https://docs.schemaweaver.dev"
                          className="hover:text-primary transition-colors flex items-center gap-1 font-medium"
                        >
                          Documentation <ExternalLink className="w-3 h-3" />
                        </a>
                        <Link
                          to="/compare"
                          className="hover:text-primary transition-colors font-medium"
                        >
                          Compare Tools →
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Solutions Mega-Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[580px] p-0 flex flex-col bg-card">
                    <div className="p-4 grid grid-cols-2 gap-2.5">
                      {solutions.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            to={item.href}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-muted/60 transition-colors group border border-transparent hover:border-border/60 text-left"
                          >
                            <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                                {item.title}
                              </div>
                              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Bottom Utility Bar */}
                    <div className="bg-muted/80 dark:bg-muted/50 border-t border-border px-4 py-2.5 rounded-b-2xl flex items-center justify-between text-xs text-muted-foreground">
                      <span>Need custom VPC peering or enterprise SLAs?</span>
                      <Link
                        to="/support"
                        className="hover:text-primary transition-colors flex items-center gap-1 font-medium text-foreground"
                      >
                        Contact Enterprise Sales{" "}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Direct Links */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/pricing"
                    activeProps={{ className: "text-foreground font-semibold" }}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent cursor-pointer",
                    )}
                  >
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/compare"
                    activeProps={{ className: "text-foreground font-semibold" }}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent cursor-pointer",
                    )}
                  >
                    Compare
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/support"
                    activeProps={{ className: "text-foreground font-semibold" }}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent cursor-pointer",
                    )}
                  >
                    Support
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="https://docs.schemaweaver.dev"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent cursor-pointer",
                    )}
                  >
                    Docs
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <FeedbackDialog
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Feedback
                </Button>
              }
            />
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:inline-flex cursor-pointer"
            >
              <a href="https://data-explorer.schemaweaver.dev">Sign in</a>
            </Button>
          </div>

          <ThemeToggle />

          <Button
            variant="hero"
            size="sm"
            asChild
            className="hidden md:inline-flex"
          >
            <a href="https://data-explorer.schemaweaver.dev">
              Launch Data Explorer
            </a>
          </Button>

          {/* Mobile Menu Drawer */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] bg-card border-border overflow-y-auto"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2 mt-4">
                    <img
                      src="/resona.png"
                      alt=""
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-display font-bold">
                      Schema Weaver
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 mt-6 text-sm">
                  {/* Accordion for Products and Solutions */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value="products"
                      className="border-b border-border/60"
                    >
                      <AccordionTrigger className="text-base font-semibold py-3 text-foreground hover:no-underline">
                        Products
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 pt-1 flex flex-col gap-1.5">
                        {products.map((p) => {
                          const Icon = p.icon;
                          const inner = (
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                              <div className="flex items-center gap-2.5">
                                <Icon className="w-4 h-4 text-primary" />
                                <span className="font-medium text-sm">
                                  {p.title}
                                </span>
                              </div>
                              {p.isExternal && (
                                <ExternalLink className="w-3 h-3 opacity-60" />
                              )}
                            </div>
                          );
                          return p.isExternal ? (
                            <a key={p.title} href={p.href}>
                              {inner}
                            </a>
                          ) : (
                            <Link key={p.title} to={p.href}>
                              {inner}
                            </Link>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="solutions"
                      className="border-b border-border/60"
                    >
                      <AccordionTrigger className="text-base font-semibold py-3 text-foreground hover:no-underline">
                        Solutions
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 pt-1 flex flex-col gap-1.5">
                        {solutions.map((s) => {
                          const Icon = s.icon;
                          return (
                            <Link
                              key={s.title}
                              to={s.href}
                              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                            >
                              <Icon className="w-4 h-4 text-secondary" />
                              <span className="font-medium text-sm">
                                {s.title}
                              </span>
                            </Link>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Link
                    to="/pricing"
                    className="py-2.5 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/compare"
                    className="py-2.5 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Compare
                  </Link>
                  <Link
                    to="/support"
                    className="py-2.5 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Support
                  </Link>
                  <a
                    href="https://docs.schemaweaver.dev"
                    className="py-2.5 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Docs
                  </a>

                  <div className="h-px bg-border my-2" />

                  <div className="flex flex-col gap-3">
                    <FeedbackDialog
                      trigger={
                        <Button
                          variant="ghost"
                          className="justify-start gap-3 w-full h-11"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Feedback
                        </Button>
                      }
                    />
                    <Button
                      variant="ghost"
                      asChild
                      className="justify-start w-full h-11"
                    >
                      <a href="https://data-explorer.schemaweaver.dev">
                        Sign in
                      </a>
                    </Button>
                    <Button variant="hero" asChild className="w-full h-11">
                      <a href="https://data-explorer.schemaweaver.dev">
                        Launch Data Explorer
                      </a>
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
