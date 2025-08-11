export interface Game {
  game_id: number;
  title: string;
  description: string;
  image_url: string;
  rules_url: string;
  genre_name: string;

  age: number; // 권장 연령
  min_players: number;
  max_players: number;
  playtime_minutes: number;
  difficulty: number; // 난이도 (예: 1~5 사이 실수)

  average_rating: number;
  like_count: number;
  is_liked: boolean;

  created_at: string; // ISO 8601 문자열
  updated_at: string;
}

export interface GameData {
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
