import { statsQuiz } from "src/models/stats/statsQuiz.model";
import { PATIENT_JOSEPH, PATIENT_MAURICE } from "../patient.mock";

export const STATS_ACTORS: statsQuiz = {
    playedTime: 1,
    meanScore: 2,
    meanHintUsed: 0,
    playedBy: [PATIENT_MAURICE],
    resTab: [2],
    nbHintUsed: [0],
    successPercentageByQuestion: [100, 100]
};

export const STATS_SPORTS: statsQuiz = {
    playedTime: 2,
    meanScore: 1.5,
    meanHintUsed: 0,
    playedBy: [PATIENT_MAURICE,PATIENT_JOSEPH],
    resTab: [1,2],
    nbHintUsed: [2,1],
    successPercentageByQuestion: [50, 100]
}
