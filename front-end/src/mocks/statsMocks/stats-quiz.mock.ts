import { statsQuiz } from "src/models/stats/statsQuiz.model";
import { QUIZ_LIST } from "../quiz-list.mock";

export const STATS_ACTORS: statsQuiz = {
    playedTime: 0,
    meanScore: 0,
    playedBy: [],
    meanScoreByPatient: [],
    nbHintUsedByPatient: [],
    successPercentageByQuestion: []
};

export const STATS_SPORTS: statsQuiz = {
    playedTime: 0,
    meanScore: 0,
    playedBy: [],
    meanScoreByPatient: [],
    nbHintUsedByPatient: [],
    successPercentageByQuestion: []
}
