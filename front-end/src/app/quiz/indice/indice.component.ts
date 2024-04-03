import { Component, Input, OnInit } from "@angular/core";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-indice',
    templateUrl: './indice.component.html',
    styleUrls: ['./indice.component.scss']
})

export class IndiceComponent implements OnInit {

    public displayIndice: Boolean = false;

    constructor(public quizService: QuizService){
        this.quizService.displayQuiz$.subscribe((displayQuiz) => {
            this.displayIndice = displayQuiz;
        })
    }

    @Input()
    displaySelf: Boolean = this.displayIndice;

    ngOnInit(): void {}
}