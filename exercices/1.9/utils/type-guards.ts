/**
 * This file contains type guards for typescript
 */

import { NewText } from "../types";

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

const allowedLevels = ["easy", "medium", "hard"];

/**
 * Check if the body is a NewText
 * @param body
 * @returns boolean
 */
const isNewText = (body: unknown): body is NewText => {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  if (!("content" in b) || !("level" in b)) return false;
  if (!isString(b.content) || !b.content.trim()) return false;
  if (!isString(b.level) || !allowedLevels.includes(b.level)) return false;

  return true;
};

export { isString, isNumber, isNewText };
