import { Router } from "express";
import { createFilm, readAllFilms, readFilmById } from "../services/films";
import { authorize, isAdmin } from "../utils/auths";
import { containsOnlyExpectedKeys } from "../utils/validate";
import { isNewFilm } from "../utils/type-guards";

const router = Router();

const expectedKeys = [
  "id",
  "title",
  "director",
  "duration",
  "budget",
  "descritpion",
  "imageUrl",
];

// Read all the films
router.get("/", (_req, res) => {
  const films = readAllFilms();
  return res.json(films);
});

// Read the film identified by its id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = readFilmById(id);
  if (!film) return res.sendStatus(404);
  return res.json(film);
});

// Create a film to be added
router.post("/", authorize, isAdmin, (req, res) => {
  const body: unknown = req.body;

  if (!isNewFilm(body) || !containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }

  const addedFilm = createFilm(body);
  return res.json(addedFilm);
});

export default router;