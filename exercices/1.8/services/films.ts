import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    isFavorite: false,
    budget: 160,
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl: "https://th.bing.com/th/id/R.68ef29eab90c100d6c5e6558694f902c?rik=4amo10HRS%2fY9DA&pid=ImgRaw&r=0",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "The Wachowskis",
    duration: 136,
    isFavorite: false,
    budget: 63,
    imageUrl: "https://tse1.mm.bing.net/th/id/OIP.rZdNNSeHnwC-LuwpE1EYFgHaLI?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    isFavorite: false,
    budget: 165,
    imageUrl: "https://tse4.mm.bing.net/th/id/OIP.n-lW5hhF0w9CCmLzfl6aRAHaK-?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
];

/**
 * Return all films or films whose duration is greater than or equal to the provided minimum.
 * @param minimumDuration optional minimum duration in minutes; when undefined returns all films
 * @returns Array of Film matching the filter
 */
function readAllFilms(minimumDuration?: number): Film[] {
  const films = parse(jsonDbPath, defaultFilms);
  if (minimumDuration === undefined) {
    return films;
  }

  const filteredFilms = films.filter(
    (film) => film.duration >= minimumDuration
  );
  return filteredFilms;
}

/**
 * Find and return a film by its numeric id.
 * @param id film id to look up
 * @returns the Film if found, otherwise undefined
 */
function readOneFilm(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  return films.find((film) => film.id === id); //films.find(...) returns Film|undefined
}

/**
 * Create a new film, assign a new id, persist to storage and return the created film.
 *
 * Note: newFilm is expected to contain only valid NewFilm attributes. Extra or invalid
 * properties are not checked here and will be merged/persisted at runtime unless validated beforehand.
 *
 * @param newFilm data for the film to create (without id)
 * @returns the created Film with assigned id
 */
function createOneFilm(newFilm: NewFilm): Film {
  const films = parse(jsonDbPath, defaultFilms);

  const nextId =
    films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;
  const addedFilm: Film = { id: nextId, ...newFilm, isFavorite: false };
  films.push(addedFilm);
  serialize(jsonDbPath, films);

  return addedFilm;
}

/**
 * Delete a film by id, persist changes and return the deleted film.
 * @param id id of the film to delete
 * @returns the deleted Film if it existed, otherwise undefined
 */
function deleteOneFilm(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === id);
  if (index === -1) {
    return undefined;
  }

  const deletedFilm = films.splice(index, 1);
  serialize(jsonDbPath, films);

  return deletedFilm[0];
}

/**
 * Update a film by merging provided partial fields, persist changes and return the updated film.
 *
 * Note: partialNewFilm is expected to contain only valid NewFilm attributes. Extra or invalid
 * properties are not checked here and will be merged at runtime unless validated beforehand.
 *
 * @param id id of the film to update
 * @param partialNewFilm partial fields to apply to the existing film (only NewFilm keys expected)
 * @returns the updated Film if it existed, otherwise undefined
 */
function updateOneFilm(
  id: number,
  partialNewFilm: Partial<Omit<Film, "id">>
): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((f) => f.id === id);
  if (index === -1) {
    return undefined;
  }

  const updatedFilm: Film = { ...films[index], ...partialNewFilm };

  films[index] = updatedFilm;
  serialize(jsonDbPath, films);

  return updatedFilm;
}

export {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};
