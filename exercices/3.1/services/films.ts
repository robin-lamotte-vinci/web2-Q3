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
    budget: 160000000,
    descritpion: "A thief who steals corporate secrets through dream-sharing technology.",
    imageUrl: "https://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    duration: 175,
    budget: 6000000,
    descritpion: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    imageUrl: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    duration: 154,
    budget: 8000000,
    descritpion: "The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence and redemption.",
    imageUrl: "https://image.tmdb.org/t/p/original/dM2w364MScsjFf8pfMbaWUcWrR.jpg"
  },
  {
    id: 4,
    title: "Spirited Away",
    director: "Hayao Miyazaki",
    duration: 125,
    descritpion: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods and spirits.",
    imageUrl: "https://image.tmdb.org/t/p/original/oRvMaJOmapypFUcQqpgHMZA6qL9.jpg"
  }
];

function readAllFilms(): Film[] {
  const films = parse(jsonDbPath, defaultFilms);
  return films;
}

function readFilmById(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((f) => f.id === id);
  return film;
}

function createFilm(newFilm: NewFilm): Film {
  const films = parse(jsonDbPath, defaultFilms);
  const nextId = films.reduce((acc, f) => (f.id > acc ? f.id : acc), 0) + 1;
  const film: Film = { ...newFilm, id: nextId };
  const updatedFilms = [...films, film];
  serialize(jsonDbPath, updatedFilms);
  return film;
}


export { readAllFilms, readFilmById, createFilm };
