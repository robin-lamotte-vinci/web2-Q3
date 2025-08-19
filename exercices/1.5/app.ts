import express from "express";

import filmRouter from "./routes/films";
import { requestCounterMiddleware } from "./utils/counter";

const app = express();

/* Middleware to count the number of GET requests */
let requestCounter = 0;
app.use((req, _res, next) => {
  if (req.method === "GET") {
    requestCounter++;
    console.log(`GET counter: ${requestCounter}`);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(requestCounterMiddleware);

app.use("/films", filmRouter);

export default app;
