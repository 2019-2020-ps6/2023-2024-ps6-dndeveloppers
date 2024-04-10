import { statsPatient } from "./stats/statsPatient.model";

export interface patient {
    lastName: string,
    firstName: string,
    age: number,
    options: boolean[],
    textSize: string,
    selfStats: statsPatient
}