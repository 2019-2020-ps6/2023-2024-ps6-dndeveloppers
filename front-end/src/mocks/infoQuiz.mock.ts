import { InfoQuiz } from "src/models/infoQuiz.model";

export const infoQuiz_INIT: InfoQuiz = {
    questionsToAskAgain: [],
    actualQuestionNumber: 0,
    nbGoodAnswer: 0,
    actualScore: 0,
    nbHintUsed: 0,
    hintAskedForQuestion: 0,
    bestStreak: 0,
    actualStreak: 0,
    displayResponses: [true,true,true,true],
    nbErrors: 0,
    showGoodAnswer: false,
    endOfQuiz: false
}