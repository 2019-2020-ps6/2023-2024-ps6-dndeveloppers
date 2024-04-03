import { Component, OnInit, Input } from "@angular/core";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

    public displayQuiz: boolean = false;

    constructor(public quizService: QuizService){
        this.quizService.displayQuiz$.subscribe((displayQuiz) => {
            this.displayQuiz = displayQuiz;
        })
    }

    @Input()
    displaySelf: boolean = this.displayQuiz;

    ngOnInit(): void {}
}