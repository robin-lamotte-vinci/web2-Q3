import Cinema from "../Cinema";
import type { Movie } from "../../types";
import "./CinemaPage.css"

const movies: Movie[] = [
    {
        title: "Inception",
        director: "Christopher Nolan",
        duration: 148,
        description: "Un voleur spécialisé dans l'extraction de secrets rêve d'une dernière mission.",
    },
    {
        title: "Le Fabuleux Destin d'Amélie Poulain",
        director: "Jean-Pierre Jeunet",
        duration: 122,
        description: "Amélie décide de changer la vie de ceux qui l'entourent.",
    },
    {
        title: "Parasite",
        director: "Bong Joon-ho",
        duration: 132,
        description: "Une famille pauvre s'immisce dans la vie d'une famille aisée.",
    },
];

const CinemaPage = () => {
    return (
        <div className="cinema-page-container">
            <Cinema name="Cinéma Lumière" movies={movies} />
        </div>
    );
};

export default CinemaPage;