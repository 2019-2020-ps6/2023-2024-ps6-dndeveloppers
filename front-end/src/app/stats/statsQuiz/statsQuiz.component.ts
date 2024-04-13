import { Component, Input, OnInit } from "@angular/core";
import * as Highcharts from 'highcharts'
import { QUIZ_LIST, QUIZ_NULL } from "src/mocks/quiz-list.mock";
import { Quiz } from "src/models/quiz.model";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-stats-quiz',
    templateUrl: './statsQuiz.component.html',
    styleUrls: ['./statsQuiz.component.scss']
})

export class StatsQuizComponent implements OnInit {

    public listeQuiz: Quiz[] = QUIZ_LIST;
    public actualQuiz: Quiz = QUIZ_NULL;
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

    constructor(public statsService: StatsService){
        this.statsService.actualQuiz$.subscribe((actualQuiz) => {
            this.actualQuiz = actualQuiz;
        })
    }

    ngOnInit(): void {}

    @Input()
    currentQuiz: Quiz = this.actualQuiz;

    selectedQuiz(event: any) {
        let nomQuiz: string = event.target.value;
        for (let i=0; i<QUIZ_LIST.length; i++) {
            if (QUIZ_LIST[i].name == nomQuiz) {
                this.actualQuiz = QUIZ_LIST[i];
                break;
            }
        }
        this.options.xAxis.categories = this.categoriesChart();
        this.options.series[0].data = this.dataChart();
        Highcharts.chart('quizChart', this.options);
    }

    categoriesChart() {
        let categories = [];
        for (let i=0; i<this.actualQuiz.selfStats.successPercentageByQuestion.length; i++) {
            categories.push((i+1).toString());
        }
        return categories;
    }

    dataChart() {
        let data = [];
        for (let i=0; i<this.actualQuiz.selfStats.successPercentageByQuestion.length; i++) {
            data.push(this.actualQuiz.selfStats.successPercentageByQuestion[i]);
        }
        return data
    }
}