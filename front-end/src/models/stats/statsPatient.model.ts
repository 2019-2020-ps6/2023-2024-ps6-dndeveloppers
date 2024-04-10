import { options } from "../options.model";
import { Quiz } from "../quiz.model";

export interface statsPatient {
    options: options[],
    nbQuizDone: number,
    meanScore: number,
    quizDone: Quiz[],
    nbAttemptForEachQuizDone: number[]
}