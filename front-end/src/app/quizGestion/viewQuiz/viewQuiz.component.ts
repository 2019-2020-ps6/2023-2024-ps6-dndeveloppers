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

    constructor(private router: Router, public quizService:QuizService) {}

    ngOnInit(): void {}

    @Input()
    quiz : Quiz = QUIZ_LIST[0];

    editQuiz(quiz: Quiz){
        this.quizService.editingQuiz(quiz);
        this.router.navigate(['home/gestionQuiz/editQuiz/' + quiz.name]);
    }

    deleteQuiz(quiz: Quiz){
        this.quizService.deleteQuiz(quiz);
    }
}