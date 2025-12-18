import express from "express";
import {
  deleteUserById,
  getUserById,
  getUserBySessionToken,
  getUsers,
  updateUserById,
} from "../db/user";

export async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    const allUsers = await getUsers();
    return res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getUserByToken(
  req: express.Request,
  res: express.Response,
) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.sendStatus(403);
    }
    const user = await getUserBySessionToken(token);

    if (!user) {
      return res.sendStatus(403);
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function deleteUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    return res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function updateUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const patch = req.body;

    const user = await updateUserById(id, patch);
    if (!user) {
      return res.sendStatus(400);
    }

    console.log(user);

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
