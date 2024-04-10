import { options } from "src/models/options.model";
import { statsPatient } from "src/models/stats/statsPatient.model";
import { QUIZ_LIST } from "../quiz-list.mock";

export const STATS_PATIENT_MAURICE: statsPatient = {
    options: [options.image, options.son],
    nbQuizDone: 2,
    meanScore: 1.5,
    quizDone: [QUIZ_LIST[0], QUIZ_LIST[1]],
    nbAttemptForEachQuizDone: [2,1]
}