export interface statsPatient {
    options: boolean[],
    nbQuizDone: number,
    meanScore: number,
    quizRes: number[], // Pourcentage de réussite
    nbAttemptForEachQuizDone: number[]
}