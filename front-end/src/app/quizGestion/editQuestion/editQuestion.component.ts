import { Component, Input, OnInit } from "@angular/core";
import { Question } from "src/models/question.models";

@Component({
    selector: 'app-editQuestion',
    templateUrl: './editQuestion.component.html',
    styleUrls: ['./editQuestion.component.scss']
})

export class EditQuestionComponent implements OnInit {
    @Input()
    question : Question | undefined

    constructor(){
    }

    

    ngOnInit(): void {}
}