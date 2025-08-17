export interface MyReviewItem {
  review_id: number;
  game_id: number;
  title: string;
  rating: number;
  content: string;
  created_at: string;
  updated_at: string | null;
  image_url: string;
  actions: {
    edit_url: string;
    delete_url: string;
  };
}

export type MyReviewWriteItem = Omit<MyReviewItem, 'updated_at' | 'actions'>;
export interface MyReviewListResponse {
  status: string;
  total_reviews: number;
  page: number;
  limit: number;
  total_pages: number;
  reviews: MyReviewItem[];
}

export interface ReviewItem {
  review_id: number;
  game_id: number;
  title: string;
  content: string;
  rating: number;
  created_at: string;
  updated_at?: string;
  user: {
    user_id: number;
    username: string;
    profile_image_url: string | null;
  };
  image_url?: string;
}
