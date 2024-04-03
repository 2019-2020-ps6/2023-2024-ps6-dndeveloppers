import { Component, Input, OnInit } from "@angular/core";
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
    public displayQuestion: Boolean = false;

    constructor(public quizService: QuizService){
        this.quizService.actualQuestion$.subscribe((actualQuestion) => {
            this.actualQuestion = actualQuestion;
        })

        this.quizService.displayQuiz$.subscribe((displayQuiz) => {
            this.displayQuestion = displayQuiz;
        })
    }

    @Input()
    question: Question = this.actualQuestion;
    displaySelf: Boolean = this.displayQuestion;

    ngOnInit(): void {}
}