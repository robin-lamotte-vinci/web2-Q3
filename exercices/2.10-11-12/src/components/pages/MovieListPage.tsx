import { useState } from "react";

import "./index.css";
import type { Movie } from "../../types";
import MovieListView from "../MovieList/MovieListView";
import AddMovieForm from "../MovieList/AddMovieForm";

const defaultMovies: Movie[] = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    imageUrl: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_SY679_.jpg",
    description:
      "Un voleur expérimenté, le meilleur dans l'art dangereux de l'extraction, vole des secrets précieux du plus profond du subconscient.",
    budget: 160,
  },
  {
    title: "Le Fabuleux Destin d'Amélie Poulain",
    director: "Jean-Pierre Jeunet",
    duration: 122,
    description:
      "Amélie, une jeune serveuse à Montmartre, décide de changer la vie de ceux qui l'entourent.",
    budget: 10,
  },
  {
    title: "Parasite",
    director: "Bong Joon-ho",
    duration: 132,
    imageUrl: "https://m.media-amazon.com/images/I/71c8vF+QpGL._AC_SY679_.jpg",
    budget: 11,
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    imageUrl: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
    description:
      "Dans un futur proche, la Terre se meurt. Un groupe d'explorateurs utilise un trou de ver pour franchir les limites du voyage spatial.",
  },
  {
    title: "La La Land",
    director: "Damien Chazelle",
    duration: 128,
    imageUrl: "https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_SY679_.jpg",
    description:
      "Une actrice en devenir et un musicien de jazz passionné tombent amoureux à Los Angeles.",
  },
];

function MovieListPage() {
  const [movies, setMovies] = useState(defaultMovies);
  const [displayForm, setDisplayForm] = useState(false);

  const addMovie = (newMovie: Movie) => {
    setMovies([...movies, newMovie]);
  };

  const toggleDisplayForm = () => {
    setDisplayForm(!displayForm);
  };

  return (
    <>
      <h1>Movies</h1>{" "}
      <br />
      <button onClick={toggleDisplayForm}>
        {displayForm ? (
          <div>Masquer le formulaire</div>
        ) : (
          <div>Ajouter un film</div>
        )}
      </button>
      <br />
      <br />
      {displayForm && <AddMovieForm addMovie={addMovie} toggleDisplayForm={toggleDisplayForm} />}
      <MovieListView movies={movies} />
      <br />
    </>
  );
}

export default MovieListPage;
