import express from "express";
import { CRUD_MS_ID, CRUD_MS_SECRET } from "..";

export async function validateCred(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  console.log("middle");
  let autherHeader = req.headers["authorization"];
  if (!autherHeader) {
    return res.sendStatus(403);
  }
  const [scheme, credentials] = autherHeader.split(" ");

  if (scheme !== "Basic") {
    return res.sendStatus(403);
  }
  const decoded = Buffer.from(credentials, "base64").toString("utf8");

  const [crud_ms_id, crud_ms_secret] = decoded.split(":");

  if (crud_ms_id !== CRUD_MS_ID || crud_ms_secret !== CRUD_MS_SECRET) {
    console.log(crud_ms_id !== CRUD_MS_ID || crud_ms_secret !== crud_ms_secret);
    return res.sendStatus(403);
  }
  next();
}
