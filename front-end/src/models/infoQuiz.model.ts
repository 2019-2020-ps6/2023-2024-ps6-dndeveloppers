export interface InfoQuiz {
    questionsToAskAgain: Array<number>, // contient tout les numéros des questions à reposer

    actualQuestionNumber: number, // numéro de la question actuelle 

    nbGoodAnswer: number, // nombre de bonnes réponses
    actualScore: number, // nombre de points actuellement

    nbHintUsed: number,  // nombre total d'indice
    hintAskedForQuestion: number, // nombre d'indice pour la question actuelle

    bestStreak: number, // meilleur suite de bonnes réponses
    actualStreak: number, // suite de bonnes réponses en cours

    displayResponses: boolean[], // tableau qui dit si la réponse x est affichée ou non
    nbErrors: number // nombre d'erreur lors d'une même question (si on a l'option)
    showGoodAnswer: boolean, // affiche la bonne réponse 

    endOfQuiz: boolean // si le quiz est fini
}


