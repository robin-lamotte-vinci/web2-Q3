import { Router } from "express";
import { readComments, createComment } from "../services/comments";
import { authorize } from "../utils/auths";
import { containsOnlyExpectedKeys } from "../utils/validate";
import { isNewComment } from "../utils/type-guards";

const router = Router();

const expectedKeys = [
    "id",
    "idFilm",
    "username",
    "comment",
];

/* Read all the comments
   GET /comments?order=title : ascending order by title
   GET /books?order=-title : descending order by title
*/
router.get("/", authorize, (req, res) => {
  if (req.query.id_film && typeof req.query.id_film !== "string") {
    return res.sendStatus(400);
  }
  const idFilm = req.query.id_film ? parseInt(req.query.id_film) : undefined;
  const comments = readComments(idFilm);
  return res.json(comments);
});

// Create a comment to be added
router.post("/", authorize, (req, res) => {
  const body: unknown = req.body;

  if (!isNewComment(body) || !containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }

  const addedComment = createComment(body);
  if (!addedComment) {
    return res.sendStatus(404);
  }
  return res.json(addedComment);
});

export default router;