import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { QUESTION_ACTOR0, QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Answer } from "src/models/question.models";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-list-reponses',
    templateUrl: './list-reponses.component.html',
    styleUrls: ['./list-reponses.component.scss']
})

export class ListReponsesComponent implements OnInit {

    public displayListReponses: Boolean = false;
    public actualResponses: Answer[] = QUESTION_ACTOR0.answers;
    public choosenQuiz: Quiz = QUIZ_LIST[0];

    constructor(public quizService: QuizService){
        this.quizService.actualResponses$.subscribe((actualResponses) => {
            this.actualResponses = actualResponses;
        })

        this.quizService.displayQuiz$.subscribe((displayQuiz) => {
            this.displayListReponses = displayQuiz;
        })

        this.quizService.choosenQuiz$.subscribe((choosenQuiz) => {
            this.choosenQuiz = choosenQuiz;
        })
    }

    @Input()
    listReponses: Answer[] = this.actualResponses;
    displaySelf: Boolean = this.displayListReponses;

    ngOnInit(): void {}

    responseSelected(responseNumber: number) {
        console.log("Response selected : ",responseNumber);
        this.quizService.responseSelected(this.choosenQuiz, responseNumber);
    }
}