import {WSHandler} from "../WSHandler";
import {IUserWS} from "../models/IUserWS";
import {WebSocket} from "ws";
import {mockUsers} from "../../mock-daten/UserMock";

export class WsLogic{
    private static instance: WsLogic;

    private constructor(private wsHandler: WSHandler) {
    }

    public static getInstance(newWsHandler?: WSHandler) {
        if(!WsLogic.instance && newWsHandler){
            WsLogic.instance = new WsLogic(newWsHandler);
        }

        return this.instance;
    }

    handleLogin(user: IUserWS, socket: WebSocket) {
        this.wsHandler.login(socket, user);
        this.wsHandler.sendMessage(socket, {type: "LOGIN", payload: user}); //ans frontend dass er jetzt eingefügt
        //this.handleUserList();

        let payload;

        if(user.role === "ADMIN"){
            payload = mockUsers;
        } else {
            payload = mockUsers.filter(t => t.email === user.email);
        }

        console.log(`✅ MESSAGE SENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! hi`);
        console.log("users: ", payload);
        this.wsHandler.sendMessage(socket, {type: "USER_LIST", payload: payload})
        //this.wsHandler.sendToAll({type: "USER_LIST", payload: this.wsHandler.getUsers()});
    }

    handleUserList() {
        this.wsHandler.sendToAll({type: "USER_LIST", payload: this.wsHandler.getUsers()});
    }

    handleLogout(socket: WebSocket) {
        this.wsHandler.login(socket, undefined);
        this.handleUserList();
    }
}