import { InfoQuiz } from "src/models/infoQuiz.model";
import { Question_Model } from "./quiz-list.mock";

export const infoQuiz_INIT: InfoQuiz = {
    actualQuestionNumber: 0,
    nbGoodAnswer: 0,
    actualScore: 0,
    nbHintUsed: 0,
    nbHintAskedForActualQuestion: 0,
    bestStreak: 0,
    actualStreak: 0,
    displayResponses: [true, true, true, true],
    nbErrors: 0,
    showGoodAnswer: false,
    endOfQuiz: false,
    actualQuestion: Question_Model,
    actualResponses: [],
    scoreForEachQuestion: [],
    replayQuestion: false,
    questionToReplay: [],
    lastQuizPlayed: "",
    askedToRestoreGame: false,
    showHintButton: true,
}