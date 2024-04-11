import { Component, Input, OnInit } from "@angular/core";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Quiz } from "src/models/quiz.model";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-stats-quiz',
    templateUrl: './statsQuiz.component.html',
    styleUrls: ['./statsQuiz.component.scss']
})

export class StatsQuizComponent implements OnInit {

    public listeQuiz: Quiz[] = QUIZ_LIST;
    public actualQuiz: Quiz = this.listeQuiz[0];

    constructor(public statsService: StatsService){
        this.statsService.actualQuiz$.subscribe((actualQuiz) => {
            this.actualQuiz = actualQuiz;
        })
    }

    ngOnInit(): void {}

    @Input()
    currentQuiz: Quiz = this.actualQuiz;

    selectedQuiz(quiz: Quiz) {
        this.statsService.selectedQuiz(quiz);
    }
}