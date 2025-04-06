import {IMessage} from "./models/IMessage";
import {WebSocket} from "ws";
import {IUser} from "../model/IUser";
import {WsLogic} from "./service/WsLogic";
import {log} from "node:util";
import {IUserWS} from "./models/IUserWS";

export class Dispatcher {
    static dispatch(msg: IMessage, socket: WebSocket){
        switch (msg.type) {
            case "LOGIN":
                WsLogic.getInstance().handleLogin(msg.payload as IUserWS, socket);
                console.log(`LOGIN EMPFANGEN !!!!!!!!!!!!!!`);
                console.log("payload: ", msg.payload)
                break;
            case "LOGOUT":
                WsLogic.getInstance().handleLogout(socket);
                break;
        }

    }
}

