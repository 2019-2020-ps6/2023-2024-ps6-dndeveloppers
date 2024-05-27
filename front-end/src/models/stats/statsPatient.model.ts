export interface statsPatient {
    options: boolean[],
    nbQuizDone: number,
    meanScore: number,
    quizRes: number[], // Pourcentage de réussite à un quiz
    quizDone: string[], // Associé de quizRes pour connaitre le quiz correspondant au res,
    id?: number
}