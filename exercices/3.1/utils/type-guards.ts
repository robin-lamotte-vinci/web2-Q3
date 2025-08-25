/**
 * This file contains type guards for typescript
 * @param value
 * @returns
 */

import { NewComment, NewFilm } from "../types";

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

/* Check if the value is a NewFilm and inform typescript of this */
const isNewFilm = (data: unknown): data is NewFilm => {
  if (
    !data ||
    typeof data !== "object" ||
    !("title" in data) ||
    !("director" in data) ||
    !("duration" in data) ||
    typeof data.title !== "string" ||
    typeof data.director !== "string" ||
    typeof data.duration !== "number" ||
    !data.title.trim() ||
    !data.director.trim() ||
    data.duration <= 0
  ) {
    return false;
  }

  if (
    "budget" in data &&
    (typeof data.budget !== "number" || data.budget < 0)
  ) {
    return false;
  }

  if (
    "description" in data &&
    (typeof data.description !== "string" || !data.description.trim())
  ) {
    return false;
  }

  if (
    "imageUrl" in data &&
    (typeof data.imageUrl !== "string" || !data.imageUrl.trim())
  ) {
    return false;
  }

  return true;
};

/* Check if the value is a NewComment and inform typescript of this */
const isNewComment = (data: unknown): data is NewComment => {
  if (
    !data ||
    typeof data !== "object" ||
    !("idFilm" in data) ||
    !("username" in data) ||
    !("comment" in data) ||
    typeof data.idFilm !== "number" ||
    typeof data.username !== "string" ||
    typeof data.comment !== "string" ||
    !data.username.trim() ||
    !data.comment.trim()
  ) {
    return false;
  }
  return true;
};

export { isString, isNumber, isNewFilm, isNewComment };
