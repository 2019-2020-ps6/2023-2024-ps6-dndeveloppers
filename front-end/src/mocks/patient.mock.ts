import { options } from "src/models/options.model";
import { patient } from "src/models/patient.model";
import { STATS_PATIENT_MAURICE } from "./statsMocks/stats-patient.mock";

export const PATIENT_MAURICE: patient = {
    lastName: "Bois",
    firstName: "Maurice",
    age: 83,
    options: [options.image, options.son],
    textSize: "MOYEN",
    selfStats: STATS_PATIENT_MAURICE
}