import { Component, OnInit } from "@angular/core";
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
    public selectedQuiz: Quiz = this.listeQuiz[0];

    constructor(public statsService: StatsService){}

    ngOnInit(): void {}
}