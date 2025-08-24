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

type NewMovie = Omit<Movie, 'id'>

interface MovieContext {
    movies: Movie[];
    addMovie: (movie: Movie) => void; 
    toggleFavorite: (movie: Movie) => void;
}


export type { Movie, NewMovie, MovieContext };