import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-comeBack',
    templateUrl: './comeBack.component.html',
    styleUrls: ['./comeBack.component.scss']
})

export class ComeBackComponent implements OnInit {


    constructor(public router: Router){
    }

    @Input()

    ngOnInit(): void {}

    return(){
        this.router.navigate(['home/listQuiz/']);
    }
}