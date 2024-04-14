import { Component, OnInit, Input } from "@angular/core";
import { QuizService } from "src/services/quiz.service";
import { Quiz } from "src/models/quiz.model";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Router } from "@angular/router";
import { ADMIN } from "src/mocks/profil.mock";
import { Profil } from "src/models/profil.model";

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

    ngOnInit(): void {}

    @Input()
    tutorielView: boolean = this.quizService.getTuto();

    tutoriel(){
        this.tutorielView = true;
    }

    stopShowTutoriel(){
        this.tutorielView = false;
    }
}