import { Component, OnInit } from "@angular/core";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-stats-quiz',
    templateUrl: './statsQuiz.component.html',
    styleUrls: ['./statsQuiz.component.scss']
})

export class StatsQuizComponent implements OnInit {

    public playedTime: number = 0;
    public meanScore: number = 0;
    public meanHintUsed: number = 0;
    public achievedPercentPerQuestion: number[] = [];
    public questionNumberPerType: number[] = [0,0,0];

    constructor(public statsService: StatsService){
        this.statsService.playedTime$.subscribe((playedTime) => {
            this.playedTime = playedTime;
        })

        this.statsService.meanScore$.subscribe((meanScore) => {
            this.meanScore = meanScore;
        })

        this.statsService.meanHintUsed$.subscribe((meanHintUsed) => {
            this.meanHintUsed = meanHintUsed;
        })

        this.statsService.achievedPercentPerQuestion$.subscribe((achievedPercentPerQuestion) => {
            this.achievedPercentPerQuestion = achievedPercentPerQuestion;
        })

        this.statsService.questionNumberPerType$.subscribe((questionNumberPerType) => {
            this.questionNumberPerType = questionNumberPerType;
        })
    }

    ngOnInit(): void {}
}