import { Profil } from "src/models/profil.model";

export const PROFIL0: Profil = {
    nom: '',
    prenom: '',
    role: 'admin',
};

export const PROFIL1: Profil = {
    nom: 'Camus',
    prenom: 'Huguette',
    role: 'patient',

    dateNaissance: [21,1,1950],
    
    optionPhoto: true,
    optionIndice: true,

    optionTailleTexte: 'Moyen',

    optionReposerQuestionApres: false,
    optionSupprimerMauvaisesReponses: true
};

export const PROFIL2: Profil = {
    nom: 'Otho',
    prenom: 'Joseph',
    role: 'patient',

    dateNaissance: [15,3,1956],

    optionPhoto: true,
    optionIndice: true,

    optionTailleTexte: 'Gros',

    optionReposerQuestionApres: false,
    optionSupprimerMauvaisesReponses: true
};

export const PROFIL_LIST: Profil[] = [
    PROFIL0,PROFIL1,PROFIL2
];