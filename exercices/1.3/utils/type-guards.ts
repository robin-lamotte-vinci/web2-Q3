import { NewFilm } from "../types";

/**
 * Check if the value is a string and inform typescript of this
 * @param value
 * @returns
 */
const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

/* Check if the value is a number and inform typescript of this */
const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && isFinite(value);
};

/**
 * Check if the body is a new film
 * @param body
 * @returns boolean
 */
const isNewFilm = (body: unknown): body is NewFilm=> {
  if (!body || typeof body !== "object") return false;
  if (
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    !isString(body.title) ||
    !isString(body.director) ||
    !isNumber(body.duration) ||
    !body.title.trim() ||
    !body.director.trim() ||
    (body.duration <= 0)
  ) {
    return false;
  }

  if (
    ("budget" in body && (!isNumber(body.budget) || body.budget < 0)) ||
    ("description" in body && (!isString(body.description) || !body.description.trim())) ||
    ("imageUrl" in body && (!isString(body.imageUrl) || !body.imageUrl.trim()))
  ) {
    return false;
  }

  // Check for unexpected properties
  const allowedProperties = ["title", "director", "duration", "budget", "description", "imageUrl"];
  const bodyKeys = Object.keys(body);
  for (const key of bodyKeys) {
    if (!allowedProperties.includes(key)) {
      return false;
    }
  }

  return true;
};

export { isString, isNumber, isNewFilm };
