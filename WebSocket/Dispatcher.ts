import {IMessage} from "./models/IMessage";
import {WebSocket} from "ws";
import dotenv from "dotenv";
import {IUser} from "../model/IUser";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export class Dispatcher {
    private static connections: Map<WebSocket, IUser | undefined> = new Map();

    private static handleLogin(msg: IMessage, socket: WebSocket) {
        if (!msg.token) {
            socket.send(JSON.stringify({ error: "No token provided" }));
            return;
        }

        try {
            const decoded = jwt.verify(msg.token, SECRET_KEY) as IUser;
            this.connections.set(socket, decoded); // User speichern

            console.log(`✅ WebSocket-User angemeldet: ${decoded.email}`);
            socket.send(JSON.stringify({ type: "login", success: true, message: "Login successful!" }));
        } catch (error) {
            console.error("❌ Fehler: Ungültiges Token", error);
            socket.send(JSON.stringify({ error: "Invalid token" }));
        }
    }


    static dispatch(msg: IMessage, socket: WebSocket) {
        switch (msg.type) {
            case "LOGIN":
                this.handleLogin(msg, socket);
                break;
        }
    }


}

