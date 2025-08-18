import { Router } from "express";
import { Film } from "../types";

const router = Router();

const defaultFilms: Film[] = [
    {
        id: 1,
        title: "Inception",
        director: "Christopher Nolan",
        duration: 148,
        budget: 160,
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        imageUrl: "https://example.com/inception.jpg"
    },
    {
        id: 2,
        title: "The Matrix",
        director: "The Wachowskis",
        duration: 136,
        budget: 63,
        imageUrl: "https://example.com/matrix.jpg"
    },
    {
        id: 3,
        title: "Interstellar",
        director: "Christopher Nolan",
        duration: 169,
        budget: 165,
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    }
];

router.get("/", (_req, res) => {
    return res.json(defaultFilms);
});

export default router;