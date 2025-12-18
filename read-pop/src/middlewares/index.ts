import express from "express";

export async function isAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  next();
}
