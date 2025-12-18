"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
exports.authentication = authentication;
const crypto_1 = __importDefault(require("crypto"));
const CRUD_MS_SECRET = "TEMPCHANGE";
function random() {
    return crypto_1.default.randomBytes(128).toString("base64");
}
function authentication(salt, password) {
    return crypto_1.default
        .createHmac("sha256", [salt, password].join("/"))
        .update(CRUD_MS_SECRET)
        .digest("hex");
}
