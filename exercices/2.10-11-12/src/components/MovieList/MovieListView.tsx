import "./MovieListView.css";
import type { Movie } from "../../types";
import MovieCard from "./MovieCard";

interface MovieListViewProps {
    movies: Movie[];
}

const MovieListView = ({ movies }: MovieListViewProps) => {
    return (
        <section className="movie-list-view">
            {movies.map((movie, idx) => (
                <MovieCard key={movie.title + idx} movie={movie} />
            ))}
        </section>
    );
};

export default MovieListView;