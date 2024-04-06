import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Answer, Question } from "src/models/question.models";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";


@Component({
    selector: 'app-list-reponses',
    templateUrl: './list-reponses.component.html',
    styleUrls: ['./list-reponses.component.scss']
})

export class ListReponsesComponent implements OnInit {

    public actualResponses: Answer[] = [];
    public actualQuestionNumber: number = 0;

    constructor(public quizService: QuizService){
        this.quizService.actualQuestionNumber$.subscribe((actualQuestionNumber) => {
            this.actualQuestionNumber = actualQuestionNumber;
        })
    }

    @Input()
    quiz: Quiz = QUIZ_LIST[0];


    ngOnInit(): void {
        this.actualResponses = this.quiz.questions[0].answers;
        console.log("init",this.actualResponses);
    }

    public choosenQuiz: Quiz = this.quiz;

    responseSelected(responseNumber: number) {
        console.log("Response selected : ",responseNumber);
        this.quizService.responseSelected(this.choosenQuiz, responseNumber);
        
        this.loadQuestion(0);
    }

    loadQuestion(nbQuestion: number) {
        this.actualResponses = this.quiz.questions[this.actualQuestionNumber].answers;
    }
}