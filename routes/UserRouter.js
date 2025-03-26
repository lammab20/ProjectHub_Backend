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
    const user = UserMock_1.mockUsers.find((u) => { var _a; return u.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json(user);
});
// Alle User abrufen (nur für Admins)
router.get("/allUsers", authMiddleware_1.authenticate, (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "ADMIN") {
        res.status(403).json({ message: "Forbidden" });
        return;
    }
    res.json(UserMock_1.mockUsers);
});
//export default router;
module.exports = router;
