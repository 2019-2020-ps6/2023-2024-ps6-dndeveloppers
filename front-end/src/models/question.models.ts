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
    indice: Indice[],
    optionImageLien?: string, // 1 = lien  -   
    optionImageQuestion?: string, //2 = texte si l'option photo est désactivée
    id?: number,
    idQuiz?: number
}