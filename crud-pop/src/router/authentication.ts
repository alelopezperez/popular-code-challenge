import express from "express";
import { login, register } from "../controllers/authentication";

import { validateCred } from "../middlewares";

export default (router: express.Router) => {
  router.post("/create-profile", validateCred, register);
  router.post("/get-token", validateCred, login);
};
