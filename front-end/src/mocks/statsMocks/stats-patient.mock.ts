import { statsPatient } from "src/models/stats/statsPatient/statsPatient.model";

export const STATS_PATIENT_INIT: statsPatient = {
    options: [true],
    nbQuizDone: 0,
    meanScore: 0,
    quizRes: [],
    nbAttemptForEachQuizDone: []
}

export const STATS_PATIENT_MAURICE: statsPatient = {
    options: [true],
    nbQuizDone: 2,
    meanScore: 75,
    quizRes: [100,50],
    nbAttemptForEachQuizDone: [1,1]
}

export const STATS_PATIENT_JOSEPH: statsPatient = {
    options: [true],
    nbQuizDone: 1,
    meanScore: 50,
    quizRes: [50],
    nbAttemptForEachQuizDone: [0,1]

}

export const STATS_PATIENT_NULL: statsPatient = {
    options: [true],
    nbQuizDone: 0,
    meanScore: 0,
    quizRes: [],
    nbAttemptForEachQuizDone: [0,0]
}