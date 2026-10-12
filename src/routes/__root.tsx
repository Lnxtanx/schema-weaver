import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import {
  APPLE_TOUCH_ICON,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  FAVICON,
  LOGO_URL,
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/seo/site";

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
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "author", content: SITE_NAME },
      { title: DEFAULT_TITLE },
      {
        name: "description",
        content: DEFAULT_DESCRIPTION,
      },
      {
        property: "og:title",
        content: DEFAULT_TITLE,
      },
      {
        property: "og:description",
        content: DEFAULT_DESCRIPTION,
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: TWITTER_HANDLE },
      { name: "twitter:creator", content: TWITTER_HANDLE },
      {
        name: "twitter:title",
        content: DEFAULT_TITLE,
      },
      {
        name: "twitter:description",
        content: DEFAULT_DESCRIPTION,
      },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: FAVICON },
      { rel: "apple-touch-icon", href: APPLE_TOUCH_ICON },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Schema Weaver Newsroom",
        href: `${SITE_URL}/rss.xml`,
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
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: LOGO_URL,
            width: OG_IMAGE_WIDTH,
            height: OG_IMAGE_HEIGHT,
          },
          description: DEFAULT_DESCRIPTION,
          sameAs: [
            "https://github.com/schema-weaver",
            "https://linkedin.com/company/schemaweaver",
            "https://www.reddit.com/r/schemaweaver/",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          alternateName: "schemaweaver",
          url: SITE_URL,
          inLanguage: "en",
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        }),
      },
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
