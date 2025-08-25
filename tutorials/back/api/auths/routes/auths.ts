/* eslint-disable @typescript-eslint/no-misused-promises */
/* 
In Express V4, asynchronous functions are not fully supported in TypeScript 
(only void return type for RequestHandler is allowed). 
In Express V5, this issue has been addressed, but V5 is still in beta. 
Consequently, the ESLint rule "no-misused-promises" is disabled. */

import { Router } from "express";
import { isPotentialUser } from "../utils/type-guards";
import { login, register } from "../services/users";

const router = Router();

/* Register a user */
router.post("/register", async (req, res) => {
  const body: unknown = req.body;
  if (!isPotentialUser(body)) {
    return res.sendStatus(400);
  }

  const { username, password } = body;

  const authenticatedUser = await register(username, password);

  if (!authenticatedUser) {
    return res.sendStatus(409);
  }

  return res.json(authenticatedUser);
});

/* Login a user */
router.post("/login", async (req, res) => {
    const body: unknown = req.body;
    if (!isPotentialUser(body)) {
        return res.sendStatus(400);
    }

    const { username, password } = body;

    const authenticatedUser = await login(username, password);

    if (!authenticatedUser) {
        return res.sendStatus(401);
    }

    return res.json(authenticatedUser);
    
});

export default router;