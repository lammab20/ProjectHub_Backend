import express, { Request,Response} from "express";
import { mockProjects } from "../mock-daten/ProjectMock";
import {authenticate, AuthRequest} from "../middleware/authMiddleware";
import {IProject} from "../model/IProject";

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

router.post("/create", authenticate, (req: Request , res:Response) => {
    const { projectName, description, firmaName, startDatum, endDatum, status, skillLevel } = req.body;


    if (!projectName || !description || !firmaName || !startDatum || !endDatum || !status || !skillLevel) {
        res.status(400).json({ message: "Alle Felder sind erforderlich!" });
        return;
    }

    // **Maximale ID suchen und +1 setzen**
    const maxId = mockProjects.length > 0 ? Math.max(...mockProjects.map(p => p.id)) : 0;
    const newProject: IProject = {
        id: maxId + 1, // Neue ID
        projectName,
        description,
        firmaName,
        startDatum: new Date(startDatum),
        endDatum: new Date(endDatum),
        status,
        skillLevel
    };

    mockProjects.push(newProject); // In Datenbank speichern (Hier simuliert)

    res.status(201).json({ message: "Projekt erfolgreich erstellt!", project: newProject });
});


//export default router;
module.exports = router;