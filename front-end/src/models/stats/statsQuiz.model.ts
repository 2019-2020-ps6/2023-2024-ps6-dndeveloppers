import { Profil } from "../profil.model";

export interface statsQuiz {
    playedTime: number,
    meanScore: number,
    resTab: number[],
    playedBy: Profil[],
    nbHintUsed: number,
    successPercentageByQuestion: number[]
}