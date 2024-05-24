import { Profil } from "../profil.model";

export interface statsQuiz {
    playedTime: number,
    meanScore: number,
    meanHintUsed: number,
    resTab: number[],
    nbHintUsed: number[],
    successPercentageByQuestion: number[]
}