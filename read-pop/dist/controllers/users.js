"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
const __1 = require("..");
async function getUser(req, res) {
    try {
        const bearer = req.headers["authorization"];
        const token = bearer?.split(" ")[1];
        const response = await fetch("http://localhost:8080/get-user-by-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(__1.CRUD_MS_ID + ":" + __1.CRUD_MS_SECRET).toString("base64")} `,
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
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
