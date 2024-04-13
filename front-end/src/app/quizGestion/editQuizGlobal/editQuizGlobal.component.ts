import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-editQuizGlobal',
    templateUrl: './editQuizGlobal.component.html',
    styleUrls: ['./editQuizGlobal.component.scss']
})

export class EditQuizGlobalComponent implements OnInit {


    constructor(){
    }

    @Input()

    ngOnInit(): void {}
}