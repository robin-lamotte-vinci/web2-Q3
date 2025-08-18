import { Router } from "express";
import { Film } from "../types";
import { isNewFilm } from "../utils/type-guards";

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

router.get("/", (req, res) => {
  if (!req.query["minimum-duration"]) {
    return res.json(defaultFilms);
  }

  const minimumDuration = Number(req.query["minimum-duration"]);
  const filteredFilms = defaultFilms.filter(
    (film) => film.duration >= minimumDuration
  );
  return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = defaultFilms.find((film) => film.id === id);

  if (!film) {
    return res.status(404);
  }

  return res.json(film);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;

  if (!isNewFilm(body)) {
    return res.sendStatus(400);
  }

  const { title, director, duration, budget, description, imageUrl } = body;

  const nextId =
    defaultFilms.reduce(
      (maxId, film) => (film.id > maxId ? film.id : maxId),
      0
    ) + 1;

  const newFilm: Film = {
    id: nextId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  };

  defaultFilms.push(newFilm);

  return res.json(newFilm);
});

export default router;
