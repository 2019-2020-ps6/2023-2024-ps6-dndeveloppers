import { Question } from "src/models/question.models";

export const QUESTION_FLEUR0: Question = {
    label: "Quelle est cette fleur ?",
    answers: [
        {
           value: 'Orchidée',
           isCorrect: false,
       },
       {
           value: 'Pissenlit',
           isCorrect: false,
       },
       {
           value: 'Coquelicot',
           isCorrect: true,
       },
       {
           value: 'Jonquille',
           isCorrect: false,
       }
   ],
   indice: [
       {
           value: "Cette fleur ne fait pas référence à une couleur",
       },
       {
           value: "Cette fleur ne pousse pas sur de l'écorce d'arbre",
       },
       {
           value: "Cette fleur est rouge",
       }
   ],
   questionTexte: false,
   questionImage: true,
   optionImageLien: "./assets/quiz/imageQuizFleurCoquelicot.png",//to change
   optionImageQuestion: "Quelle fleur est rouge et pousse dans des champs ?"
};

export const QUESTION_FLEUR1: Question = {
   label: "Quelle fleur sent particulièrement mauvais ?",
   answers: [
       {
           value: 'Rose ancienne',
           isCorrect: false,
       },
       {
           value: 'Raflésie',
           isCorrect: true,
       },
       {
           value: 'Pétunia',
           isCorrect: false,
       },
       {
           value: 'Magnolia',
           isCorrect: false,
       }
   ],
   indice: [
       {
           value: "Cette fleur est rouge à pois blancs",
       },
       {
           value: "Cette fleur est très grande",
       },
       {
           value: "C'est une fleur peu connue'",
       }
   ],
   questionTexte: true,
   questionImage: false,
}

export const QUESTION_FLEUR2: Question = {
    label: "Quelle fleur représente la provence ?",
    answers: [
        {
            value: 'Lavande',
            isCorrect: true
        },
        {
            value: "Bouton d'or",
            isCorrect: false
        },
        {
            value: "Marguerite",
            isCorrect: false
        },
        {
            value: "Tulipe",
            isCorrect: false
        }
    ],
    indice: [
        {
            value: "Ces fleurs sont présentes au plateau de Valensol",
        },
        {
            value: "Il existe du miel fait à partir de cette fleur",
        },
        {
            value: "C'est une fleur violette",
        }
    ],
    questionTexte: true,
    questionImage: false,
}

export const QUESTION_FLEUR3: Question = {
    label: "Qu'offre-t-on le premier mai ?",
    answers: [
        {
            value: 'Tournesol',
            isCorrect: false
        },
        {
            value: "Violette",
            isCorrect: false
        },
        {
            value: "Muguet",
            isCorrect: true
        },
        {
            value: "Ortensia",
            isCorrect: false
        }
    ],
    indice: [
        {
            value: "La fleur est petite",
        },
        {
            value: "Ces fleurs ont une forme de clochette",
        },
        {
            value: "Les fleurs sont blanches",
        }
    ],
    questionTexte: true,
    questionImage: false,
}

export const QUESTION_FLEUR4: Question = {
    label: "Quelle fleur représente la royauté française ?",
    answers: [
        {
            value: 'Lys',
            isCorrect: true
        },
        {
            value: "Pivoine",
            isCorrect: false
        },
        {
            value: "Oeillet",
            isCorrect: false
        },
        {
            value: "Renoncule",
            isCorrect: false
        }
    ],
    indice: [
        {
            value: "Cette fleur a peu de pétals",
        },
        {
            value: "Cette fleur ressemble à un vieux tourne-disque",
        },
        {
            value: "Elle a un pistil prohéminant",
        }
    ],
    questionTexte: true,
    questionImage: false,
    optionImageLien: "./assets/quiz/imageQuizFleurLys.png",
    optionImageQuestion: "Quelle fleur représente la royauté française ?"
}