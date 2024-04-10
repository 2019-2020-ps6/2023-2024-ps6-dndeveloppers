import { options } from "./options.model";
import { statsPatient } from "./stats/statsPatient.model";

export interface patient {
    lastName: string,
    firstName: string,
    age: number,
    options: options[],
    textSize: string,
    selfStats: statsPatient
}