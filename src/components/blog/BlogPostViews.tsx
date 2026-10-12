import { useState, useEffect } from "react";
import { getPostViewCount } from "@/lib/api/blog";
import { Eye } from "lucide-react";

interface BlogPostViewsProps {
  slug: string;
  initialCount?: number;
}

export function BlogPostViews({ slug, initialCount = 0 }: BlogPostViewsProps) {
  const [viewCount, setViewCount] = useState(initialCount);

  useEffect(() => {
    let cancelled = false;

    const fetchViews = async () => {
      try {
        const count = await getPostViewCount(slug);
        if (cancelled) return;
        setViewCount(count);
      } catch (err) {
        console.error("Failed to fetch views:", err);
      }
    };

    // Retrieve views after a short delay to allow recordUniqueView (called on mount) to register
    const timer = setTimeout(fetchViews, 800);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [slug]);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground select-none">
      <Eye className="h-4 w-4" />
      <span>{viewCount.toLocaleString()}</span>
    </div>
  );
}
