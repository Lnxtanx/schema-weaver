import { createFileRoute } from "@tanstack/react-router";
import { fetchAllBlogPosts, type BlogPost } from "@/lib/api/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toUTCString();
}

function itemXml(post: BlogPost): string {
  const link = absoluteUrl(`/blog/${post.slug}`);
  const pubDate = toRfc822(post.published_at) ?? new Date().toUTCString();
  const description = post.excerpt || post.meta_description || post.title;
  const author = (post.author_name || `${SITE_NAME} Team`).replace(
    /VivekMind/gi,
    SITE_NAME,
  );

  return [
    "    <item>",
    `      <title>${escapeXml(post.title)}</title>`,
    `      <link>${escapeXml(link)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
    `      <pubDate>${pubDate}</pubDate>`,
    `      <description>${escapeXml(description)}</description>`,
    `      <author>${escapeXml(author)}</author>`,
    post.category
      ? `      <category>${escapeXml(post.category)}</category>`
      : null,
    "    </item>",
  ]
    .filter(Boolean)
    .join("\n");
}

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { posts } = await fetchAllBlogPosts();

        const sorted = [...posts]
          .sort(
            (a, b) =>
              new Date(b.published_at ?? b.created_at).getTime() -
              new Date(a.published_at ?? a.created_at).getTime(),
          )
          .slice(0, 50);

        const lastBuildDate =
          toRfc822(sorted[0]?.published_at) ?? new Date().toUTCString();

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
          "  <channel>",
          `    <title>${escapeXml(`${SITE_NAME} — Newsroom`)}</title>`,
          `    <link>${absoluteUrl("/blog")}</link>`,
          `    <description>${escapeXml(
            "Official announcements, engineering deep-dives, and product releases from the Schema Weaver team.",
          )}</description>`,
          "    <language>en-us</language>",
          `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
          `    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />`,
          ...sorted.map(itemXml),
          "  </channel>",
          "</rss>",
          "",
        ].join("\n");

        return new Response(xml, {
          status: 200,
          headers: {
            "content-type": "application/rss+xml; charset=utf-8",
            "cache-control": "public, max-age=1800, s-maxage=1800",
          },
        });
      },
    },
  },
});
