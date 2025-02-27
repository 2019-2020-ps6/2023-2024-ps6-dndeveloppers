import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
    @Input()
    question: string | undefined;

    @Input()
    photo: string | undefined;

    
    public texte : string = '';

    constructor(){
        if(this.question){
            this.texte = this.question; 
        }
    }
    
    ngOnInit(): void {
    }
}