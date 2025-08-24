import Cinema from "../Cinema";
import type { MovieContext } from "../../types";
import "./CinemaPage.css"
import { useOutletContext } from "react-router-dom";


const CinemaPage = () => {

    const { movies }: MovieContext = useOutletContext();

    return (
        <div className="cinema-page-container">
            <Cinema name="Cinéma Lumière" movies={movies} />
        </div>
    );
};

export default CinemaPage;