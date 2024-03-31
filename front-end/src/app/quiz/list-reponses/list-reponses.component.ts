import { Component, Input, OnInit } from "@angular/core";
import { Answer } from "src/models/question.models";

@Component({
    selector: 'app-list-reponses',
    templateUrl: './list-reponses.component.html',
    styleUrls: ['./list-reponses.component.scss']
})

export class ListReponsesComponent implements OnInit {

    @Input()
    listReponses: Answer[] | undefined;

    constructor(){}

    ngOnInit(): void {}
}