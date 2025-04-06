export type TUser = "ADMIN" | "USER"

export interface IUserWS{
    email: string,
    role:  TUser
}