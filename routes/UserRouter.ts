import express, {Response} from "express";
import { mockUsers } from "../mock-daten/UserMock";
import { authenticate, AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

// Geschützte Route: Eigene Daten abrufen
router.get("/myData", authenticate, (req: AuthRequest, res: Response) => {
    const user = mockUsers.find((u) => u.id === req.user?.id);
    if (!user){
        res.sendStatus(404).json({ message: "User not found" });
        return;
    }
    res.json(user);
});

// Alle User abrufen (nur für Admins)
router.get("/allUsers", authenticate, (req: AuthRequest, res: Response, next) => {
    if (req.user?.role !== "ADMIN") {
        res.sendStatus(403).json({ message: "Forbidden" });
        return;
    }
    res.json(mockUsers);
});

export default router;
