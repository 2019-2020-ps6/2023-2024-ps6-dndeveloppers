import { Component, Input, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-comeBack',
    templateUrl: './comeBack.component.html',
    styleUrls: ['./comeBack.component.scss']
})

export class ComeBackComponent implements OnInit {

    @Input()
    destination: String | undefined;

    public message: String = "";
    public path: String = "";
    
    constructor(public router: Router){
    }

    @Input()

    ngOnInit(): void {
        switch(this.destination){
            case "home":
                this.message = "Retour page principale";
                this.path = "home/";
                break;    
            case "quizList":
                this.message = "Retour page des quiz";
                this.path = "home/listQuiz/";
                break;   
            case "profilList":  
                this.message = "Retour page des profils";
                this.path = "home/listProfil/";
                break;  
            default :   
        }
    }

    return(){
        this.router.navigate([this.path]);
    }
}