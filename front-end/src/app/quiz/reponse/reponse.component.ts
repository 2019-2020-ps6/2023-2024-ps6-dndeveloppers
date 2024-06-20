import { Component, Input, OnInit } from "@angular/core";
import { Answer } from "src/models/question.models";

@Component({
    selector: 'app-reponse',
    templateUrl: './reponse.component.html',
    styleUrls: ['./reponse.component.scss']
})

export class ReponseComponent implements OnInit {

    constructor(){}

    ngOnInit(): void {}

    @Input()
    reponse: Answer | undefined;
}