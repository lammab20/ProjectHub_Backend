import {IUserWS, TUser} from "./models/IUserWS";
import {Dispatcher} from "./Dispatcher";
import {OPEN, WebSocket} from "ws";
import {IMessage} from "./models/IMessage";

export class WSHandler {
        private readonly connections: Map<WebSocket, IUserWS|undefined>;


        constructor(connections: Map<WebSocket, IUserWS | undefined>) {
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

        sendToAll(message: IMessage, role?: TUser) {
                this.connections.forEach((user, socket) => {
                        this.sendMessage(socket, message);
                })
        }

        sendMessage(socket: WebSocket, message: IMessage) {
                if(socket.readyState === OPEN){
                        socket.send(JSON.stringify(message));
                        console.log("Socket open message sent", message)
                }
        }

        login(socket: WebSocket, user: IUserWS | undefined) {
                if(socket.readyState === WebSocket.OPEN){
                        this.connections.set(socket, user);
                }
        }

        getUsers() {
                return [...this.connections.values()]
                    .filter(c => c !== undefined);
        }
}