import { Component, Input, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts'
import { QUIZ_NULL } from "src/mocks/quiz-list.mock";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-stats-quiz',
    templateUrl: './statsQuiz.component.html',
    styleUrls: ['./statsQuiz.component.scss']
})

export class StatsQuizComponent implements OnInit {

    public listeQuiz: Quiz[] = [];
    public actualQuiz: Quiz = QUIZ_NULL;
    public actualQuizName: string = this.actualQuiz.name;
    public actualQuizMeanScore: number = Math.round(this.actualQuiz.selfStats.meanScore*100)/100;
    public actualCategories: string[] = [];
    public actualData: number[] = [];

    public options: any = {
        Chart: {
            type: 'area',
            height: 700
        },
        title: {
            text: 'Taux de réussite pour chaque question du quiz'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: this.actualCategories,
            tickmarkPlacement: 'on',
            title: {
                text: 'Question n°',
            }
        },
        yAxis: {
            title: {
                text: 'Taux(%)'
            }
        },
        series: [{
            name: 'Taux de réussite pour la question',
            data: this.actualData
        }]
    }

    constructor(private router: Router, public statsService: StatsService, public quizService: QuizService){
        this.quizService.choosenQuiz$.subscribe((actualQuiz) => {
            this.actualQuiz = actualQuiz;
        })

        this.quizService.quizzes$.subscribe( (quizzes) => {
            this.listeQuiz = quizzes
        })
    }

    ngOnInit(): void {
        if (this.nomQuiz != "") {
            this.selectedQuizWithName(this.nomQuiz);
        }
    }

    @Input()
    currentQuiz: Quiz = this.actualQuiz;

    @Input()
    nomQuiz: string = "";

    selectedQuiz(event: any) {
        let nomQuiz: string = event.target.value;
        this.actualQuizName = nomQuiz;
        document.getElementById("selector")
        this.selectedQuizWithName(nomQuiz);            
    }

    selectedQuizWithName(nomQuiz: string) {
        if (nomQuiz == undefined) {
            return;
        }
        if (nomQuiz.length == 0) {
            this.actualQuizMeanScore = 0;
            this.actualQuiz = QUIZ_NULL;
            this.options.xAxis.categories = [];
            this.options.series[0].data = [];
        } else {
            for (let i=0; i<this.listeQuiz.length; i++) {
                if (this.listeQuiz[i].name == nomQuiz) {
                    this.actualQuiz = this.listeQuiz[i];
                    this.actualQuizMeanScore = Math.round(this.actualQuiz.selfStats.meanScore*100)/100;
                    break;
                }
            }
            this.options.xAxis.categories = this.categoriesChart();
            this.options.series[0].data = this.dataChart();
        }
        Highcharts.chart('quizChart', this.options);
    }

    categoriesChart() {
        console.log("success ",this.actualQuiz.selfStats.successPercentageByQuestion);
        let categories = [];
        for (let i=0; i<this.actualQuiz.selfStats.successPercentageByQuestion.length; i++) {
            categories.push((i+1).toString());
        }
        console.log(categories);
        return categories;
    }

    dataChart() {
        console.log("data");
        let data = [];
        for (let i=0; i<this.actualQuiz.selfStats.successPercentageByQuestion.length; i++) {
            data.push(Math.round(this.actualQuiz.selfStats.successPercentageByQuestion[i]*100));
        }
        console.log(data);
        return data
    }

    goToEdit() {
        let quiz: Quiz = QUIZ_NULL;
        for (let i=0; i<this.listeQuiz.length; i++) {
            if (this.listeQuiz[i].name == this.actualQuizName) {
                quiz = this.listeQuiz[i];
            }
        }
        this.quizService.editingQuiz(quiz);
        this.router.navigate(['home/gestionQuiz/editQuiz/' + this.actualQuizName])
    }
}