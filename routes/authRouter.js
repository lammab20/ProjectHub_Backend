"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserMock_1 = require("../mock-daten/UserMock");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const router = express_1.default.Router();
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";
// POST-Route für Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = UserMock_1.mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
        res.sendStatus(401).json({ error: "Invalid credentials" });
        return;
    }
    // JWT Token erzeugen
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    // Token und User-Daten zurückgeben
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});
exports.default = router;
