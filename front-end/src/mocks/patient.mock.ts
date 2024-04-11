import { Profil } from "src/models/profil.model";
import { STATS_PATIENT_JOSEPH, STATS_PATIENT_MAURICE } from "./statsMocks/stats-patient.mock";

export const PATIENT_MAURICE: Profil = {
    nom: "Bois",
    prenom: "Maurice",
    role: "patient",

    optionPhoto: true,
    optionIndice: true,
    optionTailleTexte: "Moyen",
    selfStats: STATS_PATIENT_MAURICE
}

export const PATIENT_JOSEPH: Profil = {
    nom: "Ramstein",
    prenom: "Joseph",
    role: "patient",
    
    optionPhoto: true,
    optionTailleTexte: "Grand",
    selfStats: STATS_PATIENT_JOSEPH
}