import { Question } from './question.models';

export interface Quiz {
    name: string;
    theme: string;
    questions: Question[];
}
