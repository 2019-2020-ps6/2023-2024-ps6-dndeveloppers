import { Question } from "src/models/question.models";

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
            value: 'Chine',
            isCorrect: false,
        },
        {
            value: 'Espagne',
            isCorrect: false,
        },
   ],
   indice: [
    {
        value: 'Messi a gagne la coupe du monde en 2022',
    },
    {
        value: 'Le pays vainqueur est sud Americain',
    },
    {
        value: 'Le maillot gagnant est blanc et bleu',
    }
    ],
   questionTexte: false,
   questionImage: true,
   optionImageLien: "./assets/quiz/foot.jpg",
   optionImageQuestion: 'Quel pays a gagné la coupe du monde de foot 2022'
};

export const QUESTION_SPORT1: Question = {
    label: 'Quel pays a gagné la coupe du monde de foot 1998 .....',
    answers: [
        {
           value: 'France',
           isCorrect: true,
       },
       {
           value: 'Argentine',
           isCorrect: false,
       },
       {
           value: 'Brésil',
           isCorrect: false,
       },
       {
           value: 'Allemagne',
           isCorrect: false,
       }
   ],
   indice: [
    {
        value: 'Zidane est champion du monde 98',
    },
    {
        value: 'Le maillot gagnant est bleu',
    },
    {
        value: 'C est la premiere etoile du pays gagnant',
    }
    ],
   questionTexte: false,
   questionImage: true,
   optionImageLien: "./assets/quiz/france1998.jpg",
   optionImageQuestion: 'Quel pays a gagné la coupe du monde de foot 1998 .....'
};