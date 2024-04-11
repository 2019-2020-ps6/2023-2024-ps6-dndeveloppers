import { Component, OnInit } from "@angular/core";
import { LISTE_PATIENT } from "src/mocks/patient-list.mock";
import { Profil } from "src/models/profil.model";

@Component({
    selector: 'app-stats-patient',
    templateUrl: './statsPatient.component.html',
    styleUrls: ['./statsPatient.component.scss']
})

export class StatsPatientComponent implements OnInit {

    public listePatient: Profil[] = LISTE_PATIENT;
    public actualPatient: Profil  = this.listePatient[0];

    constructor(){
        console.log(this.listePatient[0]);
        console.log(this.selectedPatient);
    }

    ngOnInit(): void {}

    selectedPatient(event: any) {
        let nomPatient: string = event.target.value;
        for (let i=0; i<LISTE_PATIENT.length; i++) {
            if (LISTE_PATIENT[i].nom == nomPatient) {
                this.actualPatient = LISTE_PATIENT[i];
                break;
            }
        }
    }
}