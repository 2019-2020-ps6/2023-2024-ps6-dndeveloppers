import { Question } from './question.models';
import { statsQuiz } from './stats/statsQuiz.model';

export interface Quiz {
    name: string,
    theme: string,
    questions: Question[],
    selfStats: statsQuiz
}
