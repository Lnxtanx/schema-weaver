/**
 * Blog API Client
 * Fetches blog posts from the backend API
 */

import { getReaderId } from './analytics';

export const API_BASE = import.meta.env.VITE_API_URL;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnail_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  author_name: string;
  category: string;
  tags: string[];
  view_count: number;
  comment_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  media?: BlogMedia[];
}

export interface BlogMedia {
  id: string;
  file_url: string;
  file_name: string | null;
  mime_type: string | null;
  embed_url: string | null;
  embed_provider: string | null;
  alt_text: string | null;
  sort_order: number;
}

export interface BlogComment {
  id: string;
  post_id: string;
  parent_id: string | null;
  author_name: string;
  author_email: string | null;
  content: string;
  is_blocked: boolean;
  is_deleted: boolean;
  likes_count: number;
  user_liked?: boolean;
  created_at: string;
  updated_at: string;
  replies?: BlogComment[];
}

export interface PaginatedResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Fetch latest blog posts
 */
export async function fetchLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${API_BASE}/api/blog/latest?limit=${limit}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    } as any);

    if (!response.ok) {
      throw new Error('Failed to fetch latest posts');
    }

    const { posts } = await response.json();
    return posts || [];
  } catch (error) {
    console.error('Failed to fetch latest posts:', error);
    return [];
  }
}

/**
 * Fetch all blog posts (paginated)
 */
export async function fetchBlogPosts(page: number = 1, limit: number = 10, category?: string): Promise<{
  posts: BlogPost[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
  isOffline?: boolean;
}> {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (category) {
      params.append('category', category);
    }

    const response = await fetch(`${API_BASE}/api/blog?${params}`, {
      next: { revalidate: 3600 },
    } as any);

    if (!response.ok) {
      console.warn(`[Blog API] Failed to fetch posts (${response.status} ${response.statusText})`);
      return {
        posts: [],
        pagination: { page: Number(page), limit: Number(limit), total: 0, totalPages: 0 },
        isOffline: true,
      };
    }

    const data = await response.json();
    return {
      posts: data.posts || [],
      pagination: data.pagination || { page: Number(page), limit: Number(limit), total: 0, totalPages: 0 },
      isOffline: false,
    };
  } catch (error) {
    console.error('[Blog API] Network error fetching blog posts:', error);
    return {
      posts: [],
      pagination: { page: Number(page), limit: Number(limit), total: 0, totalPages: 0 },
      isOffline: true,
    };
  }
}

export interface FetchBlogPostResult {
  post: BlogPost | null;
  isNotFound?: boolean;
  isOffline?: boolean;
}

/**
 * Fetch single blog post by slug
 */
export async function fetchBlogPost(slug: string): Promise<FetchBlogPostResult> {
  try {
    const response = await fetch(`${API_BASE}/api/blog/${slug}`, {
      next: { revalidate: 3600 },
    } as any);

    if (!response.ok) {
      if (response.status === 404) {
        return { post: null, isNotFound: true, isOffline: false };
      }
      console.warn(`[Blog API] Error response (${response.status}) fetching post: ${slug}`);
      return { post: null, isNotFound: false, isOffline: true };
    }

    const { post } = await response.json();
    return { post, isNotFound: false, isOffline: false };
  } catch (error) {
    console.error(`[Blog API] Network error fetching post ${slug}:`, error);
    return { post: null, isNotFound: false, isOffline: true };
  }
}

/**
 * Fetch blog categories
 */
export async function fetchBlogCategories(): Promise<{ name: string; count: number }[]> {
  try {
    const response = await fetch(`${API_BASE}/api/blog/categories`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    } as any);

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const { categories } = await response.json();
    return categories || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

/**
 * Subscribe to newsletter
 */
export async function subscribeToNewsletter(email: string): Promise<{
  success: boolean;
  message: string;
  alreadySubscribed?: boolean;
}> {
  const response = await fetch(`${API_BASE}/api/blog/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    message: data.message || data.error,
    alreadySubscribed: data.alreadySubscribed,
  };
}

// =============================================================================
// Blog Likes & Comments API Functions
// =============================================================================

/**
 * Get post likes count
 */
export async function getPostLikeCount(slug: string): Promise<{
  post_id: string;
  like_count: number;
  slug: string;
  user_liked: boolean;
}> {
  const readerId = getReaderId();
  const response = await fetch(`${API_BASE}/api/blog/${slug}/likes`, {
    headers: {
      'x-reader-id': readerId,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch likes');
  }
  return await response.json();
}

/**
 * Toggle like on a post
 */
export async function togglePostLike(slug: string): Promise<{
  success: boolean;
  post_id: string;
  like_count: number;
}> {
  const readerId = getReaderId();
  const response = await fetch(`${API_BASE}/api/blog/${slug}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-reader-id': readerId,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to toggle like');
  }
  return await response.json();
}

/**
 * Get comments for a post
 */
export async function getPostComments(slug: string, page: number = 1, limit: number = 20): Promise<{
  comments: BlogComment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  const readerId = getReaderId();
  const response = await fetch(`${API_BASE}/api/blog/${slug}/comments?${params}`, {
    headers: {
      'x-reader-id': readerId,
    },
    next: { revalidate: 60 }, // Cache for 1 minute
  } as any);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return await response.json();
}

/**
 * Add a comment to a post
 */
export async function addPostComment(
  slug: string,
  { author_name, author_email, content, parent_id }: { author_name: string; author_email?: string; content: string; parent_id?: string }
): Promise<{
  comment: BlogComment;
  message: string;
}> {
  const response = await fetch(`${API_BASE}/api/blog/${slug}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ author_name, author_email, content, parent_id }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add comment');
  }
  return await response.json();
}

/**
 * Toggle like on a comment
 */
export async function toggleCommentLike(commentId: string): Promise<{
  success: boolean;
  comment_id: string;
  like_count: number;
}> {
  const response = await fetch(`${API_BASE}/api/blog/comments/${commentId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to toggle comment like');
  }
  return await response.json();
}

/**
 * Record a unique blog post view
 */
export async function recordPostView(slug: string, postId: string, readerId: string): Promise<{ success: boolean; unique: boolean; view_count?: number }> {
  try {
    const response = await fetch(`${API_BASE}/api/blog/${slug}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post_id: postId, reader_id: readerId }),
    });

    if (!response.ok) {
      throw new Error('Failed to record view');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to record post view:', error);
    return { success: false, unique: false };
  }
}

/**
 * Get post views count
 */
export async function getPostViewCount(slug: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE}/api/blog/${slug}/views`);
    if (!response.ok) {
      throw new Error('Failed to fetch views count');
    }
    const data = await response.json();
    return data.view_count || 0;
  } catch (error) {
    console.error('Failed to fetch views count:', error);
    return 0;
  }
}

/**
 * Send reading-time heartbeat for a post
 */
export async function sendPostHeartbeat(
  slug: string,
  payload: {
    post_id: string;
    reader_id: string;
    session_id: string;
    time_spent_seconds: number;
    scroll_depth: number;
  }
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/blog/${slug}/heartbeat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send heartbeat:', error);
    return false;
  }
}

/**
 * Record a blog post share click
 */
export async function recordPostShare(slug: string, platform: string, readerId?: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/blog/${slug}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ platform, reader_id: readerId || getReaderId() }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to record share:', error);
    return false;
  }
}
