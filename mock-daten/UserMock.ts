import {IUser} from "../model/IUser";

export const mockUsers: IUser[] = [
    {
        id: 1,
        firstname: "Max",
        lastname: "Mustermann",
        email: "max.mustermann@example.com",
            password: "password123",
        role: "ADMIN",
        likedProjects: [101, 102, 103],
    },
    {
        id: 2,
        firstname: "Anna",
        lastname: "Müller",
        email: "anna.mueller@example.com",
        password: "password456",
        role: "USER",
        likedProjects: [104, 105],
    },
    {
        id: 3,
        firstname: "Peter",
        lastname: "Schmidt",
        email: "peter.schmidt@example.com",
        password: "password789",
        role: "USER",
        likedProjects: [106, 107, 108],
    }
];