import { Component, Input, OnInit } from "@angular/core";
import { QuizService } from "src/services/quiz.service";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-indice',
    templateUrl: './indice.component.html',
    styleUrls: ['./indice.component.scss']
})

export class IndiceComponent implements OnInit {


    constructor(public quizService: QuizService){
    }

    @Input()

    ngOnInit(): void {}

    hintAsked() {
        this.quizService.hintAsked();
    }
}