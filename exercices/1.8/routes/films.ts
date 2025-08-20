import { Router } from "express";
import { Film, NewFilm } from "../types";
import { isNewFilm } from "../utils/type-guards";
import { containsOnlyExpectedKeys } from "../utils/validate";
import {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
} from "../services/films";

const router = Router();

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

  if (!req.query["minimum-duration"]) {
    const films = readAllFilms();
    return res.json(films);
  }

  const minimumDuration = Number(req.query["minimum-duration"]);
  if (Number.isNaN(minimumDuration) || minimumDuration <= 0) {
    return res.sendStatus(400);
  }

  const filteredFilms = readAllFilms(minimumDuration);

  return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const film = readOneFilm(id);

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

  const films = readAllFilms();

  const newFilm: NewFilm = body;

  const existingFilm = films.find(
    (film) =>
      film.title.toLowerCase() === newFilm.title.toLowerCase() &&
      film.director.toLowerCase() === newFilm.director.toLowerCase()
  );

  if (existingFilm) {
    return res.sendStatus(409);
  }

  const addedFilm = createOneFilm(newFilm);
  return res.json(addedFilm);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const deletedFilm = deleteOneFilm(id);
  if (!deletedFilm) {
    return res.sendStatus(404);
  }

  return res.json(deletedFilm);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const filmToUpdate = readOneFilm(id);
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

  const candidate: Film = { ...filmToUpdate, ...body };
  if (!isNewFilm(candidate)) {
    return res.sendStatus(400);
  }

  const films = readAllFilms();
  const conflict = films.find(
    (f) =>
      f.id !== id &&
      f.title.toLowerCase() === candidate.title.toLowerCase() &&
      f.director.toLowerCase() === candidate.director.toLowerCase()
  );
  if (conflict) {
    return res.sendStatus(409);
  }

  const updatedFilm = updateOneFilm(id, body);
  return res.send(updatedFilm);
});

export default router;
