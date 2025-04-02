import {IUser} from "../model/IUser";
import {Dispatcher} from "./Dispatcher";
import {OPEN, WebSocket} from "ws";

export class WSHandler {
    private readonly connections: Map<WebSocket, IUser | undefined>;

    constructor(connections: Map<WebSocket, IUser | undefined>) {
        this.connections = connections;
    }

    setupHandler(socket: WebSocket) {
        socket.on("message", (msg:string) => {
            Dispatcher.dispatch(JSON.parse(msg), socket);
        })

        socket.on("close", () => {
            this.connections.delete(socket);
        })
    }
}