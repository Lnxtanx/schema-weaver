import { createFileRoute } from "@tanstack/react-router";
import { fetchAllBlogPosts } from "@/lib/api/blog";
import { STATIC_ROUTES, absoluteUrl, SITE_URL } from "@/lib/seo/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLastmod(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function urlEntry(
  loc: string,
  options: {
    lastmod?: string | null;
    changefreq?: string;
    priority?: number;
  } = {},
): string {
  const lines = [`    <loc>${escapeXml(loc)}</loc>`];
  if (options.lastmod) lines.push(`    <lastmod>${options.lastmod}</lastmod>`);
  if (options.changefreq)
    lines.push(`    <changefreq>${options.changefreq}</changefreq>`);
  if (options.priority !== undefined)
    lines.push(`    <priority>${options.priority.toFixed(1)}</priority>`);
  return `  <url>\n${lines.join("\n")}\n  </url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { posts } = await fetchAllBlogPosts();

        const staticEntries = STATIC_ROUTES.map((route) =>
          urlEntry(absoluteUrl(route.path), {
            changefreq: route.changefreq,
            priority: route.priority,
          }),
        );

        const postEntries = posts.map((post) =>
          urlEntry(absoluteUrl(`/blog/${post.slug}`), {
            lastmod: toLastmod(post.updated_at) ?? toLastmod(post.published_at),
            changefreq: "monthly",
            priority: 0.7,
          }),
        );

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...staticEntries,
          ...postEntries,
          "</urlset>",
          "",
        ].join("\n");

        return new Response(xml, {
          status: 200,
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
