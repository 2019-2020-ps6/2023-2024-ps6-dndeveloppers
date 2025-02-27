import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Highcharts from 'highcharts'
import { serverUrl } from "src/configs/server.config";
import { PROFIL_NULL } from "src/mocks/profil.mock";
import { Profil } from "src/models/profil.model";
import { Quiz } from "src/models/quiz.model";
import { statsPatient } from "src/models/stats/statsPatient.model";
import { QuizService } from "src/services/quiz.service";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-stats-patient',
    templateUrl: './statsPatient.component.html',
    styleUrls: ['./statsPatient.component.scss']
})

export class StatsPatientComponent implements OnInit {

    private profilURL: string = serverUrl + '/profils';

    public listePatient: Profil[] = [];
    public actualPatient: Profil  = PROFIL_NULL;
    public optionPatient: string = "";
    public actualPatientSelfStats: statsPatient = this.actualPatient.selfStats;
    public actualPatientMeanScore: number = Math.round(this.actualPatientSelfStats.meanScore*100)/100;
    public quizzes: Quiz[] = [];
    public displayPatientChart: boolean = true;
    public selectDefault: string = "";

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
                text: 'Taux de réussite(%)'
            }
        },
        series: []
    }

    constructor(private router: Router, private http: HttpClient, public statsService: StatsService, public quizService: QuizService){
        // Pour une raison obscure, ce subscribe ne fonctionne pas lorsqu'un profil est supprimé
        this.statsService.listePatient$.subscribe((listePatient) => {
            this.listePatient = listePatient;
            for (let i=0; i<this.listePatient.length-1; i++) {
                let minIndex = i;
                for (let j=i; j<this.listePatient.length; j++) {
                    if (this.listePatient[j].nom.localeCompare(this.listePatient[minIndex].nom) < 0) {
                        minIndex = j;
                    }
                }
    
                if (minIndex != i) {
                    const tmp = this.listePatient[i];
                    this.listePatient[i] = this.listePatient[minIndex];
                    this.listePatient[minIndex] = tmp;
                }
            }
        })
        
        this.statsService.series$.subscribe((actualSeries) => {
            this.actualSeries = actualSeries;
        })

        this.quizService.quizzes$.subscribe( (quizzes) => {
            this.quizzes = quizzes;
        })
    }

    ngOnInit() {
        this.fillSeries();
        this.listePatient = this.statsService.retrievePatients();
        if (this.idPatient != -1) {
            this.selectedPatientWithName(this.idPatient);
            for (let i=0; i<this.listePatient.length; i++) {
                if (this.listePatient[i].id == this.idPatient) {
                    this.selectDefault = this.listePatient[i].nom + ', ' + this.listePatient[i].prenom;
                }
            }
            console.log('default: ', this.selectDefault);
        }
    }

    @Input()
    idPatient: number = -1;

    selectedPatient(event: any) {
        let idPatient: number = event.target.value;
        this.selectedPatientWithName(idPatient);
    }

    selectedPatientWithName(idPatient: number) {
        if (idPatient == undefined) {
            this.actualPatient = PROFIL_NULL;
            this.displayPatientChart = false;
        } else {
            this.displayPatientChart = true;
            this.http.get<Profil[]>(this.profilURL).subscribe((profilList) => {
                const listeProfils = profilList;
                for (let i=0; i<listeProfils.length; i++) {
                    if (listeProfils[i].id != undefined) {
                        if (listeProfils[i].id == idPatient) {
                            this.actualPatient = listeProfils[i];
                            this.actualPatientSelfStats = listeProfils[i].selfStats;
                            this.actualPatientMeanScore = Math.round(this.actualPatientSelfStats.meanScore*100)/100;

                            this.optionPatient = "";
                            if (this.actualPatient.optionIndice) {
                                this.optionPatient += "Indice"
                            }
                            if (this.actualPatient.optionPhoto) {
                                if (this.optionPatient.length != 0) {
                                    this.optionPatient += ", ";
                                }
                                this.optionPatient += "Photo";
                            }
                            if (this.actualPatient.optionReposerQuestionApres) {
                                if (this.optionPatient.length != 0) {
                                    this.optionPatient += ", ";
                                }
                                this.optionPatient += "Reposer";
                            }
                            if (this.actualPatient.optionSupprimerMauvaisesReponses) {
                                if (this.optionPatient.length != 0) {
                                    this.optionPatient += ", ";
                                }
                                this.optionPatient += "Supprimer";
                            }

                            this.options.xAxis.categories = this.categoriesChart();
                            for (let i=0; i<this.quizzes.length; i++) {
                                this.options.series[i].data = this.dataChart(this.quizzes[i].name);
                            }
                            Highcharts.chart('patientChart', this.options);
                            break;
                        }
                    }
                }
            })
        }
    }

    fillSeries() {
        console.log(this.options.series);
        this.options.series.splice(0, this.options.series.length);
        console.log(this.options.series);
        for (let i=0; i<this.quizzes.length; i++) {
            let name = this.quizzes[i].name;
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
                data.push(Math.round(this.actualPatient.selfStats.quizRes[i]*100)/100);
            }
        }
        return data;
    }

    seePatient() {
        this.router.navigate(['/home/listProfil']);
    }
}