import {IUser} from "../../model/IUser";


export type TType = "LOGIN" | "LOGOUT" | "TRAINER_LIST" | "USER_LIST";
export type TPayload = | IUser | string | IUser[];

export interface IMessage {
    type: TType;
    payload?: TPayload;
    token?:string
}