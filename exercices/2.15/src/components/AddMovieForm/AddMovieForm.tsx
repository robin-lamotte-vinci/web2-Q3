import { useState, type SyntheticEvent } from "react";
import type { NewMovie } from "../../types";
import "./AddMovieForm.css";
import { useNavigate } from "react-router-dom";

interface AddMovieFormProps {
  addMovie: (movie: NewMovie) => void;
}

const AddMovieForm = ({ addMovie }: AddMovieFormProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newMovie = {
      title: title,
      director: director,
      duration: parseInt(duration),
      imageUrl: imageUrl || undefined,
      description: description || undefined,
      budget: budget ? parseInt(budget) : undefined,
    };

    addMovie(newMovie);
    navigate("/movie-list");
    // setTitle("");
    // setDirector("");
    // setDuration("");
    // setImageUrl("");
    // setDescription("");
    // setBudget("");
  };

  return (
    <div className="add-movie-form__container">
      <form className="add-movie-form" onSubmit={handleSubmit}>
        <label>
          Titre
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Réalisateur
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </label>
        <label>
          Durée (minutes)
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </label>
        <label>
          URL de l'affiche
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </label>
        <label>
          Budget (€)
          <input
            type="number"
            min="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Ex: 10 (M)"
          />
        </label>
        <button type="submit">Ajouter le film</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
