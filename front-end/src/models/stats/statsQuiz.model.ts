import { patient } from "../patient.model";

export interface statsQuiz {
    playedTime: number,
    meanScore: number,
    playedBy: patient[],
    meanScoreByPatient: number[],
    nbHintUsedByPatient: number[],
    successPercentageByQuestion: number[],
    nbQuestions: number[]
}