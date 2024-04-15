import { Component, Input, OnInit } from "@angular/core";
import { Answer } from "src/models/question.models";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-reponse',
    templateUrl: './reponse.component.html',
    styleUrls: ['./reponse.component.scss']
})

export class ReponseComponent implements OnInit {

    public actualResponses: Answer[] = [];

    constructor(public quizService: QuizService){
        this.quizService.actualResponses$.subscribe((actualResponses) => {
            this.actualResponses = actualResponses;
        })
    }

    @Input()
    reponse: Answer | undefined;

    ngOnInit(): void {}
}