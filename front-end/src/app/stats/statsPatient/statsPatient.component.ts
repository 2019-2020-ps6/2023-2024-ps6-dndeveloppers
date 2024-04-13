import { Component, OnInit } from "@angular/core";
import * as Highcharts from 'highcharts'
import { LISTE_PROFILS } from "src/mocks/profil-list.mock";
import { Profil } from "src/models/profil.model";

@Component({
    selector: 'app-stats-patient',
    templateUrl: './statsPatient.component.html',
    styleUrls: ['./statsPatient.component.scss']
})

export class StatsPatientComponent implements OnInit {

    public listePatient: Profil[] = LISTE_PROFILS;
    public actualPatient: Profil  = this.listePatient[0];

    public options: any = {
        Chart: {
            type: 'area',
            height: 700
        },
        title: {
            text: 'Evolution'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: ['1', '2', '3'],
            tickmarkPlacement: 'on',
            title: {
                text: 'Quiz joué n°',
            }
        },
        yAxis: {
            title: {
                text: 'Score'
            }
        },
        series: [{
            name: 'QuizName',
            data: [0, 1, 2]
        }]
    }

    constructor(){
        console.log(this.listePatient[0]);
        console.log(this.selectedPatient);
    }

    ngOnInit(): void {
        Highcharts.chart('container', this.options);
    }

    selectedPatient(event: any) {
        let nomPatient: string = event.target.value;
        for (let i=0; i<LISTE_PROFILS.length; i++) {
            if (LISTE_PROFILS[i].nom == nomPatient) {
                this.actualPatient = LISTE_PROFILS[i];
                break;
            }
        }
    }
}