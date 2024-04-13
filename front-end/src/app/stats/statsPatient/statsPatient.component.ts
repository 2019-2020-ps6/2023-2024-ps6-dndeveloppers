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
    public actualCategories: string[] = ['1', '2'];
    public actualData: number[] = [50, 70];//this.actualPatient.selfStats.quizRes;

    public options: any = {
        Chart: {
            type: 'area',
            height: 700
        },
        title: {
            text: 'Evolution du score du patient au fil des quiz joués'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: this.actualCategories,
            tickmarkPlacement: 'on',
            title: {
                text: 'Quiz joué n°',
            }
        },
        yAxis: {
            title: {
                text: 'Score(%)'
            }
        },
        series: [{
            name: 'QuizName',
            data: this.actualData
        }]
    }

    constructor(){}

    ngOnInit(): void {}

    selectedPatient(event: any) {
        let nomPatient: string = event.target.value;
        for (let i=0; i<LISTE_PROFILS.length; i++) {
            if (LISTE_PROFILS[i].nom == nomPatient) {
                this.actualPatient = LISTE_PROFILS[i];
                break;
            }
        }
        this.options.xAxis.categories = this.categoriesChart();
        this.options.series[0].data = this.dataChart();
        Highcharts.chart('container', this.options);
    }

    categoriesChart() {
        let categories = [];
        for (let i=0; i<this.actualPatient.selfStats.quizRes.length; i++) {
            categories.push(i.toString());
        }
        return categories;
    }

    dataChart() {
        let data = [];
        for (let i=0; i<this.actualPatient.selfStats.quizRes.length; i++) {
            data.push(this.actualPatient.selfStats.quizRes[i]);
        }
        return data
    }
}