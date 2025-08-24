interface Movie {
    title: string;
    director: string;
    duration: number;
    isFavorite: boolean;
    imageUrl?: string;
    description?: string;
    budget?: number;
};

interface MovieContext {
    movies: Movie[];
    addMovie: (movie: Movie) => void; 
    toggleFavorite: (movie: Movie) => void;
}


export type { Movie, MovieContext };