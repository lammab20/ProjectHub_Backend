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
router.post("/create", authMiddleware_1.authenticate, (req, res) => {
    const { projectName, description, firmaName, startDatum, endDatum, status, skillLevel } = req.body;
    if (!projectName || !description || !firmaName || !startDatum || !endDatum || !status || !skillLevel) {
        res.status(400).json({ message: "Alle Felder sind erforderlich!" });
        return;
    }
    // **Maximale ID suchen und +1 setzen**
    const maxId = ProjectMock_1.mockProjects.length > 0 ? Math.max(...ProjectMock_1.mockProjects.map(p => p.id)) : 0;
    const newProject = {
        id: maxId + 1, // Neue ID
        projectName,
        description,
        firmaName,
        startDatum: new Date(startDatum),
        endDatum: new Date(endDatum),
        status,
        skillLevel
    };
    ProjectMock_1.mockProjects.push(newProject); // In Datenbank speichern (Hier simuliert)
    res.status(201).json({ message: "Projekt erfolgreich erstellt!", project: newProject });
});
//export default router;
module.exports = router;
