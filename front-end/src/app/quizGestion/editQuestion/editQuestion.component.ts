import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-editQuestion',
    templateUrl: './editQuestion.component.html',
    styleUrls: ['./editQuestion.component.scss']
})

export class EditQuestionComponent implements OnInit {


    constructor(){
    }

    @Input()

    ngOnInit(): void {}
}