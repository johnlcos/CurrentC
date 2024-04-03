export interface FeedProfileSchema {
  username: string;
}

export interface FeedSchema {
  profiles?: FeedProfileSchema;
  id: string;
  like_count: number;
  dislike_count: number;
  content: string;
  created_at: string;
  author_id: string;
  username?: string;
}

export interface ServerError {
  status: number;
  errorType: string;
  message: string;
}
