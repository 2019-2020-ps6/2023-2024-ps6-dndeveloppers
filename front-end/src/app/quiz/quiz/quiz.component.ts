import { Component, OnInit, Input } from "@angular/core";
import { QuizService } from "src/services/quiz.service";
import { Quiz } from "src/models/quiz.model";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Router } from "@angular/router";
import { Indice } from "src/models/question.models";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

    public choosenQuiz: Quiz = QUIZ_LIST[0];
    public actualQuestionNumber: number = 0;
    public actualIndices: Indice[] = QUIZ_LIST[1].questions[0].indice//this.choosenQuiz.questions[this.actualQuestionNumber].indice;
    public usedIndice: number[] = [];

    constructor(public quizService: QuizService, public router: Router){
        this.quizService.choosenQuiz$.subscribe((choosenQuiz) => {
            this.choosenQuiz = choosenQuiz;
        })

        this.quizService.actualQuestionNumber$.subscribe((actualQuestionNumber) => {
            this.actualQuestionNumber = actualQuestionNumber;
        })

        this.quizService.actualIndices$.subscribe((actualIndices) => {
            this.actualIndices = actualIndices;
        })

        this.quizService.usedIndice$.subscribe((usedIndice) => {
            this.usedIndice = usedIndice;
        })
    }

    ngOnInit(): void {
        console.log("indices",this.actualIndices);
    }

    @Input()
    tutorielView: boolean = true;

    tutoriel(){
        this.tutorielView = true;
    }

    stopShowTutoriel(){
        this.tutorielView = false;
    }
}