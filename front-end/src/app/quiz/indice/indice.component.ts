import { Component, Input, OnInit } from "@angular/core";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-indice',
    templateUrl: './indice.component.html',
    styleUrls: ['./indice.component.scss']
})

export class IndiceComponent implements OnInit {


    constructor(){
    }

    @Input()

    ngOnInit(): void {}
}