import { Component, OnInit, Input } from "@angular/core";
import { QuizService } from "src/services/quiz.service";
import { Router } from '@angular/router';
import { Quiz } from "src/models/quiz.model";
import { QUESTION_ACTOR0, QUIZ_LIST } from "src/mocks/quiz-list.mock";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {
    public choosenQuiz: Quiz;
    public numQuiz:number;
    public numQuestion:number;

    constructor(private router: Router){
        let urlQuiz:string[] = this.router.url.split('/');
        this.numQuiz = parseInt(urlQuiz[urlQuiz.length-1]);
        this.choosenQuiz = QUIZ_LIST[this.numQuiz];
        this.numQuestion = 0; // on commence à la question 0
    }

    @Input()

    ngOnInit(): void {
        console.log(this.numQuiz);
        console.log(this.choosenQuiz);
    }
}