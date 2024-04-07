import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-comeBack',
    templateUrl: './comeBack.component.html',
    styleUrls: ['./comeBack.component.scss']
})

export class ComeBackComponent implements OnInit {


    constructor(){
    }

    @Input()

    ngOnInit(): void {}
}