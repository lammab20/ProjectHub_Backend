import express, { Request, Response } from "express";
import {mockUsers} from "../mock-daten/UserMock"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {addToBlacklist} from "../helper/TokenBlacklist";

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "tungtungtungsahurSuperIdolde%ch4Ulong";

// POST-Route für Login
router.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
    }

    // JWT Token erzeugen
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "12h" });

    // Token und User-Daten zurückgeben
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

router.post("/logout", (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
       res.status(400).json({ message: "No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];
    addToBlacklist(token); // Speichert das Token als ungültig

    res.json({ message: "Logout erfolgreich" });
});

//export default router;
module.exports = router;