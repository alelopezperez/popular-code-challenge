import express from "express";

import {
  deleteUser,
  getAllUsers,
  getUserByToken,
  updateUser,
} from "../controllers/users";
import { validateCred } from "../middlewares";

export default (router: express.Router) => {
  router.get("/all-users", validateCred, getAllUsers);
  router.post("/get-user-by-token", validateCred, getUserByToken);
  router.delete("/delete-user/:id", validateCred, deleteUser);
  router.patch("/update-user/:id", validateCred, updateUser);
};
