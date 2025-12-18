"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.post("/get-token", middlewares_1.isAuth, authentication_1.login);
};
