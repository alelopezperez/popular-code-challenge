import express from "express";
import http from "http";
//import bodyParser from "body-parser";
import cookieParse from "cookie-parser";
import compression from "compression";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(compression());
app.use(cookieParse());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app);
server.listen(3001, () => {
  console.log("Server running on http://localhost:3001/");
});

const MONGO_URL =
  "mongodb://mongo:lrRVqlojdFpvccFcudIcqobTjjFohcas@caboose.proxy.rlwy.net:28307";

mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

export const CRUD_MS_URL = !process.env.DEV_ENV
  ? "https://crud.local"
  : "http://localhost:3000";
export const CRUD_MS_ID = process.env.CRUD_MS_ID;
export const CRUD_MS_SECRET = process.env.CRUD_MS_SECRET;

console.log(CRUD_MS_URL);
app.use("/", router());
