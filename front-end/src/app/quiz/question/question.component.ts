import { Component, OnInit } from "@angular/core";
import { Question } from '../../../models/question.models';
import { QUESTION_ACTOR0 } from "src/mocks/quiz-list.mock";
import { QuizService } from '../../../services/quiz.service';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {

    public actualQuestion: Question = QUESTION_ACTOR0;

    constructor(public quizService: QuizService){
        this.quizService.actualQuestion$.subscribe((actualQuestion) => {
            this.actualQuestion = actualQuestion;
        })
    }

    ngOnInit(): void {}
}