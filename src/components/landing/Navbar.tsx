import { Link, useLocation } from "@tanstack/react-router";
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
  Database,
  Terminal,
  BookOpen,
  Globe,
  ArrowRight,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    title: "Data Explorer",
    description: "AI workspace, live data grids & automated chart synthesis.",
    href: "https://data-explorer.schemaweaver.dev",
    icon: Database,
    isExternal: true,
  },
  {
    title: "SQL Editor",
    description: "Multi-file editor with schema compiler & live ER diagrams.",
    href: "https://sql-editor.schemaweaver.dev",
    icon: Terminal,
    isExternal: true,
  },
  {
    title: "Documentation",
    description: "Guides, architecture specs, tutorials & developer docs.",
    href: "https://docs.schemaweaver.dev",
    icon: BookOpen,
    isExternal: true,
  },
  {
    title: "VivekMind",
    description: "AI systems, developer tools & cloud infrastructure.",
    href: "https://vivekmind.com",
    icon: Globe,
    isExternal: true,
  },
];



export function Navbar() {
  const location = useLocation();
  const pathname = location?.pathname || "";

  const isPricingActive = pathname === "/pricing";
  const isCompareActive = pathname === "/compare";
  const isSupportActive = pathname === "/support";
  const isNewsActive = pathname.startsWith("/blog");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-xs">
      {/* Orange Live Demo Announcement Header Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white px-3 sm:px-4 py-1.5 text-xs text-center font-medium flex items-center justify-center gap-1.5 sm:gap-2 shadow-inner border-b border-orange-500/30">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span className="hidden sm:inline">Try Schema Weaver instantly on our live 24/7 PostgreSQL database — no sign-up required.</span>
        <span className="sm:hidden text-[11px]">Live PostgreSQL demo online.</span>
        <a
          href="https://data-explorer.schemaweaver.dev?demo=true"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold hover:text-orange-100 ml-1 inline-flex items-center gap-0.5 cursor-pointer text-[11px] sm:text-xs"
        >
          Launch Demo <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-7 h-7 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <img
                src="/resona.png"
                alt="Schema Weaver"
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              Schema Weaver
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Menu (Mega-Menu) */}
        <div className="hidden md:flex items-center justify-center flex-1 px-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {/* Products Mega-Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[380px] p-2 flex flex-col bg-card">
                    <div className="flex flex-col gap-1">
                      {products.map((item) => {
                        const Icon = item.icon;
                        const inner = (
                          <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/70 transition-colors group text-left cursor-pointer">
                            <div className="w-8 h-8 rounded-md bg-muted/60 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                  {item.title}
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        );

                        return item.isExternal ? (
                          <a
                            key={item.title}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block no-underline"
                          >
                            {inner}
                          </a>
                        ) : (
                          <Link
                            key={item.title}
                            to={item.href}
                            className="block no-underline"
                          >
                            {inner}
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-1 pt-1.5 border-t border-border/50">
                      <Link
                        to="/compare"
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-medium"
                      >
                        <span>Compare all tools</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/60" />
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
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer transition-all",
                      isPricingActive
                        ? "text-primary font-semibold bg-primary/10 hover:bg-primary/15 hover:text-primary"
                        : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer transition-all",
                      isCompareActive
                        ? "text-primary font-semibold bg-primary/10 hover:bg-primary/15 hover:text-primary"
                        : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer transition-all",
                      isSupportActive
                        ? "text-primary font-semibold bg-primary/10 hover:bg-primary/15 hover:text-primary"
                        : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    Support
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/blog"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer transition-all",
                      isNewsActive
                        ? "text-primary font-semibold bg-primary/10 hover:bg-primary/15 hover:text-primary"
                        : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    News
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
          </div>

          <Button
            size="sm"
            asChild
            className="hidden md:inline-flex cursor-pointer text-xs font-semibold border border-blue-500/40 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 rounded-lg transition-all"
          >
            <a
              href="https://calendar.app.google/1BLuy4FkJwWGLcwFA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              Book Demo
            </a>
          </Button>

          <Button
            size="sm"
            asChild
            className="hidden sm:inline-flex cursor-pointer border border-orange-500/40 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold rounded-lg shadow-md shadow-orange-950/20 transition-all"
          >
            <a
              href="https://data-explorer.schemaweaver.dev?demo=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try Live Demo
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
                  <SheetTitle className="mt-4">
                    <Link
                      to="/"
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                      }}
                      className="flex items-center gap-3"
                    >
                      <img
                        src="/resona.png"
                        alt="Schema Weaver"
                        className="w-7 h-7 object-contain"
                      />
                      <span className="font-display font-bold text-xl tracking-tight text-foreground">
                        Schema Weaver
                      </span>
                    </Link>
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
                      <AccordionContent className="pb-3 pt-1 flex flex-col gap-1">
                        {products.map((p) => {
                          const Icon = p.icon;
                          const inner = (
                            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/60 transition-colors">
                              <div className="w-8 h-8 rounded-md bg-muted/60 flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-sm text-foreground">
                                    {p.title}
                                  </span>
                                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                                </div>
                                <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                                  {p.description}
                                </p>
                              </div>
                            </div>
                          );
                          return p.isExternal ? (
                            <a
                              key={p.title}
                              href={p.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="no-underline"
                            >
                              {inner}
                            </a>
                          ) : (
                            <Link key={p.title} to={p.href} className="no-underline">
                              {inner}
                            </Link>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>

                  <Link
                    to="/pricing"
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between",
                      isPricingActive
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    <span>Pricing</span>
                    {isPricingActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                  <Link
                    to="/compare"
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between",
                      isCompareActive
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    <span>Compare</span>
                    {isCompareActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                  <Link
                    to="/support"
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between",
                      isSupportActive
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    <span>Support</span>
                    {isSupportActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                  <Link
                    to="/blog"
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between",
                      isNewsActive
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    <span>News</span>
                    {isNewsActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                  <a
                    href="https://docs.schemaweaver.dev"
                    className="py-2.5 px-3 rounded-lg text-base font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
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
                      asChild
                      className="w-full h-11 border border-blue-500/40 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 font-semibold"
                    >
                      <a
                        href="https://calendar.app.google/1BLuy4FkJwWGLcwFA"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                        Book a Demo
                      </a>
                    </Button>
                    <Button asChild className="w-full h-11 border border-orange-500/40 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold shadow-md shadow-orange-950/20">
                      <a
                        href="https://data-explorer.schemaweaver.dev?demo=true"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Try Live Demo
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
