import "./MovieListView.css";
import type { Movie } from "../../types";
import MovieCard from "./MovieCard";

interface MovieListViewProps {
    movies: Movie[];
    toggleFavorite: (movie: Movie) => void;
}

const MovieListView = ({ movies, toggleFavorite }: MovieListViewProps) => {
    return (
        <section className="movie-list-view">
            {movies.map((movie, idx) => (
                <MovieCard key={movie.title + idx} movie={movie} toggleFavorite={toggleFavorite}/>
            ))}
        </section>
    );
};

export default MovieListView;