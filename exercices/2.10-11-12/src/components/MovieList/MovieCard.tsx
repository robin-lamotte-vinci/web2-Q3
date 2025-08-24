import "./MovieCard.css";
import type { Movie } from "../../types";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <article className="movie-card">
            {movie.imageUrl ? (
                <img className="movie-card__img" src={movie.imageUrl} alt={`Affiche de ${movie.title}`} />
            ) : (
                <div className="movie-card__placeholder">🎬</div>
            )}
            <div className="movie-card__body">
                <h2 className="movie-card__title">{movie.title}</h2>
                <div className="movie-card__director">Réalisé par {movie.director}</div>
                <div className="movie-card__duration">{movie.duration} min</div>
                {movie.description && (
                    <p className="movie-card__description">{movie.description}</p>
                )}
                {movie.budget !== undefined && (
                    <div className="movie-card__budget">
                        Budget : {movie.budget.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })}
                    </div>
                )}
            </div>
        </article>
    );
};

export default MovieCard;

