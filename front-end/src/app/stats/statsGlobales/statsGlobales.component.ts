import { Component, OnInit } from "@angular/core";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-stats-globales',
    templateUrl: './statsGlobales.component.html',
    styleUrls: ['./statsGlobales.component.scss']
})

export class StatsGlobalesComponent implements OnInit {

    public patientNumber = 0;
    public quizNumber = 0;
    public quizDone = 0;
    public meanQuizDonePerPerson = 0;

    constructor(public statsService: StatsService){
        this.statsService.patientNumber$.subscribe((patientNumber) => {
            this.patientNumber = patientNumber;
        })

        this.statsService.quizNumber$.subscribe((quizNumber) => {
            this.quizNumber = quizNumber;
        })

        this.statsService.quizDone$.subscribe((quizDone) => {
            this.quizDone = quizDone;
        })

        this.statsService.meanQuizPerPerson$.subscribe((meanQuizDonePerPerson) => {
            this.meanQuizDonePerPerson = meanQuizDonePerPerson;
        })
    }

    ngOnInit(): void {}
}