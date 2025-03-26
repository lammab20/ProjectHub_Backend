"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const TokenBlacklist_1 = require("../helper/TokenBlacklist");
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).json({ message: "No token provided" });
        return;
    }
    if ((0, TokenBlacklist_1.isTokenBlacklisted)(authHeader)) {
        res.status(401).json({ message: "Token is blacklisted" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        req.user = jsonwebtoken_1.default.verify(token, SECRET_KEY); // Der Token wird hier in das IUser-Objekt umgewandelt
        next();
    }
    catch (err) {
        res.sendStatus(401).json({ message: "Invalid token" });
        return;
    }
}
;
