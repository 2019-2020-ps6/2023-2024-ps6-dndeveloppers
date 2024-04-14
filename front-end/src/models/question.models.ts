export interface Answer {
    value: string,
    isCorrect: boolean
}

export interface Indice {
    value: string,
}

export interface Question {
    label: string,
    answers: Answer[],
    questionTexte: boolean, // stats
    questionImage: boolean, // stats
    indice: Indice[],
    dejaPosee?: false, // si la question a déjà été posée
    
    optionImage?: string[], // 1 = lien  -   2 = texte si l'option photo est désactivée
}