export type TStatus = "OPEN" | "CLOSED";
export type TSkillLevel = "BEGINNER"| "INTERMEDIATE" | "ADVANCED";

export interface IProject{
    id: number;
    projectName: string;
    description: string;
    firmaName: string;
    startDatum: Date;
    endDatum: Date;
    status: TStatus;
    skillLevel: TSkillLevel;
}