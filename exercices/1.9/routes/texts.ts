import { Router } from "express";
import { Text, NewText } from "../types";
import { isNewText } from "../utils/type-guards";
import { containsOnlyExpectedKeys } from "../utils/validate";
import {
  readAllTexts,
  readOneText,
  createOneText,
  deleteOneText,
  replaceOneText,
} from "../services/texts";

const router = Router();

const expectedKeys = ["content", "level"];
const allowedQueries = ["level"];
const allowedLevels = ["easy", "medium", "hard"];
const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

router.get("/", (req, res) => {
  if (!containsOnlyExpectedKeys(req.query, allowedQueries as unknown as string[]))
    return res.sendStatus(400);

  const raw = req.query["level"];
  if (raw === undefined) {
    const all = readAllTexts();
    return res.json(all);
  }

  if (typeof raw !== "string") return res.sendStatus(400);
  if (!allowedLevels.includes(raw)) return res.sendStatus(400);

  const filtered = readAllTexts(raw as Text["level"]);
  return res.json(filtered);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!uuidV4Regex.test(id)) return res.sendStatus(400);

  const text = readOneText(id);
  if (!text) return res.sendStatus(404);
  return res.json(text);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (!isNewText(body)) return res.sendStatus(400);
  if (!containsOnlyExpectedKeys(body, expectedKeys as unknown as string[]))
    return res.sendStatus(400);

  const newText: NewText = body;
  const created = createOneText(newText);
  return res.status(201).json(created);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!uuidV4Regex.test(id)) return res.sendStatus(400);

  const deleted = deleteOneText(id);
  if (!deleted) return res.sendStatus(404);
  return res.json(deleted);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  if (!uuidV4Regex.test(id)) return res.sendStatus(400);

  const body: unknown = req.body;
  if (!isNewText(body)) return res.sendStatus(400);
  if (!containsOnlyExpectedKeys(body, expectedKeys as unknown as string[]))
    return res.sendStatus(400);

  const newText: NewText = body;
  const replaced = replaceOneText(id, newText);
  if (!replaced) return res.sendStatus(404);
  return res.json(replaced);
});

export default router;