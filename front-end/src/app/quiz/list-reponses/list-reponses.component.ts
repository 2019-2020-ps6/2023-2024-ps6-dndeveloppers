import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { QUESTION_ACTOR0 } from "src/mocks/quiz-list.mock";
import { Answer } from "src/models/question.models";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-list-reponses',
    templateUrl: './list-reponses.component.html',
    styleUrls: ['./list-reponses.component.scss']
})

export class ListReponsesComponent implements OnInit {

    public displayListReponses: Boolean = false;
    public actualResponses: Answer[] = QUESTION_ACTOR0.answers;

    constructor(public quizService: QuizService){
        this.quizService.actualResponses$.subscribe((actualResponses) => {
            this.actualResponses = actualResponses;
        })

        this.quizService.displayQuiz$.subscribe((displayQuiz) => {
            this.displayListReponses = displayQuiz;
        })
    }

    @Input()
    listReponses: Answer[] = this.actualResponses;
    displaySelf: Boolean = this.displayListReponses;

    ngOnInit(): void {}
}