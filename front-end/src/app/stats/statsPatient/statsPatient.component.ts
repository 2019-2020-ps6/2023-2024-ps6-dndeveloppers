import { Component, OnInit } from "@angular/core";
import * as Highcharts from 'highcharts'
import { LISTE_PATIENTS, LISTE_PROFILS } from "src/mocks/profil-list.mock";
import { PROFIL_NULL } from "src/mocks/profil.mock";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Profil } from "src/models/profil.model";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-stats-patient',
    templateUrl: './statsPatient.component.html',
    styleUrls: ['./statsPatient.component.scss']
})

export class StatsPatientComponent implements OnInit {

    public listePatient: Profil[] = LISTE_PATIENTS;
    public actualPatient: Profil  = PROFIL_NULL;
    public actualSeries: any[] = [];

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
            categories: [],
            tickmarkPlacement: 'on',
            title: {
                text: 'Quiz joué n°',
            }
        },
        yAxis: {
            title: {
                text: 'Taux(%)'
            }
        },
        series: []
    }

    constructor(public statsService: StatsService){
        this.statsService.listePatient$.subscribe((listePatient) => {
            this.listePatient = listePatient;
        })
        
        this.statsService.series$.subscribe((actualSeries) => {
            this.actualSeries = actualSeries;
        })
    }

    ngOnInit(): void {
        this.fillSeries();
    }

    selectedPatient(event: any) {
        let nomPatient: string = event.target.value;
        for (let i=0; i<LISTE_PROFILS.length; i++) {
            if (LISTE_PROFILS[i].nom == nomPatient) {
                this.actualPatient = LISTE_PROFILS[i];
                break;
            }
        }
        if (nomPatient.length == 0) {
            this.actualPatient = PROFIL_NULL;
        }
        this.options.xAxis.categories = this.categoriesChart();
        for (let i=0; i<QUIZ_LIST.length; i++) {
            this.options.series[i].data = this.dataChart(QUIZ_LIST[i].name);
        }
        Highcharts.chart('patientChart', this.options);
    }

    fillSeries() {
        console.log(this.options.series);
        this.options.series.splice(0, this.options.series.length);
        console.log(this.options.series);
        for (let i=0; i<QUIZ_LIST.length; i++) {
            let name = QUIZ_LIST[i].name;
            let data: number[] = [];
            let tab = {
                name: name,
                data: data
            }
            
            this.options.series.push(tab);
        }
        console.log(this.options.series);
    }

    categoriesChart() {
        let categories = [];
        for (let i=0; i<this.actualPatient.selfStats.quizRes.length; i++) {
            categories.push((i+1).toString());
        }
        return categories;
    }

    dataChart(quizName: string) {
        let data = [];
        for (let i=0; i<this.actualPatient.selfStats.quizRes.length; i++) {
            if (this.actualPatient.selfStats.quizDone[i] == quizName) {
                data.push(this.actualPatient.selfStats.quizRes[i]);
            }
        }
        return data
    }
}