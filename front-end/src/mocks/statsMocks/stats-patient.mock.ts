import { statsPatient } from "src/models/stats/statsPatient.model";

export const STATS_PATIENT_INIT: statsPatient = {
    options: [true],
    nbQuizDone: 0,
    meanScore: 0,
    quizRes: [],
    quizDone: [],
}

export const STATS_PATIENT_MAURICE: statsPatient = {
    options: [true],
    nbQuizDone: 2,
    meanScore: 75,
    quizRes: [100,50],
    quizDone: ['Acteurs', 'Sports'],
}

export const STATS_PATIENT_JOSEPH: statsPatient = {
    options: [true],
    nbQuizDone: 1,
    meanScore: 50,
    quizRes: [50],
    quizDone: ['Sports'],

}

export const STATS_PATIENT_NULL: statsPatient = {
    options: [true],
    nbQuizDone: 0,
    meanScore: 0,
    quizRes: [],
    quizDone: [],
}