/**
 * This file contains type guards for typescript
 * @param value
 * @returns
 */

import { NewDrink, NewPizza } from "../types";

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
 * Check if the body is a new pizza
 * @param body
 * @returns boolean
 */
const isNewPizza = (body: unknown): body is NewPizza => {
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("content" in body) ||
    body.title !== "string" ||
    body.content !== "string" ||
    !body.title.trim() ||
    !body.content.trim()
  ) {
    return false;
  }

  return true;
};

/**
 * Check if the body is a new drink
 * @param body
 * @returns boolean
 */
const isNewDrink = (body: unknown): body is NewDrink => {
  if (!body || typeof body !== "object") return false;

  if (
    !("title" in body) ||
    !("image" in body) ||
    !("volume" in body) ||
    !("price" in body) ||
    typeof body.title !== "string" ||
    typeof body.image !== "string" ||
    typeof body.volume !== "number" ||
    typeof body.price !== "number" ||
    !body.title.trim() ||
    !body.image.trim() ||
    body.volume <= 0 ||
    body.price <= 0
  ) {
    return false;
  }

  return true;
};

/**
 * Check if the body is a partial new drink
 * @param body
 * @returns boolean
 */
const isPartialNewDrink = (body: unknown): body is Partial<NewDrink> => {
  if (!body || typeof body !== "object") return false;

  if (
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("image" in body &&
      (typeof body.image !== "string" || !body.image.trim())) ||
    ("volume" in body &&
      (typeof body.volume !== "number" || body.volume <= 0)) ||
    ("price" in body && (typeof body.price !== "number" || body.price <= 0))
  ) {
    return false;
  }

  return true;
};

export { isString, isNumber, isNewPizza, isNewDrink, isPartialNewDrink };
