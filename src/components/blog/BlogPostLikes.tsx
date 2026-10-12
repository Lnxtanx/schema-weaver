import { useState, useEffect } from 'react';
import { togglePostLike, getPostLikeCount } from '@/lib/api/blog';
import { Heart } from 'lucide-react';

interface BlogPostLikesProps {
  slug: string;
  initialCount?: number;
}

export function BlogPostLikes({ slug, initialCount = 0 }: BlogPostLikesProps) {
  const [likeCount, setLikeCount] = useState(initialCount);
  const [userLiked, setUserLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch like count and check localStorage on mount
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getPostLikeCount(slug);
        if (cancelled) return;
        const serverCount = data.like_count || 0;
        const liked = (data as any).user_liked !== undefined
          ? (data as any).user_liked
          : localStorage.getItem(`blog_liked_${slug}`) === 'true';
        
        setUserLiked(liked);
        setLikeCount(serverCount);
        localStorage.setItem(`blog_liked_${slug}`, liked.toString());
      } catch {
        const liked = localStorage.getItem(`blog_liked_${slug}`) === 'true';
        setUserLiked(liked);
        setLikeCount(initialCount);
      }
    })();

    return () => { cancelled = true; };
  }, [slug, initialCount]);

  const handleLike = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    const previousLiked = userLiked;
    const previousCount = likeCount;

    // Optimistic update
    if (userLiked) {
      setLikeCount((prev) => Math.max(0, prev - 1));
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setUserLiked(!userLiked);

    try {
      await togglePostLike(slug);

      // Update localStorage
      localStorage.setItem(`blog_liked_${slug}`, (!userLiked).toString());
    } catch (error) {
      // Revert on error
      setUserLiked(previousLiked);
      setLikeCount(previousCount);
      console.error('Failed to toggle like:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isUpdating}
      className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-pointer"
      aria-label={userLiked ? 'Unlike post' : 'Like post'}
    >
      {userLiked ? (
        <Heart className="h-4 w-4 fill-primary text-primary animate-pulse" />
      ) : (
        <Heart className="h-4 w-4 group-hover:fill-primary group-hover:text-primary transition-colors" />
      )}
      <span>{likeCount.toLocaleString()}</span>
    </button>
  );
}
