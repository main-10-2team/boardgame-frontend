export interface Game {
  game_id: number;
  title: string;
  thumbnail_url: string;
  average_rating: number;
}

export interface SurveyChoicesResponse {
  games: Game[];
}

export interface SurveySubmitRequest {
  liked_games: number[];
}

export interface SurveySubmitResponse {
  message: string;
  new_like_count: number;
  liked_game_ids: number[];
}

export interface PreferenceState {
  success: boolean;
  error: string | null;
  message?: string;
}
