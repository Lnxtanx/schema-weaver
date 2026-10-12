import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { fetchBlogPosts, fetchBlogCategories, type BlogPost, API_BASE } from "@/lib/api/blog";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  WifiOff,
  RefreshCw,
  AlertTriangle,
  Mail,
  ArrowUpRight,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { z } from "zod";
import { breadcrumbList } from "@/lib/seo/site";

const SITE_URL = "https://schemaweaver.dev";

const blogSearchSchema = z.object({
  page: z.string().optional(),
  category: z.string().optional(),
});

/* ── Blog Index Loading Skeleton ─────────────────────────────────── */
function BlogIndexSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Skeleton */}
        <section className="mx-auto max-w-7xl px-6 pt-8 pb-12 lg:px-8">
          <div className="h-4 w-40 rounded-full bg-muted animate-pulse mb-4" />
          <div className="h-10 w-96 max-w-full rounded-lg bg-muted animate-pulse mb-4" />
          <div className="h-5 w-2/3 max-w-xl rounded-md bg-muted/70 animate-pulse" />
        </section>

        {/* Subscribe Banner Skeleton */}
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="h-4 w-36 rounded bg-muted animate-pulse" />
                <div className="h-3 w-56 rounded bg-muted/60 animate-pulse" />
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-64 rounded-lg bg-muted animate-pulse" />
                <div className="h-10 w-28 rounded-lg bg-muted animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Skeleton */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <div className="h-7 w-16 rounded-full bg-muted animate-pulse" />
              <div className="h-7 w-24 rounded-full bg-muted/80 animate-pulse" />
              <div className="h-7 w-28 rounded-full bg-muted/80 animate-pulse" />
              <div className="h-7 w-20 rounded-full bg-muted/80 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Post Grid Skeleton (6 cards) */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-card p-4 space-y-4"
                >
                  <div className="aspect-video w-full rounded-xl bg-muted/70 animate-pulse" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-20 rounded-full bg-muted animate-pulse" />
                      <div className="h-3 w-16 rounded bg-muted/60 animate-pulse" />
                    </div>
                    <div className="h-5 w-5/6 rounded bg-muted animate-pulse" />
                    <div className="h-4 w-full rounded bg-muted/60 animate-pulse" />
                    <div className="h-4 w-4/6 rounded bg-muted/60 animate-pulse" />
                  </div>
                  <div className="pt-3 border-t border-border/50 flex justify-between items-center">
                    <div className="h-3 w-24 rounded bg-muted/60 animate-pulse" />
                    <div className="h-3 w-16 rounded bg-muted/60 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ── Blog Index Error Component ──────────────────────────────────── */
function BlogIndexError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-28 pb-16">
        <div className="max-w-md w-full text-center rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <WifiOff className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            News Service Unavailable
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            We could not connect to the Schema Weaver news API. The backend service may currently be offline.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Connection
            </button>
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/blog/")({
  validateSearch: (search) => blogSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Newsroom — Schema Weaver" },
      {
        name: "description",
        content:
          "Official news, product announcements, engineering deep-dives, and product updates from the Schema Weaver team on voice-native PostgreSQL analytics.",
      },
      { property: "og:title", content: "Newsroom — Schema Weaver" },
      {
        property: "og:description",
        content:
          "Official news, product announcements, engineering deep-dives, and product updates from the Schema Weaver team on voice-native PostgreSQL analytics.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: `${SITE_URL}/resona.png` },
      { property: "og:image:width", content: "300" },
      { property: "og:image:height", content: "300" },
      {
        property: "og:image:alt",
        content: "Schema Weaver Newsroom",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Newsroom — Schema Weaver" },
      {
        name: "twitter:description",
        content:
          "Official news, product announcements, engineering deep-dives, and product updates from the Schema Weaver team on voice-native PostgreSQL analytics.",
      },
      { name: "twitter:image", content: `${SITE_URL}/resona.png` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/blog` },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Schema Weaver Newsroom",
        href: `${SITE_URL}/rss.xml`,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Schema Weaver Newsroom",
          url: `${SITE_URL}/blog`,
          description:
            "Official news, product announcements, engineering deep-dives, and product updates from the Schema Weaver team on voice-native PostgreSQL analytics.",
          publisher: {
            "@type": "Organization",
            name: "Schema Weaver",
            url: SITE_URL,
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Newsroom", path: "/blog" },
          ]),
        ),
      },
    ],
  }),
  loader: async (ctx: any) => {
    const s = ctx.search || {};
    const page = s.page ? parseInt(s.page) : 1;
    const category = s.category;

    const [postsData, categories] = await Promise.all([
      fetchBlogPosts(page, 9, category),
      fetchBlogCategories(),
    ]);

    return {
      posts: postsData.posts,
      pagination: postsData.pagination,
      categories,
      isOffline: Boolean(postsData.isOffline),
    };
  },
  pendingComponent: BlogIndexSkeleton,
  errorComponent: BlogIndexError,
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { posts, pagination, categories, isOffline } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const router = useRouter();

  const s = search as any;
  const currentPage = s.page ? parseInt(s.page as string) : 1;
  const currentCategory = s.category as string | undefined;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Newsroom Hero (Anthropic Style) */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 sm:pt-10 pb-10 sm:pb-14 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: Title & Subtitle */}
            <div className="lg:col-span-6 xl:col-span-7">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-display">
                Newsroom
              </h1>
              <p className="mt-3 sm:mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                Official announcements, engineering deep-dives, and product releases from the Schema Weaver team.
              </p>
            </div>

            {/* Right: Inquiries & Resources (Anthropic Newsroom style) */}
            <div className="lg:col-span-6 xl:col-span-5 w-full">
              <div className="divide-y divide-border border-y border-border text-sm">
                <div className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="text-muted-foreground font-medium text-xs sm:text-sm">Press inquiries</span>
                  <a
                    href="mailto:support@schemaweaver.dev"
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-foreground hover:text-primary transition-colors font-mono text-xs sm:text-sm group"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    <span>support@schemaweaver.dev</span>
                  </a>
                </div>

                <div className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="text-muted-foreground font-medium text-xs sm:text-sm">Non-media inquiries</span>
                  <Link
                    to="/support"
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-foreground hover:text-primary transition-colors font-medium text-xs sm:text-sm group"
                  >
                    <HelpCircle className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    <span>How to get support</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </div>

                <div className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="text-muted-foreground font-medium text-xs sm:text-sm">Documentation</span>
                  <a
                    href="https://docs.schemaweaver.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-foreground hover:text-primary transition-colors font-medium text-xs sm:text-sm group"
                  >
                    <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    <span>Explore documentation</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <BlogSubscribe />
          </div>
        </section>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <section className="border-t border-border">
            <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigate({ to: "/blog" })}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    !currentCategory
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                {categories.map((cat: { name: string; count: number }) => (
                  <button
                    key={cat.name}
                    onClick={() => navigate({ to: "/blog", search: { category: cat.name } })}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      currentCategory === cat.name
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)} ({cat.count})
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            {/* Offline Alert Notice if backend is down */}
            {isOffline && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <WifiOff className="h-5 w-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Backend API is currently offline</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Could not retrieve articles from {API_BASE || "the API endpoint"}. Showing cached layout.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.invalidate()}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/30 bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer self-start sm:self-center"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry Connection
                </button>
              </div>
            )}

            {posts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-2xl">
                {isOffline ? (
                  <>
                    <AlertTriangle className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                    <p className="text-base font-semibold text-foreground">Unable to load news updates</p>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                      The backend API service is offline. Please start the server or verify your connection.
                    </p>
                    <button
                      onClick={() => router.invalidate()}
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Try Reconnecting
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground">No news updates found in this category.</p>
                    <button
                      onClick={() => navigate({ to: "/blog" })}
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline cursor-pointer"
                    >
                      View all news →
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post: BlogPost) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-3">
                {currentPage > 1 && (
                  <Link
                    to="/blog"
                    search={{ page: String(currentPage - 1), category: currentCategory }}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    ← Previous
                  </Link>
                )}
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                {currentPage < pagination.totalPages && (
                  <Link
                    to="/blog"
                    search={{ page: String(currentPage + 1), category: currentCategory }}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    Next →
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-lg">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="flex flex-col h-full">
        {post.thumbnail_url && (
          <div className="aspect-video overflow-hidden rounded-xl bg-muted">
            <img
              src={post.thumbnail_url}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="mt-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {post.category}
            </span>
            {formattedDate && (
              <>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{formattedDate}</span>
              </>
            )}
          </div>
          <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug font-display">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border/50">
            <span>By {post.author_name?.replace(/VivekMind/gi, "Schema Weaver") || "Schema Weaver Team"}</span>
            <span className="font-medium text-primary group-hover:translate-x-0.5 transition-transform">
              Read update →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
