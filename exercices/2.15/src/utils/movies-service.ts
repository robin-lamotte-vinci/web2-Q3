import type { Movie, NewMovie } from "../types";

const fetchAllMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch("/api/films");
    if (!response.ok)
      throw new Error(`Failed to fetch movies : ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("fetchAllMovies::error: ", err);
    throw err;
  }
};

const fetchOneMovie = async (id: number): Promise<Movie> => {
  try {
    const response = await fetch(`/api/films/${id}`);
    if (!response.ok)
      throw new Error(`Failed to fetch movie : ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("fetchOneMovie::error: ", err);
    throw err;
  }
};


const toggleMovieFavoriteRequest = async (id: number, isFavorite: boolean): Promise<Movie> => {
  try {
    const response = await fetch(`/api/films/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavorite: isFavorite }),
    });
    if (!response.ok)
      throw new Error(`Failed to update movie : ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updateMovieFavorite::error: ", err);
    throw err;
  }
};

const createMovie = async (newMovie: NewMovie): Promise<Movie> => {
  try {
    const response = await fetch("/api/films/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    if (!response.ok)
      throw new Error(`Failed to create movie : ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("createMovie::error: ", err);
    throw err;
  }
};


export { fetchAllMovies, fetchOneMovie, toggleMovieFavoriteRequest, createMovie };
