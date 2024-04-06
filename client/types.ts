export interface FeedProfileSchema {
  username: string;
  profile_avatar: string | null;
  display_name: string;
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
  profile_avatar?: string | null;
  display_name: string;
}

export interface ServerError {
  status: number;
  errorType: string;
  message: string;
}

export interface Success {
  status: number;
  message: string;
}
