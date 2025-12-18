import crypto from "crypto";

const CRUD_MS_SECRET = "TEMPCHANGE";
export function random() {
  return crypto.randomBytes(128).toString("base64");
}
export function authentication(salt: string, password: string) {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(CRUD_MS_SECRET)
    .digest("hex");
}
