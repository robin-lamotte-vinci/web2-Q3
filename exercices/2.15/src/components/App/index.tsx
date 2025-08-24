import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import NavBar from "../NavBar/NavBar";
import "./App.css";
import type { Movie, MovieContext, NewMovie } from "../../types";
import { useCallback, useEffect, useState } from "react";
import {
  createMovie,
  fetchAllMovies,
  toggleMovieFavoriteRequest,
} from "../../utils/movies-service";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const addMovie = async (newMovie: NewMovie) => {
    await createMovie(newMovie);
    initMovies();
  };

  const initMovies = useCallback(async () => {
    try {
      const movies = await fetchAllMovies();
      setMovies(movies);
    } catch (err) {
      console.error("initMovies::error: ", err);
    }
  }, []);

  useEffect(() => {
    initMovies();
  }, [initMovies]);

  const toggleFavorite = async (movie: Movie) => {
    await toggleMovieFavoriteRequest(movie.id, !movie.isFavorite);

    //lazy to re-init all movies for one favorite attribute ...
    setMovies((movies) =>
      movies.map((m) =>
        m.id === movie.id ? { ...m, isFavorite: !m.isFavorite } : m
      )
    );
  };

  const fullMovieContext: MovieContext = {
    movies: movies,
    addMovie: addMovie,
    toggleFavorite: toggleFavorite,
  };

  return (
    <div className="app-layout">
      <Header urlLogo="https://static.vecteezy.com/system/resources/previews/016/733/452/non_2x/cinema-logo-vector.jpg">
        <NavBar />
      </Header>

      <main className="main-content">
        <Outlet context={fullMovieContext} />
      </main>

      <Footer urlLogo="https://static.vecteezy.com/system/resources/previews/016/733/452/non_2x/cinema-logo-vector.jpg" />
    </div>
  );
}

export default App;
