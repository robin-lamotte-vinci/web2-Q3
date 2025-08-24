import { useOutletContext } from "react-router-dom";
import type { MovieContext } from "../../types";
import AddMovieForm from "../AddMovieForm/AddMovieForm";

const AddMoviePage = () => {
  const { addMovie }: MovieContext = useOutletContext();

  return (
    <>
      <h1>Add Movie Page</h1>
      <br />
      <AddMovieForm addMovie={addMovie} />

      <br />
    </>
  );
};

export default AddMoviePage;
