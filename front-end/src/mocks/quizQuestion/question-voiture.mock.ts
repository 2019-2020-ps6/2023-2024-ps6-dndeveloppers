import { Question } from "src/models/question.models";

export const QUESTION_VOITURE0: Question = {
    label: "Combien y a-t-il de roues motrices au minimum sur une voiture ?",
    answers: [
        {
           value: '1',
           isCorrect: false,
       },
       {
           value: '2',
           isCorrect: true,
       },
       {
           value: '3',
           isCorrect: false,
       },
       {
           value: '4',
           isCorrect: false,
       }
   ],
   indice: [
       {
           value: "Certaines roues ne sont pas forcément motrices",
       },
       {
           value: "La motricité peut être à traction ou à poussée",
       },
       {
           value: "C'est un nombre pair",
       }
   ],
   optionImageLien: "./assets/quiz/imageQuizMecaniqueRoue.png",//to change
   optionImageQuestion: "Combien y a-t-il de roues motrices au minimum sur une voiture ?",
};

export const QUESTION_VOITURE1: Question = {
   label: "Laquelle de ces réponses est un carburant auto ?",
   answers: [
       {
           value: 'Diesel',
           isCorrect: true,
       },
       {
           value: 'Huile de tournesol',
           isCorrect: false,
       },
       {
           value: 'Kerosène',
           isCorrect: false,
       },
       {
           value: 'Charbon',
           isCorrect: false,
       }
   ],
   indice: [
       {
           value: "Cet élément est liquide",
       },
       {
           value: "Cet élément est mauvais pour la peau",
       },
       {
           value: "C'est le nom de famille d'un célèbre acteur",
       }
   ],
   optionImageLien: "./assets/quiz/imageQuizMecaniqueCarburant.png",//to change
   optionImageQuestion: "Laquelle de ces réponses est un carburant auto ?",
}