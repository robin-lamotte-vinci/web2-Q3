import { RequestHandler } from "express";

const stats: Record<string, number> = {};
const requestCounterMiddleware: RequestHandler = (req, _res, next) => {
    const currentOperation = `${req.method} ${req.path}`;
    const currentOperationCounter = stats[currentOperation];

    if (currentOperationCounter === undefined) stats[currentOperation] = 0;
    stats[currentOperation]++;

    const statsMessage = `Request counter : \n${Object.keys(stats)
        .map((operation) => `- ${operation} : ${stats[operation]}`)
        .join("\n")}
        `;
    console.log(statsMessage);
    next();
};

export { requestCounterMiddleware };