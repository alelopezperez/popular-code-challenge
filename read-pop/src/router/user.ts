import express from "express";

import { getUser } from "../controllers/users";
import { isAuth } from "../middlewares";

export default (router: express.Router) => {
  router.get("/get-user", isAuth, getUser);
  router.get("/health", (req: express.Request, res: express.Response) => {
    return res.sendStatus(200);
  });
};
