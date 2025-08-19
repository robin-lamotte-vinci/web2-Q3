import { Router } from "express";
import path from "node:path";
import { Film, NewFilm } from "../types";
import { isNewFilm } from "../utils/type-guards";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");

import { containsOnlyExpectedKeys } from "../utils/validate";

const router = Router();

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "The Wachowskis",
    duration: 136,
    budget: 63,
    imageUrl: "https://example.com/matrix.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
];

const expectedKeys = [
  "title",
  "director",
  "duration",
  "budget",
  "description",
  "imageUrl",
];

router.get("/", (req, res) => {
  const allowedQueries = ["minimum-duration"];

  if (!containsOnlyExpectedKeys(req.query, allowedQueries)) {
    return res.sendStatus(400);
  }

  const films = parse(jsonDbPath, defaultFilms);

  if (!req.query["minimum-duration"]) {
    return res.json(films);
  }

  const minimumDuration = Number(req.query["minimum-duration"]);
  if (Number.isNaN(minimumDuration) || minimumDuration <= 0) {
    return res.sendStatus(400);
  }

  const filteredFilms = films.filter(
    (film) => film.duration >= minimumDuration
  );
  return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const films = parse(jsonDbPath, defaultFilms);

  const film = films.find((film) => film.id === id);

  if (!film) {
    return res.sendStatus(404);
  }

  return res.json(film);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;

  if (!isNewFilm(body)) {
    return res.sendStatus(400);
  }

  if (!containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }

  const films = parse(jsonDbPath, defaultFilms);

  const newFilm: NewFilm = body;

  const existingFilm = films.find(
    (film) =>
      film.title.toLowerCase() === newFilm.title.toLowerCase() &&
      film.director.toLowerCase() === newFilm.director.toLowerCase()
  );

  if (existingFilm) {
    return res.sendStatus(409);
  }

  const nextId =
    films.reduce(
      (maxId, film) => (film.id > maxId ? film.id : maxId),
      0
    ) + 1;

  const addedFilm: Film = { id: nextId, ...newFilm };

  films.push(addedFilm);
  serialize(jsonDbPath, films);

  return res.json(addedFilm);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const films = parse(jsonDbPath, defaultFilms);

  const index = films.findIndex((film) => film.id === id);

  if (index === -1) {
    return res.sendStatus(404);
  }

  const deletedFilm = films.splice(index, 1);
  serialize(jsonDbPath, films);

  return res.json(deletedFilm[0]);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const films = parse(jsonDbPath, defaultFilms);

  const filmToUpdate = films.find((f) => f.id === id);

  if (!filmToUpdate) {
    return res.sendStatus(404);
  }

  const body: unknown = req.body;

  if (!body || typeof body !== "object") {
    return res.sendStatus(400);
  }

  if (!containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }

  const candidate : Film = { ...filmToUpdate, ...body };

  if (!isNewFilm(candidate)) {
    return res.sendStatus(400);
  }

  const conflict = films.find(
    (f) =>
      f.id !== id &&
      f.title.toLowerCase() === candidate.title.toLowerCase() &&
      f.director.toLowerCase() === candidate.director.toLowerCase()
  );

  if (conflict) {
    return res.sendStatus(409);
  }

  films[films.indexOf(filmToUpdate)] = candidate;
  serialize(jsonDbPath, films);
  return res.send(candidate);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const films = parse(jsonDbPath, defaultFilms);

  const body: unknown = req.body;

  if (!isNewFilm(body)) {
    return res.sendStatus(400);
  }

  if (!containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }

  const index = films.findIndex((f) => f.id === id);

  const newFilm: NewFilm = body;

  const conflict = films.find(
    (f) =>
      f.id !== id &&
      f.title.toLowerCase() === newFilm.title.toLowerCase() &&
      f.director.toLowerCase() === newFilm.director.toLowerCase()
  );

  if (conflict) {
    return res.sendStatus(409);
  }

  if (index === -1) {
    const nextId =
      defaultFilms.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) +
      1;

    const addedFilm = { id: nextId, ...body };

    defaultFilms.push(addedFilm);

    return res.json(addedFilm);
  }

  const replaced: Film = { id, ...newFilm };

  defaultFilms[index] = replaced;

  return res.json(replaced);
});

export default router;
