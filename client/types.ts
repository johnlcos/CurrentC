export interface FeedProfileSchema {
  username: string;
}

export interface FeedSchema {
  profiles: FeedProfileSchema;
  id: string;
  like_count: number;
  dislike_count: number;
  content: string;
  created_at: string;
}
