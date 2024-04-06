import { Component, OnInit, Input } from "@angular/core";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

    constructor(){
    }

    @Input()

    ngOnInit(): void {}
}