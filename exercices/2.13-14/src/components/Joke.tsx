import { useEffect, useState } from "react";
import "./Joke.css"; // Ajoute l'import du CSS

const Joke = () => {
    const [joke, setJoke] = useState("");
    const [category, setCategory] = useState("");

    const fetchJoke = () => {
        fetch("https://v2.jokeapi.dev/joke/Any?type=single").then((response) => {
            if (!response.ok) {
                throw new Error(
                    `fetch error = ${response.status} : ${response.statusText}`
                );
            }
            return response.json();
        })
        .then((j) => {
            setJoke(j.joke);
            setCategory(j.category);
        })
        .catch((err) => {
            console.error("Joke::error: ", err);
        });
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <div className="joke-container">
            <div className="joke-category">{category}</div>
            <div className="joke-text">{joke}</div>
            <button className="joke-refresh" onClick={fetchJoke}>Nouvelle blague</button>
        </div>
    );
}

export default Joke;