import { Question } from "src/models/question.models";

export const QUESTION_CUISINE0: Question = {
    label: 'Quelle est la saison de ce fruit ?',
    answers: [
        {
           value: 'Automne',
           isCorrect: false,
       },
       {
           value: 'Hiver',
           isCorrect: false,
       },
       {
           value: 'Printemps',
           isCorrect: false,
       },
       {
           value: 'Été',
           isCorrect: true,
       }
   ],
   indice: [
       {
           value: 'Ce fruit craint le givre',
       },
       {
           value: 'Ce fruit a besoin de chaleur',
       },
       {
           value: 'Ce fruit aime le soleil',
       }
   ],
   questionTexte: false,
   questionImage: true,
   optionImageLien: "./assets/quiz/imageQuizCuisineCerise.png",//to change
   optionImageQuestion: 'Quelle est la saison des cerises ?',
   nbIndiceUtiliseQuestion: 0
};

export const QUESTION_CUISINE1: Question = {
   label: "Quelle est la plus basse cuisson de la viande rouge ?",
   answers: [
       {
           value: 'Saignant',
           isCorrect: false,
       },
       {
           value: 'A point',
           isCorrect: false,
       },
       {
           value: 'Bleu',
           isCorrect: true,
       },
       {
           value: 'Bien cuit',
           isCorrect: false,
       }
   ],
   indice: [
       {
           value: "C'est en un seul mot",
       },
       {
           value: "Ce mot n'est pas à conotation sanguine",
       },
       {
           value: "c'est une couleur",
       }
   ],
   questionTexte: true,
   questionImage: false,
   optionImageLien: "./assets/quiz/imageQuizCuisineCuison.png",//to change
   optionImageQuestion: 'Quelle est la plus basse cuisson de la viande rouge ?',
   nbIndiceUtiliseQuestion: 0
}

export const QUESTION_CUISINE2: Question = {
    label: "De quel animal vient le jambon ?",
    answers: [
        {
            value: 'Cochon',
            isCorrect: true,
        },
        {
            value: 'Vache',
            isCorrect: false,
        },
        {
            value: 'Poule',
            isCorrect: false,
        },
        {
            value: 'Autruche',
            isCorrect: false,
        }
    ],
    indice: [
        {
            value: "Cet animal n'a pas de plumes",
        },
        {
            value: 'Cet animal ne produit pas de lait consommable',
        },
        {
            value: 'Cet animal est rose',
        }
    ],
    questionTexte: true,
    questionImage: false,
    optionImageLien: "./assets/quiz/imageQuizCuisineJambon.png",//to change
   optionImageQuestion: "De quel animal vient le jambon ?",
   nbIndiceUtiliseQuestion: 0
 }