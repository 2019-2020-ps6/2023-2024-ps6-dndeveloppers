import { Question } from './question.models';
import { statsQuiz } from './stats/statsQuiz.model';

export interface Quiz {
    name: string,
    theme: string,
    questions: Question[],
    id: number,
    selfStats: statsQuiz,
    photo?: string,
}