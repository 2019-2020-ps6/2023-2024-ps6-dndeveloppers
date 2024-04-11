import { statsPatient } from "src/models/stats/statsPatient.model";

export const STATS_PATIENT_MAURICE: statsPatient = {
    options: [true],
    nbQuizDone: 2,
    meanScore: 1.5,
    quizRes: [2,1],
    nbAttemptForEachQuizDone: [1,1]
}

export const STATS_PATIENT_JOSEPH: statsPatient = {
    options: [true],
    nbQuizDone: 1,
    meanScore: 1,
    quizRes: [1],
    nbAttemptForEachQuizDone: [0,1]
}

export const STATS_PATIENT_NULL: statsPatient = {
    options: [true],
    nbQuizDone: 0,
    meanScore: 0,
    quizRes: [],
    nbAttemptForEachQuizDone: [0,0]
}