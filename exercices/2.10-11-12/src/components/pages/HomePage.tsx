import { useOutletContext } from "react-router-dom";
import type { MovieContext } from "../../types";
import "./HomePage.css";

const HomePage = () => {
  const { movies }: MovieContext = useOutletContext();
  return (
    <div className="homepage-container">
      <h1>Bienvenue sur iMovies</h1>
      <p>
        iMovies est une application qui vous permet de découvrir facilement les
        cinémas disponibles ainsi qu'une liste de films à l'affiche.
      </p>
      <ul>
        <li>Page d'accueil pour vous présenter l'application</li>
        <li>Page dédiée à l'affichage de plusieurs cinémas</li>
        <li>Page présentant une liste de films</li>
      </ul>
      <br />
      <hr style={{ margin: "32px 0" }} />
      <h2>Films favoris</h2>
      <ul>
        {movies
          .filter((m) => m.isFavorite)
          .map((m, index) => (
            <li key={index}>
              {m.title} - {m.director}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomePage;
