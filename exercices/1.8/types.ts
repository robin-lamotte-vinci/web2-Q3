interface Film {
  id: number; 
  title: string;
  director: string;
  duration: number;
  isFavorite: boolean;
  budget?: number;
  description?: string;
  imageUrl?: string;
}
type NewFilm = Omit<Film, "id" | "isFavorite">;

export type { Film, NewFilm };
