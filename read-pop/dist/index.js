"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUD_MS_SECRET = exports.CRUD_MS_ID = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
//import bodyParser from "body-parser";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
server.listen(8081, () => {
    console.log("Server running on http://localhost:8081/");
});
const MONGO_URL = "mongodb://mongo:lrRVqlojdFpvccFcudIcqobTjjFohcas@caboose.proxy.rlwy.net:28307";
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on("error", (error) => console.log(error));
exports.CRUD_MS_ID = process.env.CRUD_MS_ID;
exports.CRUD_MS_SECRET = process.env.CRUD_MS_SECRET;
app.use("/", (0, router_1.default)());
