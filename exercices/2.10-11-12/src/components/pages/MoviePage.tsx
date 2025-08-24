import type { MovieContext } from "../../types";
import MovieCard from "../MovieList/MovieCard";
import { useMatch, useOutletContext } from "react-router-dom";

function MoviePage() {
  const { movies, toggleFavorite }: MovieContext = useOutletContext();

  const match = useMatch("/movies/:movieId");
  const movieIdStr = match?.params.movieId;

  if (!movieIdStr) return <p>404 - Movie not found</p>;
  const movieId = parseInt(movieIdStr);
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) return <p>404 - Movie not found</p>;

  return (
    <>
      <h1>Movies</h1>
      <br />
      <MovieCard movie={movie} toggleFavorite={toggleFavorite} />
      <br />
    </>
  );
}

export default MoviePage;
