import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {IUser} from "../model/IUser";
import {isTokenBlacklisted} from "../helper/TokenBlacklist";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";


export interface AuthRequest extends Request {
    user?: IUser; // Typisierung von req.user
}

export function authenticate (req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).json({ message: "No token provided" });
        return;
    }
    if (isTokenBlacklisted(authHeader)) {
        res.status(401).json({ message: "Token is blacklisted" });
        return;
    }

    const token = authHeader.split(" ")[1];
    try {
        req.user = jwt.verify(token, SECRET_KEY) as IUser; // Der Token wird hier in das IUser-Objekt umgewandelt
        next();
    } catch (err) {
        res.sendStatus(401).json({ message: "Invalid token" });
        return;
    }
};

