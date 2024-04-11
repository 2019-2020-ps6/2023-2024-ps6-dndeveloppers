import { statsQuiz } from "src/models/stats/statsQuiz.model";
import { PATIENT_JOSEPH, PATIENT_MAURICE } from "../patient.mock";

export const STATS_ACTORS: statsQuiz = {
    playedTime: 1,
    meanScore: 1,
    playedBy: [PATIENT_MAURICE],
    meanScoreByPatient: [1],
    nbHintUsed: 0,
    successPercentageByQuestion: [100, 0]
};

export const STATS_SPORTS: statsQuiz = {
    playedTime: 2,
    meanScore: 1.5,
    playedBy: [PATIENT_MAURICE,PATIENT_JOSEPH],
    meanScoreByPatient: [2,1],
    nbHintUsed: 0,
    successPercentageByQuestion: [50, 100]
}
