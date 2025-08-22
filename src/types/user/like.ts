export interface LikeItem {
  game_id: number;
  title: string;
  image_url: string;
  average_rating: number;
  created_at: string;
}

export interface LikeListResults {
  status: 'success';
  user_like_count: number;
  likes: LikeItem[];
}

export interface LikeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: LikeListResults;
}
