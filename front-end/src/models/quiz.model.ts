import { Question } from './question.models';
import { statsQuiz } from './stats/statsQuiz.model';

export interface Quiz {
    name: string,
    theme: string,
    questions: Question[],
    nbQuestionsPerType: number[],
    id: number,
    selfStats: statsQuiz,
    photo?: string,
    actualQuestionNumber: number, // à enlever

    // stats

    nbBonnesReponses: number,
    nbIndiceUtilises: number,
    MeilleurStreak: number,
    streakActuel: number,
    actualScore: number,
    
}
