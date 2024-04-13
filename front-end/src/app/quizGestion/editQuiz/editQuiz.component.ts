import { Component, Input, OnInit } from "@angular/core";
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
    public quiz: Quiz | undefined;


    constructor(public quizService: QuizService){
        this.quizService.editedQuiz$.subscribe( (quiz) => {
            this.quiz = quiz;
        });
    }

    

    ngOnInit(): void {}
}