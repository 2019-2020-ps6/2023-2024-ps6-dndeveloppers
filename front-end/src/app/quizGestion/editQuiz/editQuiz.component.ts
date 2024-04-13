import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Question } from "src/models/question.models";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'editQuiz',
    templateUrl: './editQuiz.component.html',
    styleUrls: ['./editQuiz.component.scss']
})

export class EditQuizComponent implements OnInit {
    @Input()
    public quiz: Quiz = QUIZ_LIST[0];

    public questionListe : Question[] = [];

    constructor(public quizService: QuizService, public router: Router){
        this.quizService.editedQuiz$.subscribe( (quiz) => {
            this.quiz = quiz;
            this.questionListe = this.quiz.questions;
            console.log(this.questionListe)
            console.log(this.questionListe[0])
        });
    }

    ngOnInit(): void {}

    return(){
        this.router.navigate(['home/gestionQuiz/']);
    }
}