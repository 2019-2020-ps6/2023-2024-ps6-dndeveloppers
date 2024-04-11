import { statsPatient } from "./stats/statsPatient.model";

export interface Profil {
    nom: string;
    prenom: string;
    role: string; // "patient" ou "personnel"

    photo?: string; // le lien de la photo de profil sinon par défault

    dateNaissance?: [number,number,number];

    optionPhoto?: boolean; // avoir le droit à des questions avec des photos
    optionIndice?: boolean; // avoir le droit d'utiliser des indices

    optionSupprimerMauvaisesReponses?: boolean;
    optionReposerQuestionApres?: boolean;

    optionTailleTexte?: string; // Petit, Moyen ou Grand

    selfStats: statsPatient
}