import { Component, Input, OnInit } from "@angular/core";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Quiz } from "src/models/quiz.model";

@Component({
    selector: 'app-viewQuiz',
    templateUrl: './viewQuiz.component.html',
    styleUrls: ['./viewQuiz.component.scss']
})

export class ViewQuizComponent implements OnInit {
    
    constructor(){
    }

    @Input()
    quiz : Quiz = QUIZ_LIST[0];

    ngOnInit(): void {}
}