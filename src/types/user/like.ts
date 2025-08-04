export interface LikeItem {
  game_id: number;
  title: string;
  image_url: string;
  average_rating: number;
  created_at: string;
}

export interface LikeListResponse {
  status: 'success' | 'error';
  total_count: number;
  likes: LikeItem[];
}
