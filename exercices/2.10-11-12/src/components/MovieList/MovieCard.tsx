import "./MovieCard.css";
import type { Movie } from "../../types";

interface MovieCardProps {
  movie: Movie;
  toggleFavorite: (movie: Movie) => void;
}

const MovieCard = ({ movie, toggleFavorite }: MovieCardProps) => {
  return (
    <article className="movie-card">
      <span
        className="movie-card__favorite"
        onClick={() => toggleFavorite(movie)}
        style={{
          position: "absolute",
          top: "12px",
          right: "16px",
          display: "inline-block",
          cursor: "pointer",
          fontSize: "1.7rem",
          color: movie.isFavorite ? "#5c0606ff" : "#d3b1b1ff",
          userSelect: "none",
          transition: "color 0.2s",
          zIndex: 2,
        }}
        title={movie.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        {movie.isFavorite ? "★" : "☆"}
      </span>
      {movie.imageUrl ? (
        <img
          className="movie-card__img"
          src={movie.imageUrl}
          alt={`Affiche de ${movie.title}`}
        />
      ) : (
        <div className="movie-card__placeholder">🎬</div>
      )}
      <div className="movie-card__body">
        <div style={{ textAlign: "center" }}>
          <h2 className="movie-card__title">{movie.title}</h2>
        </div>
        <div className="movie-card__director">Réalisé par {movie.director}</div>
        <div className="movie-card__duration">{movie.duration} min</div>
        {movie.description && (
          <p className="movie-card__description">{movie.description}</p>
        )}
        {movie.budget !== undefined && (
          <div className="movie-card__budget">
            Budget :{" "}
            {(movie.budget * 1_000_000).toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            })}
          </div>
        )}
      </div>
    </article>
  );
};

export default MovieCard;
