import "./MovieListPage.css";
import type { MovieContext } from "../../types";
import MovieListView from "../MovieList/MovieListView";
import { useOutletContext } from "react-router-dom";


function MovieListPage() {
  
  const { movies, toggleFavorite }: MovieContext = useOutletContext();

  return (
    <>
      <h1>Movies</h1>
      <br />
      <MovieListView movies={movies} toggleFavorite={toggleFavorite} />
      <br />
    </>
  );
}

export default MovieListPage;
