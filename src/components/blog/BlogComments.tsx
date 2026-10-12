import { useState, useEffect } from 'react';
import { addPostComment, toggleCommentLike, getPostComments, type BlogComment } from '@/lib/api/blog';
import { ThumbsUp, Send, Reply, MessageSquare, Loader2 } from 'lucide-react';

interface CommentFormProps {
  slug: string;
  parentCommentId?: string;
  onCommentAdded?: () => void;
}

export function CommentForm({ slug, parentCommentId, onCommentAdded }: CommentFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!!parentCommentId);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Please enter your comment');
      return;
    }

    setIsSubmitting(true);

    try {
      await addPostComment(slug, {
        author_name: authorName.trim(),
        author_email: authorEmail.trim() || undefined,
        content: content.trim(),
        parent_id: parentCommentId,
      });

      setAuthorName('');
      setAuthorEmail('');
      setContent('');
      setIsExpanded(false);

      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error: any) {
      setError(error.message || 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <MessageSquare className="h-4 w-4" />
        <span>Add a comment</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Your name (required)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your email (optional)"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <textarea
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
            required
          />
        </div>
        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Post Comment</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

interface CommentItemProps {
  comment: BlogComment;
  slug: string;
  onReply?: () => void;
}

export function CommentItem({ comment, slug, onReply }: CommentItemProps) {
  const [isLiked, setIsLiked] = useState(comment.user_liked || false);
  const [likeCount, setLikeCount] = useState(comment.likes_count || 0);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLike = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      await toggleCommentLike(comment.id);
      if (isLiked) {
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mt-6 group">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-semibold text-foreground">{comment.author_name}</span>
            {comment.author_email && (
              <span className="text-xs text-muted-foreground">({comment.author_email})</span>
            )}
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{comment.content}</p>
          <div className="mt-2 flex items-center gap-4">
            <button
              onClick={handleLike}
              disabled={isUpdating}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {isLiked ? (
                <ThumbsUp className="h-4 w-4 fill-primary text-primary" />
              ) : (
                <ThumbsUp className="h-4 w-4" />
              )}
              <span>{likeCount}</span>
            </button>
            <button
              onClick={() => onReply && onReply()}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <Reply className="h-4 w-4" />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CommentListProps {
  slug: string;
}

export function CommentList({ slug }: CommentListProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, [slug, page]);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const data = await getPostComments(slug, page, 20);
      setComments((prev) => (page === 1 ? data.comments : [...prev, ...data.comments]));
      setHasMore(page < data.pagination.totalPages);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = () => {
    const form = document.getElementById('comment-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Comments ({comments.length})
      </h3>

      <div id="comment-form">
        <CommentForm slug={slug} onCommentAdded={() => setPage(1)} />
      </div>

      <div className="mt-6 space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            slug={slug}
            onReply={handleReply}
          />
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Load more comments
          </button>
        </div>
      )}
    </div>
  );
}
