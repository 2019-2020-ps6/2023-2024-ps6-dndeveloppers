export interface Answer {
    value: string,
    isCorrect: boolean
}

export interface Question {
    label: string,
    answers: Answer[],
    questionTexte: boolean,
    questionImage: boolean
}