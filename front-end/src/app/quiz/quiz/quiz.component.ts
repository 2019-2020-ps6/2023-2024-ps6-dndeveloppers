import { Component, OnInit, Input } from "@angular/core";
import { QuizService } from "src/services/quiz.service";
import { Quiz } from "src/models/quiz.model";
import { QUESTION_ACTOR0, QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Router } from "@angular/router";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

    public choosenQuiz: Quiz = QUIZ_LIST[0];
    public actualQuestionNumber: number = 0;

    constructor(public quizService: QuizService, public router: Router){
        this.quizService.choosenQuiz$.subscribe((choosenQuiz) => {
            this.choosenQuiz = choosenQuiz;
        })

        this.quizService.actualQuestionNumber$.subscribe((actualQuestionNumber) => {
            this.actualQuestionNumber = actualQuestionNumber;
        })
    }

    @Input()

    ngOnInit(): void {
        console.log(this.choosenQuiz);
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