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
router.get("/project/:id", authMiddleware_1.authenticate, (req, res) => {
    // Extrahieren der ID aus der URL
    const projectId = parseInt(req.params.id);
    // Suche das Projekt anhand der ID in den mock-Daten
    const project = ProjectMock_1.mockProjects.find(p => p.id === projectId);
    // Wenn das Projekt nicht gefunden wurde
    if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
    }
    // Wenn das Projekt gefunden wurde, zurückgeben
    res.json(project);
});
//export default router;
module.exports = router;
