import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.models';

export const QUESTION_ACTOR0: Question = {
     label: 'Jean Gabin a joué dans...',
     answers: [
         {
            value: 'Les tuches II',
            isCorrect: false,
        },
        {
            value: 'La grande illusion',
            isCorrect: true,
        },
        {
            value: 'Harry Potter',
            isCorrect: false,
        },
        {
            value: 'Star Wars',
            isCorrect: false,
        }
    ]
};

export const QUESTION_ACTOR1: Question = {
    label: "Qui incarne le personnage principal de Pirates des Caraïbes ?",
    answers: [
        {
            value: 'Julia Roberts',
            isCorrect: false,
        },
        {
            value: 'Johnny Deep',
            isCorrect: true,
        },
        {
            value: 'Florence Foresti',
            isCorrect: false,
        },
        {
            value: 'Omar Sy',
            isCorrect: false,
        }
    ]
}

export const QUESTION_SPORT0: Question = {
    label: 'Quel pays a gagné la coupe du monde de foot 2022',
    answers: [
        {
           value: 'France',
           isCorrect: false,
       },
       {
           value: 'Argentine',
           isCorrect: true,
       },
       {
           value: 'Brésil',
           isCorrect: false,
       },
       {
           value: 'Allemagne',
           isCorrect: false,
       }
   ]
};

export const QUESTION_SPORT1: Question = {
    label: 'Quel pays a gagné la coupe du monde de foot 2022 .....',
    answers: [
        {
           value: 'France',
           isCorrect: false,
       },
       {
           value: 'Argentine',
           isCorrect: true,
       },
       {
           value: 'Brésil',
           isCorrect: false,
       },
       {
           value: 'Allemagne',
           isCorrect: false,
       }
   ]
};

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Acteurs', // What's happening if I change this value..?
        theme: 'Actor',
        questions: [QUESTION_ACTOR0,QUESTION_ACTOR1],
    },
    {
        name: 'Sports',
        theme: 'Sport',
        questions: [QUESTION_SPORT0,QUESTION_SPORT1],
    }
];
