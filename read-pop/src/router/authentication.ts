import express from "express";
import { login } from "../controllers/authentication";

import { isAuth } from "../middlewares";

export default (router: express.Router) => {
  router.post("/get-token", isAuth, login);
};
