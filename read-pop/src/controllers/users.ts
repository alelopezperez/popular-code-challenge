import express from "express";
import { CRUD_MS_ID, CRUD_MS_SECRET, CRUD_MS_URL } from "..";

export async function getUser(req: express.Request, res: express.Response) {
  try {
    const bearer = req.headers["authorization"];
    const token = bearer?.split(" ")[1];

    const response = await fetch(`${CRUD_MS_URL}/get-user-by-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(CRUD_MS_ID + ":" + CRUD_MS_SECRET).toString("base64")} `,
      },
      body: JSON.stringify({
        token,
      }),
    });

    console.log(response);
    if (!response.ok) {
      return res.sendStatus(response.status);
    }
    const user = await response.json();
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
