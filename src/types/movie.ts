export interface MovieDetail {
  id?: string;
  tmdbId?: number;
  title: string;
  age: string;
  genres: string[];
  time: number;
  country: string;
  spokenLanguages: string[];
  crew: string[];
  cast: string[];
  releaseDate: string;
  overview: string;
  trailer: string;
  posterUrl: string;
  status: string;
}