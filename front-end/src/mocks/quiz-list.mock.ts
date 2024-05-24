import { Quiz } from '../models/quiz.model';
import { Answer, Indice, Question } from '../models/question.models';
import { STATS_ACTORS, STATS_INIT, STATS_SPORTS } from './statsMocks/stats-quiz.mock';
import { QUESTION_ACTEUR, QUESTION_CUISINE, QUESTION_FLEUR, QUESTION_SPORT, QUESTION_VOITURE } from './questions.mock';

export const Answer_Model: Answer = {
    value:'',
    isCorrect:false,
}


export const Indice_Model1: Indice = {
    value:'',
}

export const Indice_Model2: Indice = {
    value:'',
}

export const Indice_Model3: Indice = {
    value:'',
}

export const Question_Model: Question = {
    label:'',
    answers: [],
    indice: [],
    nbIndiceUtiliseQuestion: 0
}

export const QUIZ_NULL: Quiz = {
    name: '',
    theme: '',
    questions: [],
    id: -1,
    selfStats: STATS_INIT,
}

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Acteurs', 
        theme: 'Actor',
        questions: QUESTION_ACTEUR,
        id: 0,
        selfStats: STATS_ACTORS,
        photo: "./assets/quiz/oscar.jpg",
    },
    {
        name: 'Sports',
        theme: 'Sport',
        questions: QUESTION_SPORT,
        id: 1,
        selfStats: STATS_SPORTS,
        photo: "./assets/quiz/foot.jpg",
    },
    {
        name: 'Cuisine',
        theme: 'Quotidien',
        questions: QUESTION_CUISINE,
        id: 2,
        selfStats: JSON.parse(JSON.stringify(STATS_INIT)),
        photo: "./assets/quiz/imageQuizCuisine.png",
    },
    {
        name: 'Voiture',
        theme: 'Mécanique',
        questions: QUESTION_VOITURE,
        id: 3,
        selfStats: JSON.parse(JSON.stringify(STATS_INIT)),
        photo: "./assets/quiz/imageQuizVoiture.png",
    },
    {
        name: 'Fleur',
        theme: 'Nature',
        questions: QUESTION_FLEUR,
        id: 4,
        selfStats: JSON.parse(JSON.stringify(STATS_INIT)),
        photo: "./assets/quiz/imageQuizFleur.png",
    }
];
