import { Profil } from "src/models/profil.model";
import { STATS_PATIENT_JOSEPH, STATS_PATIENT_MAURICE, STATS_PATIENT_NULL } from "./statsMocks/stats-patient.mock";

export const PATIENT_MAURICE: Profil = {
    nom: "Bois",
    prenom: "Maurice",
    role: "patient",

    dateNaissance: [21,1,1950],
    
    optionPhoto: true,
    optionIndice: true,

    optionTailleTexte: 'Moyen',

    optionReposerQuestionApres: false,
    optionSupprimerMauvaisesReponses: true,
    selfStats: STATS_PATIENT_MAURICE,

    photo: './assets/imageProfil/default.png'
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
    optionSupprimerMauvaisesReponses: true,
    selfStats: STATS_PATIENT_JOSEPH,

    photo: './assets/imageProfil/default.png'
}

export const ADMIN: Profil = {
    nom: "",
    prenom: "",
    role: "admin",

    selfStats: STATS_PATIENT_NULL,

    optionTailleTexte: 'Moyen',

    photo: './assets/imageProfil/default.png'
}