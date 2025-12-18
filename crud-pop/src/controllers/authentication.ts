import express from "express";
import { createUser, getUserByEmail } from "../db/user";
import { authentication, random } from "../auth";

export async function login(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password +authentication.sessionToken",
    );
    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication!.salt, password);

    if (user.authentication?.password !== expectedHash) {
      return res.sendStatus(403);
    }

    res.cookie("CRUD-MS-TOKEN", user.authentication?.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    console.log(user);

    return res.status(200).json({ token: user.authentication?.sessionToken });
  } catch {
    return res.sendStatus(500);
  }
}
export async function register(req: express.Request, res: express.Response) {
  try {
    const {
      email,
      password,
      username,
      name,
      lastName,
      cellphone,
      adress: address,
    } = req.body;

    if (
      !email ||
      !password ||
      !username ||
      !name ||
      !lastName ||
      !cellphone ||
      !address
    ) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      name,
      lastName,
      address,
      cellphone,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    user.authentication!.sessionToken = authentication(
      salt,
      user._id.toString(),
    );

    await user.save();

    return res.status(200).json({ token: user.authentication?.sessionToken });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
