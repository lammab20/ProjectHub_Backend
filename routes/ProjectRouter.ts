import express, {Response} from "express";
import { mockProjects } from "../mock-daten/ProjectMock";
import {authenticate, AuthRequest} from "../middleware/authMiddleware";

const router = express.Router();

// Geschützte Route: Projekte abrufen
router.get("/allProjects", authenticate, (req: AuthRequest, res: Response) => {
    res.json(mockProjects);
});

router.get("/project/:id", authenticate,(req: AuthRequest, res: Response) => {
    // Extrahieren der ID aus der URL
    const projectId = parseInt(req.params.id);

    // Suche das Projekt anhand der ID in den mock-Daten
    const project = mockProjects.find(p => p.id === projectId);

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