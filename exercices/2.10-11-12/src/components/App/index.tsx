import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import NavBar from "../NavBar/NavBar";
import "./App.css";
import type { Movie, MovieContext } from "../../types";
import { useState } from "react";

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
    imageUrl: "https://blog.richersounds.com/wp-content/uploads/2020/07/parasite.jpg",
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


function App() {
const [movies, setMovies] = useState(defaultMovies);

const addMovie = (newMovie: Movie) => {
  setMovies([...movies, newMovie]);
}

const fullMovieContext: MovieContext = {
  movies: movies,
  addMovie: addMovie,
}

  return (
    <div className="app-layout">
      <Header urlLogo="https://static.vecteezy.com/system/resources/previews/016/733/452/non_2x/cinema-logo-vector.jpg">
        <NavBar />
      </Header>

      <main className="main-content">
        <Outlet context={fullMovieContext}/>
      </main>

      <Footer urlLogo="https://static.vecteezy.com/system/resources/previews/016/733/452/non_2x/cinema-logo-vector.jpg" />
    </div>
  );
}

export default App;
