import { statsQuiz } from "src/models/stats/statsQuiz.model";
import { QUIZ_LIST } from "../quiz-list.mock";

export const STATS_ACTORS: statsQuiz = {
    playedTime: 0,
    meanScore: 0,
    nbQuestions: QUIZ_LIST[0].questions.length,
    playedBy: [],
    meanScoreByPatient: [],
    nbHintUsedByPatient: [],
    successPercentageByQuestion: [],
};

export const STATS_SPORTS: statsQuiz = {
    playedTime: 0,
    meanScore: 0,
    nbQuestions: QUIZ_LIST[1].questions.length,
    playedBy: [],
    meanScoreByPatient: [],
    nbHintUsedByPatient: [],
    successPercentageByQuestion: []
}
