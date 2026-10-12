import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { name: "theme-color", content: "#090d16" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      {
        title:
          "Schema Weaver — The First Voice-Native Analytics Workspace for PostgreSQL",
      },
      {
        name: "description",
        content:
          "Schema Weaver is the first voice-native analytics workspace for PostgreSQL. Browse live data in high-performance grids, talk to your database by voice, query in plain English, and generate instant AI charts.",
      },
      {
        property: "og:title",
        content:
          "Schema Weaver — The First Voice-Native Analytics Workspace for PostgreSQL",
      },
      {
        property: "og:description",
        content:
          "The first voice-native analytics workspace for PostgreSQL. Explore live data, query by voice, and design schemas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Schema Weaver — The First Voice-Native Analytics Workspace for PostgreSQL",
      },
      {
        name: "twitter:description",
        content:
          "The first voice-native analytics workspace for PostgreSQL. Explore live data, query by voice, and design schemas.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;600&display=swap",
      },
    ],
    scripts: [
      {
        children: `
          (function() {
            try {
              if (window.location.hostname === 'schemaweaver.vivekmind.com') {
                window.location.replace('https://schemaweaver.dev' + window.location.pathname + window.location.search + window.location.hash);
                return;
              }
              document.documentElement.classList.add('dark');
              localStorage.setItem('theme', 'dark');
            } catch (e) {}
          })();
        `,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster
        richColors
        position="bottom-right"
        closeButton
        theme="dark"
        className="!bottom-[max(1rem,env(safe-area-inset-bottom))]"
      />
    </>
  );
}
