export interface GameBase {
  game_id: number;
  title: string;
  thumbnail_url: string;

  difficulty: string;
  like_count: number;
  average_rating: number;
  reviews_count: number;

  genre: string;
  category: string;
}

export interface GameListItem extends GameBase {
  is_liked: boolean;
}

export interface GameDetail extends GameBase {
  description: string;
  age: number;
  min_players: number;
  max_players: number;
  playtime_minutes: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
}

export interface GameListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GameListItem[];
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
