import { Question } from "src/models/question.models";

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
   ],
   indice: [
       {
           value: 'Jean Gabin est un acteur francais né en 1904',
       },
       {
           value: 'Harry Potter et Star Wars ne sont pas des films francais',
       },
       {
           value: 'Les Tuches II est sorti en 2016',
       }
   ],
   optionImageLien: "./assets/quiz/JeanGabin.jpg",
   optionImageQuestion: 'Jean Gabin a joué dans...',
   nbIndiceUtiliseQuestion: 0
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
   ],
   indice: [
       {
           value: 'Le personnage principale est Jack Sparrow',
       },
       {
           value: 'Ce personnage est un homme',
       },
       {
           value: 'Le film est americain',
       }
   ],
   nbIndiceUtiliseQuestion: 0
}