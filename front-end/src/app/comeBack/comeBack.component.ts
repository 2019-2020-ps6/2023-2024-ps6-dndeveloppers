import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ADMIN } from "src/mocks/profil.mock";
import { ProfilService } from "src/services/profil.service";
import { QuizService } from "src/services/quiz.service";

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
    
    constructor(public router: Router, public quizService: QuizService, public profilService: ProfilService){}

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
        this.quizService.reset();
        if (this.path == "home/") {
            this.profilService.selectProfil(ADMIN);         
        }
        this.router.navigate([this.path]);
    }
}