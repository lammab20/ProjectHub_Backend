import { IUser } from "../model/IUser";
import { WebSocket, WebSocketServer } from "ws";
import { WSHandler } from "./WSHandler";
import {WsLogic} from "./service/WsLogic";

export class WebSocketService {
    private readonly wss: WebSocketServer;
    private readonly wsHandler: WSHandler;
    private readonly connections: Map<WebSocket, IUser | undefined> = new Map();
    private readonly wsLogic: WsLogic;

    constructor(readonly port?:number){
        this.wss = new WebSocketServer({port: 8080});
        this.wsHandler = new WSHandler(this.connections);
        this.wsLogic = WsLogic.getInstance(this.wsHandler);
        this.setupConnection();

        console.log(`✅ WebSocket Server läuft auf ws://localhost:${8080}`);
    }


    private setupConnection() {
        this.wss.on("connection", (ws) => {
            this.connections.set(ws,undefined);
            this.wsHandler.setupHandler(ws);
            console.log(`✅ HALLOOO`);
        })
    }
}
