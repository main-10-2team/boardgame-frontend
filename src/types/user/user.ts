export interface User {
  name: string;
  email: string;
  nickname: string;
  profile_image: string;
  review_count: number;
  like_count: number;
  created_at: string;
  preferred_genres: string[];
  preferred_playtimes: string[];
  popular_genres: string[];
}
