import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
  fetchBlogPost,
  fetchLatestPosts,
  type BlogPost,
  recordPostView,
  sendPostHeartbeat,
  recordPostShare,
  API_BASE,
} from "@/lib/api/blog";
import { useState, useEffect, useCallback, useRef } from "react";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { CommentList } from "@/components/blog/BlogComments";
import { BlogPostLikes } from "@/components/blog/BlogPostLikes";
import { getOrCreateAnalyticsIdentity } from "@/lib/api/analytics";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { WifiOff, RefreshCw, AlertTriangle, ArrowLeft } from "lucide-react";

const SITE_URL = "https://schemaweaver.dev";

/* ── Blog Post Loading Skeleton ──────────────────────────────────── */
function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <header className="mx-auto max-w-4xl px-6 pt-6 pb-10 lg:px-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-4 w-12 rounded bg-muted animate-pulse" />
            <span className="text-muted-foreground/40">/</span>
            <div className="h-4 w-12 rounded bg-muted animate-pulse" />
            <span className="text-muted-foreground/40">/</span>
            <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          </div>

          {/* Badges Skeleton */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="h-6 w-24 rounded-full bg-muted animate-pulse" />
            <div className="h-4 w-28 rounded bg-muted/60 animate-pulse" />
            <div className="h-4 w-16 rounded bg-muted/60 animate-pulse" />
          </div>

          {/* Title Skeleton */}
          <div className="h-10 w-4/5 rounded-lg bg-muted animate-pulse mb-3" />
          <div className="h-10 w-2/3 rounded-lg bg-muted animate-pulse mb-6" />

          {/* Excerpt Skeleton */}
          <div className="h-5 w-full rounded bg-muted/60 animate-pulse mb-2" />
          <div className="h-5 w-4/5 rounded bg-muted/60 animate-pulse mb-8" />

          {/* Author Row Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-y border-border/60 py-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-muted animate-pulse" />
              <div className="space-y-1.5">
                <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                <div className="h-3 w-20 rounded bg-muted/60 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-16 rounded-lg bg-muted animate-pulse" />
              <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
              <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
            </div>
          </div>
        </header>

        {/* Hero Image Skeleton */}
        <div className="mx-auto max-w-5xl px-6 lg:px-8 mb-10">
          <div className="aspect-video w-full rounded-2xl bg-muted/70 animate-pulse" />
        </div>

        {/* Article Body Skeleton */}
        <div className="mx-auto max-w-3xl px-6 py-6 lg:px-8 space-y-4">
          <div className="h-5 w-full rounded bg-muted/60 animate-pulse" />
          <div className="h-5 w-11/12 rounded bg-muted/60 animate-pulse" />
          <div className="h-5 w-10/12 rounded bg-muted/60 animate-pulse" />
          <div className="h-5 w-9/12 rounded bg-muted/60 animate-pulse" />
          <div className="h-8 w-1/2 rounded bg-muted animate-pulse mt-8 mb-4" />
          <div className="h-5 w-full rounded bg-muted/60 animate-pulse" />
          <div className="h-5 w-11/12 rounded bg-muted/60 animate-pulse" />
          <div className="h-28 w-full rounded-xl bg-muted/40 animate-pulse my-6" />
          <div className="h-5 w-10/12 rounded bg-muted/60 animate-pulse" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ── Blog Post Error Component ───────────────────────────────────── */
function BlogPostError({ error, reset }: { error: Error; reset: () => void }) {
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
            Unable to Load Article
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            We encountered a problem fetching this article from the API server.
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
              Try Again
            </button>
            <Link
              to="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              ← Back to News
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }: any) => {
    const post = loaderData?.post;
    if (!post) {
      const title = loaderData?.isOffline ? "News Offline — Schema Weaver" : "News Not Found — Schema Weaver";
      return {
        meta: [{ title }],
      };
    }

    const metaTitle = post.meta_title || post.title;
    let rawDescription =
      post.meta_description ||
      post.excerpt ||
      "Articles, product announcements, and latest updates from the Schema Weaver team.";
    if (rawDescription.length > 160) {
      rawDescription = rawDescription.slice(0, 157).trim() + "...";
    }
    const metaDescription = rawDescription;
    const ogImage = post.og_image_url || post.thumbnail_url || `${SITE_URL}/resona.png`;

    return {
      meta: [
        { title: `${metaTitle} — Schema Weaver News` },
        { name: "description", content: metaDescription },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: metaDescription },
        { property: "og:image", content: ogImage },
        { property: "og:url", content: `${SITE_URL}/blog/${post.slug}` },
        { property: "og:type", content: "article" },
        {
          property: "article:published_time",
          content: post.published_at ? new Date(post.published_at).toISOString() : undefined,
        },
        {
          property: "article:modified_time",
          content: post.updated_at ? new Date(post.updated_at).toISOString() : undefined,
        },
        {
          property: "article:author",
          content: post.author_name
            ? post.author_name.replace(/VivekMind/gi, "Schema Weaver")
            : "Schema Weaver Team",
        },
        { property: "article:section", content: post.category },
        { property: "article:tag", content: post.tags?.join(", ") || undefined },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metaTitle },
        { name: "twitter:description", content: metaDescription },
        { name: "twitter:image", content: ogImage },
        { name: "twitter:image:width", content: "1200" },
        { name: "twitter:image:height", content: "630" },
        { name: "keywords", content: [post.category, ...(post.tags || [])].join(", ") },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/blog/${post.slug}` }],
    };
  },
  loader: async ({ params }) => {
    const [result, relatedPosts] = await Promise.all([
      fetchBlogPost(params.slug),
      fetchLatestPosts(3),
    ]);

    return {
      post: result.post,
      relatedPosts,
      isNotFound: Boolean(result.isNotFound),
      isOffline: Boolean(result.isOffline),
    };
  },
  pendingComponent: BlogPostSkeleton,
  errorComponent: BlogPostError,
  component: BlogPostPage,
});

/* ── Reading time estimator ─────────────────────────────────────── */
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 230));
}

/* ── Image Lightbox ─────────────────────────────────────────────── */
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 rounded-full bg-white/10 p-2.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors z-10 cursor-pointer"
        aria-label="Close lightbox"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ── Share button component ─────────────────────────────────────── */
function ShareButton({ href, label, icon, onClick }: { href?: string; label: string; icon: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-pointer"
        aria-label={label}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-pointer"
      aria-label={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

/* ── SVG Icons ──────────────────────────────────────────────────── */
const icons = {
  x: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  reddit: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 13.38c.15.36.23.74.23 1.14 0 2.66-3.1 4.82-6.92 4.82s-6.92-2.16-6.92-4.82c0-.4.08-.78.23-1.14a1.58 1.58 0 0 1-.65-1.28c0-.87.71-1.58 1.58-1.58.42 0 .81.17 1.09.44a9.39 9.39 0 0 1 4.59-1.43l.91-4.2a.34.34 0 0 1 .41-.26l2.97.62a1.13 1.13 0 0 1 2.07.54 1.13 1.13 0 0 1-1.13 1.13 1.13 1.13 0 0 1-1.08-.8l-2.63-.55-.8 3.75a9.3 9.3 0 0 1 4.45 1.42c.28-.28.67-.45 1.1-.45.86 0 1.57.71 1.57 1.58 0 .51-.25.97-.65 1.27zM8.28 14.5a1.13 1.13 0 1 0 0-2.26 1.13 1.13 0 0 0 0 2.26zm5.92 2.01c-.73.73-1.86 1.09-3.37 1.09h-.02c-1.51 0-2.64-.36-3.37-1.09a.37.37 0 0 1 .53-.53c.57.57 1.53.85 2.84.85h.02c1.31 0 2.27-.28 2.84-.85a.37.37 0 0 1 .53.53zm-.44-2.01a1.13 1.13 0 1 0 0-2.26 1.13 1.13 0 0 0 0 2.26z" />
    </svg>
  ),
  facebook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  whatsapp: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  copy: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  arrow: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
};

/* ── Active Guest Analytics & Heartbeat Hook ────────────────────── */
function useReadAnalytics(slug: string, postId: string) {
  useEffect(() => {
    if (!postId) return;

    const { readerId, sessionId } = getOrCreateAnalyticsIdentity();

    // 1. UNIQUE VIEW TRACKING
    const recordUniqueView = async () => {
      const viewedKey = "sw_viewed_posts";
      const viewed = JSON.parse(
        localStorage.getItem(viewedKey) || localStorage.getItem("vm_viewed_posts") || "{}"
      );
      const now = Date.now();
      const ONE_DAY_MS = 24 * 60 * 60 * 1000;

      if (viewed[slug] && now - viewed[slug] < ONE_DAY_MS) {
        return;
      }

      const res = await recordPostView(slug, postId, readerId);
      if (res && res.success) {
        viewed[slug] = now;
        localStorage.setItem(viewedKey, JSON.stringify(viewed));
      }
    };

    recordUniqueView();

    // 2. ACTIVE HEARTBEAT TRACKING
    let activeSeconds = 0;
    let maxScrollPercent = 0;
    let lastActivityTime = Date.now();
    let intervalId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      if (pct > maxScrollPercent) {
        maxScrollPercent = Math.min(100, pct);
      }
      lastActivityTime = Date.now();
    };

    const handleActivity = () => {
      lastActivityTime = Date.now();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleActivity, { passive: true });
    window.addEventListener("keydown", handleActivity, { passive: true });

    const triggerHeartbeat = async (secondsToSend: number) => {
      await sendPostHeartbeat(slug, {
        post_id: postId,
        reader_id: readerId,
        session_id: sessionId,
        time_spent_seconds: secondsToSend,
        scroll_depth: maxScrollPercent,
      });
    };

    intervalId = setInterval(() => {
      const now = Date.now();
      const isVisible = document.visibilityState === "visible";
      const isIdle = now - lastActivityTime > 30000;

      if (isVisible && !isIdle) {
        activeSeconds += 10;
        if (activeSeconds % 30 === 0) {
          triggerHeartbeat(30);
        }
      }
    }, 10000);

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);

      const finalSeconds = activeSeconds % 30;
      if (finalSeconds > 0) {
        const payload = JSON.stringify({
          post_id: postId,
          reader_id: readerId,
          session_id: sessionId,
          time_spent_seconds: finalSeconds,
          scroll_depth: maxScrollPercent,
        });

        const endpoint = `${API_BASE}/api/blog/${slug}/heartbeat`;
        if (navigator.sendBeacon) {
          navigator.sendBeacon(endpoint, new Blob([payload], { type: "application/json" }));
        } else {
          fetch(endpoint, {
            method: "POST",
            keepalive: true,
            headers: { "Content-Type": "application/json" },
            body: payload,
          }).catch(() => {});
        }
      }
    };
  }, [slug, postId]);
}

/* ── Main page ──────────────────────────────────────────────────── */
function BlogPostPage() {
  const { post, relatedPosts: loaderRelatedPosts, isNotFound, isOffline } = Route.useLoaderData();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Track unauthenticated unique views & active reading-time heartbeats
  useReadAnalytics(post?.slug || "", post?.id || "");

  // Attach click handlers to images inside blog content for lightbox
  useEffect(() => {
    if (!contentRef.current) return;
    const images = contentRef.current.querySelectorAll("img");
    const handlers: Array<{ el: HTMLImageElement; handler: () => void }> = [];

    images.forEach((img) => {
      img.style.cursor = "zoom-in";
      const handler = () => {
        setLightboxSrc(img.src);
        setLightboxAlt(img.alt || "");
      };
      img.addEventListener("click", handler);
      handlers.push({ el: img, handler });
    });

    return () => {
      handlers.forEach(({ el, handler }) => el.removeEventListener("click", handler));
    };
  }, [post]);

  // Render Mermaid diagrams in blog content (lazy-loaded from CDN)
  useEffect(() => {
    if (!contentRef.current) return;

    const mermaidBlocks = contentRef.current.querySelectorAll<HTMLElement>(
      "pre.mermaid, div.mermaid"
    );
    if (mermaidBlocks.length === 0) return;

    let cancelled = false;

    (async () => {
      if (!(window as any).mermaid) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Mermaid.js"));
          document.head.appendChild(script);
        });
      }

      if (cancelled) return;

      const mermaid = (window as any).mermaid;
      mermaid.initialize({
        startOnLoad: false,
        theme: "default",
        fontFamily: "Space Grotesk, Inter, system-ui, sans-serif",
        securityLevel: "loose",
      });

      mermaidBlocks.forEach((block) => {
        if (block.getAttribute("data-processed")) {
          block.removeAttribute("data-processed");
          const original = block.getAttribute("data-mermaid-source");
          if (original) block.textContent = original;
        } else {
          block.setAttribute("data-mermaid-source", block.textContent || "");
        }
      });

      await mermaid.run({ nodes: Array.from(mermaidBlocks) });
    })();

    return () => {
      cancelled = true;
    };
  }, [post]);

  const handleShareClick = useCallback(
    (platform: string) => {
      if (!post) return;
      recordPostShare(post.slug, platform);
    },
    [post]
  );

  const handleCopyLink = useCallback(() => {
    if (!post) return;
    navigator.clipboard.writeText(`${SITE_URL}/blog/${post.slug}`);
    setCopied(true);
    recordPostShare(post.slug, "copy_link");
    setTimeout(() => setCopied(false), 2000);
  }, [post]);

  // Case 1: Backend is offline
  if (isOffline && !post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-28 pb-16">
          <div className="text-center max-w-md w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
              <WifiOff className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-foreground font-display">API Server Offline</h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              We couldn't connect to the backend service ({API_BASE || "API"}). The server appears to be offline.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => router.invalidate()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                Retry Connection
              </button>
              <Link
                to="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                ← Back to News
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Case 2: Post actually not found (404)
  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-28 pb-16">
          <div className="text-center max-w-md w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-foreground font-display">Post Not Found</h1>
            <p className="mt-3 text-sm text-muted-foreground">The article you are looking for does not exist or has been removed.</p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
            >
              ← Back to News
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const readingTime = estimateReadingTime(post.content);
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const filteredRelated = (loaderRelatedPosts || [])
    .filter((p: BlogPost) => p.id !== post.id)
    .slice(0, 3);

  const displayAuthor = post.author_name
    ? post.author_name.replace(/VivekMind/gi, "Schema Weaver")
    : "Schema Weaver Team";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Lightbox */}
        {lightboxSrc && (
          <ImageLightbox
            src={lightboxSrc}
            alt={lightboxAlt}
            onClose={() => setLightboxSrc(null)}
          />
        )}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt || post.meta_description,
              image: post.thumbnail_url || post.og_image_url,
              datePublished: post.published_at,
              dateModified: post.updated_at,
              author: {
                "@type": "Organization",
                name: displayAuthor,
              },
              publisher: {
                "@type": "Organization",
                name: "Schema Weaver",
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}/resona.png`,
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": postUrl,
              },
            }),
          }}
        />

        <article>
          {/* Header */}
          <header className="mx-auto max-w-4xl px-4 sm:px-6 pt-6 pb-8 sm:pb-10 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-xs text-muted-foreground overflow-x-auto whitespace-nowrap pb-1">
              <Link to="/" className="hover:text-foreground transition-colors shrink-0">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-foreground transition-colors shrink-0">News</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[160px] sm:max-w-[280px]">{post.title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                {post.category}
              </span>
              {formattedDate && (
                <span className="text-xs sm:text-sm text-muted-foreground">{formattedDate}</span>
              )}
              <span className="text-xs sm:text-sm text-muted-foreground">·</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{readingTime} min read</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-foreground font-display">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            )}

            {/* Author + metrics + share row */}
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-y border-border/60 py-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center ring-2 ring-background">
                  <span className="text-sm font-bold text-primary">
                    {displayAuthor.charAt(0) || "S"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{displayAuthor}</p>
                  <p className="text-xs text-muted-foreground">Schema Weaver Team</p>
                </div>
              </div>

              {/* Action buttons: Likes & Share */}
              <div className="flex items-center flex-wrap gap-2">
                <BlogPostLikes slug={post.slug} initialCount={post.like_count} />

                <div className="h-5 w-px bg-border mx-1 hidden sm:block" />

                <ShareButton
                  href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                  label="X"
                  icon={icons.x}
                  onClick={() => handleShareClick("x")}
                />
                <ShareButton
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  label="LinkedIn"
                  icon={icons.linkedin}
                  onClick={() => handleShareClick("linkedin")}
                />
                <ShareButton
                  onClick={handleCopyLink}
                  label={copied ? "Copied!" : "Copy link"}
                  icon={copied ? icons.check : icons.copy}
                />
              </div>
            </div>
          </header>

          {/* Hero Image */}
          {post.thumbnail_url && (
            <div className="mx-auto max-w-5xl px-6 lg:px-8 mb-10">
              <div
                className="aspect-video overflow-hidden rounded-2xl cursor-zoom-in border border-border bg-muted"
                onClick={() => {
                  setLightboxSrc(post.thumbnail_url!);
                  setLightboxAlt(post.title);
                }}
              >
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform hover:scale-[1.02]"
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 lg:px-8">
            <div
              ref={contentRef}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-10 lg:px-8">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mx-auto max-w-3xl px-6 py-8 lg:px-8 border-t border-border mt-8">
            <CommentList slug={post.slug} />
          </div>
        </article>

        {/* Share Section */}
        <div className="border-t border-border bg-card/30 mt-12">
          <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Share this article
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {icons.arrow}
                  All news
                </Link>
              </div>

              <div className="flex flex-wrap gap-2">
                <ShareButton
                  href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                  label="X / Twitter"
                  icon={icons.x}
                  onClick={() => handleShareClick("x")}
                />
                <ShareButton
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  label="LinkedIn"
                  icon={icons.linkedin}
                  onClick={() => handleShareClick("linkedin")}
                />
                <ShareButton
                  href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
                  label="Reddit"
                  icon={icons.reddit}
                  onClick={() => handleShareClick("reddit")}
                />
                <ShareButton
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  label="Facebook"
                  icon={icons.facebook}
                  onClick={() => handleShareClick("facebook")}
                />
                <ShareButton
                  href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                  label="WhatsApp"
                  icon={icons.whatsapp}
                  onClick={() => handleShareClick("whatsapp")}
                />
                <ShareButton
                  onClick={handleCopyLink}
                  label={copied ? "Copied!" : "Copy link"}
                  icon={copied ? icons.check : icons.copy}
                />
              </div>

              <div className="mt-4 pt-6 border-t border-border">
                <BlogSubscribe />
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {filteredRelated.length > 0 && (
          <section className="border-t border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8">
              <div className="flex items-baseline justify-between mb-10">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground font-display">
                  Related News
                </h2>
                <Link to="/blog" className="text-xs font-semibold text-primary hover:underline">
                  View all news →
                </Link>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredRelated.map((relatedPost: BlogPost) => (
                  <Link
                    key={relatedPost.id}
                    to="/blog/$slug"
                    params={{ slug: relatedPost.slug }}
                    className="group rounded-xl border border-border bg-card p-2 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    {relatedPost.thumbnail_url && (
                      <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                        <img
                          src={relatedPost.thumbnail_url}
                          alt={relatedPost.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="px-3 pt-4 pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                          {relatedPost.category}
                        </span>
                        {relatedPost.published_at && (
                          <>
                            <span className="text-muted-foreground/40">·</span>
                            <span className="text-[11px] text-muted-foreground">
                              {new Date(relatedPost.published_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug font-display">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
