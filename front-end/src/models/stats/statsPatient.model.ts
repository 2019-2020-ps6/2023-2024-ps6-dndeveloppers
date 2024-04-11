import { Quiz } from "../quiz.model";

export interface statsPatient {
    options: boolean[],
    nbQuizDone: number,
    meanScore: number,
    nbAttemptForEachQuizDone: number[]
}