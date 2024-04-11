import { Profil } from "../profil.model";

export interface statsQuiz {
    playedTime: number,
    meanScore: number,
    playedBy: Profil[],
    meanScoreByPatient: number[],
    nbHintUsed: number,
    successPercentageByQuestion: number[]
}