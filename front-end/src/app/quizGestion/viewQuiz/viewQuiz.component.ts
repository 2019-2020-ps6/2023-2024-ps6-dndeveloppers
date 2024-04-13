import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-viewQuiz',
    templateUrl: './viewQuiz.component.html',
    styleUrls: ['./viewQuiz.component.scss']
})

export class ViewQuizComponent implements OnInit {

    constructor(public quizService:QuizService, private router: Router){
    }

    @Input()
    quiz : Quiz = QUIZ_LIST[0];

    ngOnInit(): void {}

    editQuiz(quiz: Quiz){
        this.router.navigate(['home/gestionQuiz/editQuiz/' + quiz.name]);
        this.quizService.editingQuiz(quiz);
    }

    deleteQuiz(quiz: Quiz){
        this.quizService.deleteQuiz(quiz);
    }
}