export interface User {
  name: string;
  email: string;
  nickname: string;
  profile_image: string | null;
  phone_number: string;
  birth: string;
  review_count: number;
  like_count: number;
  created_at: string;
  popular_genres: string[];
}
