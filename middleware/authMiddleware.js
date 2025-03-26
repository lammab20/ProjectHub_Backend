"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).json({ message: "No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1]; // "Bearer token"
    try {
        // Verifiziert den JWT und extrahiert die Benutzerinformationen
        req.user = jsonwebtoken_1.default.verify(token, SECRET_KEY); // Der Token wird hier in das IUser-Objekt umgewandelt
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.authenticate = authenticate;
