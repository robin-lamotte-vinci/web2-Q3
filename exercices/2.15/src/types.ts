interface Movie {
    id: number;
    title: string;
    director: string;
    duration: number;
    isFavorite: boolean;
    imageUrl?: string;
    description?: string;
    budget?: number;
};

type NewMovie = Omit<Movie, 'id' | 'isFavorite'>

interface MovieContext {
    movies: Movie[];
    addMovie: (movie: NewMovie) => Promise<void>; 
    deleteMovie: (movie: Movie) => Promise<void>;
    toggleFavorite: (movie: Movie) => Promise<void>;
}


export type { Movie, NewMovie, MovieContext };