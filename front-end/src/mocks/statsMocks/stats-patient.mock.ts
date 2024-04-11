import { statsPatient } from "src/models/stats/statsPatient.model";
import { QUIZ_LIST } from "../quiz-list.mock";

export const STATS_PATIENT_MAURICE: statsPatient = {
    options: [true],
    nbQuizDone: 2,
    meanScore: 1.5,
    nbAttemptForEachQuizDone: [2,1]
}

export const STATS_PATIENT_JOSEPH: statsPatient = {
    options: [true],
    nbQuizDone: 1,
    meanScore: 1,
    nbAttemptForEachQuizDone: [1]
}

export const STATS_PATIENT_NULL: statsPatient = {
    options: [true],
    nbQuizDone: 0,
    meanScore: 0,
    nbAttemptForEachQuizDone: [0]
}