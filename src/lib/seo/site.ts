/**
 * Central SEO configuration and helpers.
 *
 * A single source of truth for the canonical origin, default metadata,
 * social share image, and structured-data builders used across routes.
 */

export const SITE_URL = "https://schemaweaver.dev";
export const SITE_NAME = "Schema Weaver";

export const DEFAULT_TITLE = "Schema Weaver — Voice-Native Analytics for PostgreSQL";

export const DEFAULT_DESCRIPTION =
  "Schema Weaver is the first voice-native analytics workspace for PostgreSQL. Browse live data, query by voice, and generate AI charts in seconds.";

export const OG_IMAGE = `${SITE_URL}/resona.png`;
export const OG_IMAGE_WIDTH = 300;
export const OG_IMAGE_HEIGHT = 300;
export const OG_IMAGE_ALT = "Schema Weaver logo";

export const FAVICON = `${SITE_URL}/favicon.ico`;
export const APPLE_TOUCH_ICON = `${SITE_URL}/resona.png`;

export const LOGO_URL = `${SITE_URL}/resona.png`;

export const TWITTER_HANDLE = "@schemaweaver";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export interface Breadcrumb {
  name: string;
  path: string;
}

/** Build a schema.org BreadcrumbList object from an ordered trail. */
export function breadcrumbList(items: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Static, indexable routes that are not blog posts.
 * Blog posts are appended dynamically by the sitemap route.
 */
export interface StaticRoute {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

export const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/compare", changefreq: "monthly", priority: 0.9 },
  { path: "/pricing", changefreq: "monthly", priority: 0.8 },
  { path: "/blog", changefreq: "daily", priority: 0.8 },
  { path: "/support", changefreq: "monthly", priority: 0.6 },
  { path: "/refund-policy", changefreq: "yearly", priority: 0.3 },
  { path: "/cancellation-policy", changefreq: "yearly", priority: 0.3 },
];
