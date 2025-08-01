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

export interface GameListData {
  game_id: number;
  title: string;
  image_url: string;
  like_count: number;
  is_liked: boolean;
  average_rating: number;
  genre_name: string;
  min_players: number;
  max_players: number;
  difficulty: number;
}
