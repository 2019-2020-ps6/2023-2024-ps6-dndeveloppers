import { Component, Input, OnInit } from "@angular/core";
import { Question } from '../../../models/question.models';
import { QUIZ_LIST, QUESTION_ACTOR0 } from "src/mocks/quiz-list.mock";
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from "src/models/quiz.model";

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
    @Input()
    question: string = "";

    constructor(public quizService: QuizService){
    }
    
    ngOnInit(): void {
    }
}