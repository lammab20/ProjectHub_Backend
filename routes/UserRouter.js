"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserMock_1 = require("../mock-daten/UserMock");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Geschützte Route: Eigene Daten abrufen
router.get("/myData", authMiddleware_1.authenticate, (req, res) => {
    const user = UserMock_1.mockUsers.find((u) => u.id === req.user.id);
    if (!user) {
        res.sendStatus(404).json({ message: "User not found" });
        return;
    }
    res.json(user);
});
// Alle User abrufen (nur für Admins)
router.get("/allUsers", authMiddleware_1.authenticate, (req, res) => {
    if (req.user.role !== "ADMIN") {
        res.sendStatus(403).json({ message: "Forbidden" });
        return;
    }
    res.json(UserMock_1.mockUsers);
});
exports.default = router;
