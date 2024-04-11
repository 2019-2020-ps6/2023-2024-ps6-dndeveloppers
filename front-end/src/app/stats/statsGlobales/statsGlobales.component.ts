import { Component, OnInit } from "@angular/core";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-stats-globales',
    templateUrl: './statsGlobales.component.html',
    styleUrls: ['./statsGlobales.component.scss']
})

export class StatsGlobalesComponent implements OnInit {

    public nbPatient: number = 0;
    public nbQuiz: number = 0;
    public quizDone: number = 0;
    public quizDonePerPerson: number[] = [];

    constructor(public statsService: StatsService){
        this.statsService.nbPatient$.subscribe((nbPatient) => {
            this.nbPatient = nbPatient;
        })

        this.statsService.nbQuiz$.subscribe((nbQuiz) => {
            this.nbQuiz = nbQuiz;
        })

        this.statsService.quizDone$.subscribe((quizDone) => {
            this.quizDone = quizDone;
        })

        this.statsService.quizDonePerPerson$.subscribe((quizDonePerPerson) => {
            this.quizDonePerPerson = quizDonePerPerson;
        })
    }

    ngOnInit(): void {}
}