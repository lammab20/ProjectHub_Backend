"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectMock_1 = require("../mock-daten/ProjectMock");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Geschützte Route: Projekte abrufen
router.get("/allProjects", authMiddleware_1.authenticate, (req, res) => {
    res.json(ProjectMock_1.mockProjects);
});
exports.default = router;
