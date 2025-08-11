export interface GameRankingItem {
  game_id: number;
  age: number;
  title: string;
  description: string;
  min_players: number;
  max_players: number;
  playtime_min_minutes: number;
  playtime_max_minutes: number;
  difficulty: number;
  thumbnail_url: string;
  rules_url: string;
  genre_name: string;
  average_rating: number;
  created_at: string;
  updated_at: string;
  like_count: number;
  reviews_count: number;
  is_liked: boolean;
}

export const VALID_SORTS = [
  'popularity',
  'likes',
  'rating',
  'reviews',
] as const;
export type ValidSort = (typeof VALID_SORTS)[number];
