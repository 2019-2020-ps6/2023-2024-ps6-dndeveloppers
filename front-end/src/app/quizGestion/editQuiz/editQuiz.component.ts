import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'editQuiz',
    templateUrl: './editQuiz.component.html',
    styleUrls: ['./editQuiz.component.scss']
})

export class EditQuizComponent implements OnInit {


    constructor(){
    }

    @Input()

    ngOnInit(): void {}
}