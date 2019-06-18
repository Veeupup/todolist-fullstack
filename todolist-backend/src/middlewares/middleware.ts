import express from "express";

export default function loggerMiddleware(
  request: express.Request,
  response: express.Response,
  next
): void {
  console.log(`${request.method} ${request.path}`);
  next();
}
