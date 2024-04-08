import { Component, OnInit } from "@angular/core";
import { Quiz } from "src/models/quiz.model";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-stats-patient',
    templateUrl: './statsPatient.component.html',
    styleUrls: ['./statsPatient.component.scss']
})

export class StatsPatientComponent implements OnInit {

    public options: string[] = [];
    public playedQuiz: number = 0;
    public patientMeanScore: number = 0;
    public fiveLastQuizzes: Quiz[] = [];

    constructor(public statsService: StatsService){
        this.statsService.options$.subscribe((options) => {
            this.options = options;
        })

        this.statsService.playedQuiz$.subscribe((playedQuiz) => {
            this.playedQuiz = playedQuiz;
        })

        this.statsService.patientMeanScore$.subscribe((patientMeanScore) => {
            this.patientMeanScore = patientMeanScore;
        })

        this.statsService.fiveLastQuizzes$.subscribe((fiveLastQuizzes) => {
            this.fiveLastQuizzes = fiveLastQuizzes;
        })
    }

    ngOnInit(): void {}
}