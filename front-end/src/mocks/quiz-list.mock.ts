import { Quiz } from '../models/quiz.model';
import { Answer, Indice, Question } from '../models/question.models';
import { STATS_ACTORS, STATS_INIT, STATS_SPORTS } from './statsMocks/stats-quiz.mock';

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
    questionImage: false,
    indice: [],
    questionTexte: true
}

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
    questionTexte: false,
    questionImage: true,
    optionImageLien: "./assets/quiz/JeanGabin.jpg",
    optionImageQuestion: 'Jean Gabin a joué dans...'
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
    questionTexte: true,
    questionImage: false,
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
   optionImageQuestion: 'test'
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
   optionImageLien: "./assets/quiz/france1998.jpg",
   optionImageQuestion: 'Quel pays a gagné la coupe du monde de foot 1998 .....'
};

export const QUIZ_NULL: Quiz = {
    name: '',
    theme: '',
    questions: [],
    nbQuestionsPerType: [],
    id: -1,
    selfStats: STATS_INIT
}

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Acteurs', 
        theme: 'Actor',
        questions: [QUESTION_ACTOR0,QUESTION_ACTOR1],
        nbQuestionsPerType: [2,0],
        id: 0,
        selfStats: STATS_ACTORS,
        photo: "./assets/quiz/oscar.jpg"
    },
    {
        name: 'Sports',
        theme: 'Sport',
        questions: [QUESTION_SPORT0,QUESTION_SPORT1],
        nbQuestionsPerType: [2,0],
        id: 1,
        selfStats: STATS_SPORTS,
        photo: "./assets/quiz/foot.jpg"
    }
];
