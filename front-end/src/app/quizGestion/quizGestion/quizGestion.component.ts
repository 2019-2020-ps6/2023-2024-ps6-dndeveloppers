import { Component, Input, OnInit } from "@angular/core";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'quizGestion',
    templateUrl: './quizGestion.component.html',
    styleUrls: ['./quizGestion.component.scss']
})

export class QuizGestionComponent implements OnInit {

    public quizList: Quiz[] = [];

    constructor(public quizService: QuizService) {
        this.quizService.quizzes$.subscribe((quizList) => {
          this.quizList = quizList;
        });
    }

    ngOnInit(): void {}
}