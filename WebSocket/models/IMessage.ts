import {IUserWS} from "./IUserWS";


export type TType = "LOGIN" | "LOGOUT" | "TRAINER_LIST" | "USER_LIST";
export type TPayload = | IUserWS | string | IUserWS[];

export interface IMessage {
    type: TType;
    payload?: TPayload;
    token?:string
}