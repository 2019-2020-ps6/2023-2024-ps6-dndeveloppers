import { Answer, Question } from "./question.models"

export interface InfoQuiz {
    actualQuestionNumber: number, // numéro de la question actuelle 

    nbGoodAnswer: number, // nombre de bonnes réponses
    actualScore: number, // nombre de points actuellement

    nbHintUsed: number,  // nombre total d'indice
    nbHintAskedForActualQuestion: number, // nombre d'indice pour la question actuelle
    
    bestStreak: number, // meilleur suite de bonnes réponses
    actualStreak: number, // suite de bonnes réponses en cours

    displayResponses: boolean[], // tableau qui dit si la réponse x est affichée ou non => pour l'affichage du quiz
    nbErrors: number // nombre d'erreur lors d'une même question (si on a l'option)
    showGoodAnswer: boolean, // affiche la bonne réponse 

    endOfQuiz: boolean, // si le quiz est fini

    actualQuestion: Question, 
    actualResponses: Answer[],

    scoreForEachQuestion : number[],

    replayQuestion : Boolean, // si true cela veut dire qu'on est dans la phase où on repose les questions 
    questionToReplay : number[], // contient les numéros des questions a reposer,
    questionToReplayBadAnswer : Map<string,number>, // numéro de la réponse à enlever dans la question à reposer

    lastQuizPlayed: String, // nom du dernier quiz joué
    askedToRestoreGame: boolean, // si on a demandé de restaurer la partie

    showHintButton: boolean, // affiche le bouton indice
}