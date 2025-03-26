import {IProject} from "../model/IProject";

export const mockProjects: IProject[] = [
    {
        id: 1,
        projectName: "Website Relaunch",
        description: "Relaunch einer bestehenden Website mit einem modernen Design.",
        firmaName: "TechCorp",
        startDatum: new Date("2025-03-01"),
        endDatum: new Date("2025-05-01"),
        status: "OPEN",
        skillLevel: "INTERMEDIATE",
    },
    {
        id: 2,
        projectName: "Mobile App Entwicklung",
        description: "Entwicklung einer App für die Verwaltung von Aufgaben.",
        firmaName: "AppDev Studio",
        startDatum: new Date("2025-04-10"),
        endDatum: new Date("2025-09-30"),
        status: "OPEN",
        skillLevel: "INTERMEDIATE",
    },
    {
        id: 3,
        projectName: "E-Commerce Plattform",
        description: "Entwicklung einer skalierbaren E-Commerce-Plattform.",
        firmaName: "Ecom Solutions",
        startDatum: new Date("2025-02-15"),
        endDatum: new Date("2025-08-15"),
        status: "OPEN",
        skillLevel: "BEGINNER",
    }
];
