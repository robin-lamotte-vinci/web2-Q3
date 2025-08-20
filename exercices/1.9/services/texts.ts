import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import { Text, NewText } from "../types";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/texts.json");

const defaultTexts: Text[] = [
  {
    id: "967979ee-4c4b-4f93-920b-115976fa4abb",
    content: "The quick brown fox jumps over the lazy dog.",
    level: "easy",
  },
  {
    id: "45a3397c-d9bd-440b-8099-4346a38d1428",
    content: "A journey of a thousand miles begins with a single step.",
    level: "medium",
  },
  {
    id: "98c72e0e-db05-442a-b035-061f56f7e7f8",
    content: "To be, or not to be, that is the question.",
    level: "hard",
  },
];

/**
 * Return all texts or those matching the provided level.
 * @param level optional level filter ("easy" | "medium" | "hard")
 * @returns Array of Text matching the filter
 */
function readAllTexts(level?: Text["level"]): Text[] {
  const texts = parse(jsonDbPath, defaultTexts);
  if (level === undefined) return texts;
  return texts.filter((t) => t.level === level);
}

/**
 * Find a text by id.
 * @param id text id to look up
 * @returns the Text if found, otherwise undefined
 */
function readOneText(id: string): Text | undefined {
  const texts = parse(jsonDbPath, defaultTexts);
  return texts.find((t) => t.id === id);
}

/**
 * Create a new text, persist it and return the created resource.
 *
 * Note: newText is expected to contain only valid NewText attributes. The service
 * assumes the caller has already validated and cleaned the input.
 *
 * @param newText data for the text to create (without id)
 * @returns the created Text with assigned id
 */
function createOneText(newText: NewText): Text  {
  const texts = parse(jsonDbPath, defaultTexts);
  
  const id: string = uuidv4();
  const created: Text = { id: uuidv4(), ...newText };
  texts.push(created);
  serialize(jsonDbPath, texts);
  return created;
}

/**
 * Delete a text by id, persist changes and return the deleted resource.
 * @param id id of the text to delete
 * @returns the deleted Text if it existed, otherwise undefined
 */
function deleteOneText(id: string): Text | undefined {
  const texts = parse(jsonDbPath, defaultTexts);
  const index = texts.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  const deleted = texts.splice(index, 1);
  serialize(jsonDbPath, texts);
  return deleted[0];
}

/**
 * Replace an existing text with the provided newText and persist changes.
 *
 * Note: newText is expected to contain only valid NewText attributes. The service
 * assumes the caller has already validated and cleaned the input.
 *
 * @param id id of the text to replace
 * @param newText full replacement data (without id)
 * @returns the replaced Text if it existed, otherwise undefined
 */
function replaceOneText(id: string, newText: NewText): Text | undefined {
  const texts = parse(jsonDbPath, defaultTexts);
  const index = texts.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  const replaced: Text = { id, ...newText };
  texts[index] = replaced;
  serialize(jsonDbPath, texts);
  return replaced;
}

export {
  readAllTexts,
  readOneText,
  createOneText,
  deleteOneText,
  replaceOneText,
};