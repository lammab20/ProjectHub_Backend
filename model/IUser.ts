import {TSkillLevel} from "./IProject";

export type TUser = "ADMIN" | "USER"

export interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: TUser;
    likedProjects: number[];
}