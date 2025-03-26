import express, {Response} from "express";
import { mockProjects } from "../mock-daten/ProjectMock";
import {authenticate, AuthRequest} from "../middleware/authMiddleware";

const router = express.Router();

// Geschützte Route: Projekte abrufen
router.get("/allProjects", authenticate, (req: AuthRequest, res: Response) => {
    res.json(mockProjects);
});

export default router;
