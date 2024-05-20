import { statsPatient } from "./stats/statsPatient.model";

export interface Profil {
    id?: number;
    nom: string;
    prenom: string;
    role: string; // "patient" ou "personnel" ou "admin"

    photo: string; // le lien de la photo de profil sinon par défault

    dateNaissance?: [number,number,number];

    optionPhoto?: boolean; // avoir le droit à des questions avec des photos
    optionIndice?: boolean; // avoir le droit d'utiliser des indices

    optionSupprimerMauvaisesReponses?: boolean;
    optionReposerQuestionApres?: boolean;

    optionTailleTexte?: string; // Petit, Moyen ou Grand

    tutoriel: boolean; // Pour savoir s'il faut afficher le tutoriel

    selfStats: statsPatient
}