import express, { Request, Response } from "express";
import {mockUsers} from "../mock-daten/UserMock"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

// POST-Route für Login
router.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        res.sendStatus(401).json({ error: "Invalid credentials" });
        return;
    }

    // JWT Token erzeugen
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    // Token und User-Daten zurückgeben
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

export default router;