import { Profil } from "src/models/profil.model";
import { STATS_PATIENT_JOSEPH, STATS_PATIENT_MAURICE, STATS_PATIENT_NULL } from "./statsMocks/stats-patient.mock";

export const PATIENT_MAURICE: Profil = {
    nom: "Bois",
    prenom: "Maurice",
    role: "patient",

    dateNaissance: [21,1,1950],
    
    optionPhoto: false,
    optionIndice: true,

    optionTailleTexte: 'Moyen',

    optionReposerQuestionApres: false,
    optionSupprimerMauvaisesReponses: true,
    tutoriel: false,
    selfStats: STATS_PATIENT_MAURICE,

    optionTempsReponse: 5,

    optionSkipQuestion: true,

    photo: './assets/imageProfil/imageProfilMaurice.png'
}

export const PATIENT_JOSEPH: Profil = {
    nom: "Otho",
    prenom: "Joseph",
    role: "patient",
    
    dateNaissance: [15,3,1956],

    optionPhoto: false,
    optionIndice: true,

    optionTailleTexte: 'Grand',

    optionReposerQuestionApres: false,
    optionSupprimerMauvaisesReponses: false,
    tutoriel: true,
    selfStats: STATS_PATIENT_JOSEPH,

    optionTempsReponse: 5,

    optionSkipQuestion: true,

    photo: './assets/imageProfil/imageProfilJoseph.png'
}

export const PATIENT_HUGUETTE: Profil = {
    nom: "Hudson",
    prenom: "Huguette",
    role: "patient",

    dateNaissance: [12,9,1957],

    optionPhoto: true,
    optionIndice: false,

    optionTailleTexte: 'Moyen',

    optionReposerQuestionApres: true,
    optionSupprimerMauvaisesReponses: true,
    tutoriel: true,
    selfStats: STATS_PATIENT_NULL,

    optionTempsReponse: 5,

    optionSkipQuestion: true,

    photo: './assets/imageProfil/imageProfilHuguette.png'
}

export const PERSONNEL_MATHILDE: Profil = {
    nom: "Martin",
    prenom: "Mathilde",
    role: "personnel",

    dateNaissance: [27,4,2000],

    optionPhoto: true,
    optionIndice: true,

    optionTailleTexte: 'Petit',

    optionReposerQuestionApres: false,
    optionSupprimerMauvaisesReponses: false,
    tutoriel: false,
    selfStats: STATS_PATIENT_NULL,

    optionTempsReponse: 5,

    optionSkipQuestion: true,

    photo: './assets/imageProfil/imageProfilMathilde.png'
}

export const ADMIN: Profil = {
    nom: "",
    prenom: "",
    role: "admin",

    selfStats: STATS_PATIENT_NULL,

    optionTailleTexte: 'Moyen',
    tutoriel: false,

    optionReposerQuestionApres: false,
    optionSupprimerMauvaisesReponses: false,
    optionPhoto: true,
    optionIndice: true,

    optionTempsReponse: 5,

    optionSkipQuestion: true,

    photo: './assets/imageProfil/default.png'
}

export const PROFIL_NULL: Profil = {
    nom: "",
    prenom: "",
    role: "patient",

    selfStats: STATS_PATIENT_NULL,

    optionTailleTexte: 'Moyen',
    tutoriel: false,

    optionPhoto: false,
    optionIndice: false,
    photo: "",

    optionSkipQuestion: true,

    optionTempsReponse: 5,
}