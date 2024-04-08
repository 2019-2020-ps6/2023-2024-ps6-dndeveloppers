import { Component, OnInit } from "@angular/core";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'listProfil',
    templateUrl: './listProfil.component.html',
    styleUrls: ['./listProfil.component.scss']
})

export class ListProfilComponent implements OnInit {
    constructor(public quizService: QuizService){}

    ngOnInit(): void {}
}