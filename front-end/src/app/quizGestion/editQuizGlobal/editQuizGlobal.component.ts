import { Component, Input, OnInit } from "@angular/core";
import { Question } from "src/models/question.models";

@Component({
    selector: 'app-editQuizGlobal',
    templateUrl: './editQuizGlobal.component.html',
    styleUrls: ['./editQuizGlobal.component.scss']
})

export class EditQuizGlobalComponent implements OnInit {


    constructor(){
    }

    @Input()
    question: Question | undefined;

    ngOnInit(): void {}
}