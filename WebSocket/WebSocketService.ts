import { IUser } from "../model/IUser";
import { WebSocket, WebSocketServer } from "ws";
import { WSHandler } from "./WSHandler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export class WebSocketService {
    private readonly wss: WebSocketServer;
    private readonly wsHandler: WSHandler;
    private readonly connections: Map<WebSocket, IUser | undefined> = new Map();

    constructor(port: number = 8080) {
        this.wss = new WebSocketServer({ port });
        this.wsHandler = new WSHandler(this.connections);
        this.setupConnection();
    }

    private setupConnection() {
        this.wss.on("connection", (ws, req) => {
            // 🔥 Token aus der URL extrahieren
            const token = new URL(req.url!, `http://localhost:${this.wss.options.port}`).searchParams.get("token");

            if (!token) {
                ws.send(JSON.stringify({ error: "No token provided" }));
                ws.close();
                return;
            }

            try {
                // 🔥 Token verifizieren
                const decoded = jwt.verify(token, SECRET_KEY) as IUser;
                this.connections.set(ws, decoded);

                // ✅ WebSocket-Handler für diesen User starten
                this.wsHandler.setupHandler(ws);

                console.log(`✅ WebSocket verbunden: ${decoded.email}`);
                ws.send(JSON.stringify({ message: "WebSocket verbunden!" }));
            } catch (error) {
                console.log("❌ Ungültiges Token", error);
                ws.send(JSON.stringify({ error: "Invalid token" }));
                ws.close();
            }
        });

        // 🔥 WebSocket-Fehler behandeln
        this.wss.on("error", (err) => {
            console.error("WebSocket-Server-Fehler:", err);
        });
    }
}
