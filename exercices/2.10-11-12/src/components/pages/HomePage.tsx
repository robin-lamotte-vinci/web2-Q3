import { useNavigate, useOutletContext } from "react-router-dom";
import type { MovieContext } from "../../types";
import "./HomePage.css";

const HomePage = () => {
  const { movies }: MovieContext = useOutletContext();
  const navigate = useNavigate();
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
          .map((m) => (
            <li
              key={m.id}
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate(`/movies/${m.id}`)}
            >
              {m.title} - {m.director}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomePage;
