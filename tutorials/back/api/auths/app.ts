import express, { ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import drinksRouter from "./routes/drinks";
import authsRouter from "./routes/auths";

const app = express();

app.use((_req, _res, next) => {
  console.log("I'm an application-level middleware!");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/drinks", drinksRouter);
app.use("/auths", authsRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  return res.status(500).send("Something broke!");
};

app.use(errorHandler);


export default app;
