export type ApiError = {
  status: number;
  message: string;
};

export type QueryParams = Record<string, string | string[] | undefined>;
