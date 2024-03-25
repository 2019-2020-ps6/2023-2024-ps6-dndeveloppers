import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.models';

export const QUESTION_ACTOR: Question = {
     label: 'Jean Gabin a joué dans...',
     answers: [
         {
            value: 'Les tuches II',
            isCorrect: false,
        },
        {
            value: 'La grande illusion',
            isCorrect: true,
        }
    ]
};

export const QUESTION_SPORT: Question = {
    label: 'Quel pays a gagné la coupe du monde de foot 2022',
    answers: [
        {
           value: 'France',
           isCorrect: false,
       },
       {
           value: 'Argentine',
           isCorrect: true,
       }
   ]
};

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Les Acteurs', // What's happening if I change this value..?
        theme: 'Actor',
        questions: [QUESTION_ACTOR],
    },
    {
        name: 'Les Sports',
        theme: 'Sport',
        questions: [QUESTION_SPORT],
    }
];
