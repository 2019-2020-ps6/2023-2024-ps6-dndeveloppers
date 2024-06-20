import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ADMIN } from "src/mocks/profil.mock";
import { Profil } from "src/models/profil.model";
import { ProfilService } from "src/services/profil.service";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-comeBack',
    templateUrl: './comeBack.component.html',
    styleUrls: ['./comeBack.component.scss']
})

export class ComeBackComponent implements OnInit {

    public message: String = "";
    public path: String = "";
    
    constructor(private router: Router, public quizService: QuizService, public profilService: ProfilService){}

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

    @Input()
    destination: String | undefined;

    return(){
        if (this.path == "home/") {
             let admin: Profil = this.profilService.profilList$.value.at(0) || ADMIN;
            this.profilService.selectProfil(admin);
        } else if(this.path == "home/listQuiz/"){
            if(this.quizService.infoQuiz$.value.endOfQuiz){
                this.quizService.resetInfoQuiz();
            }
        }
        this.router.navigate([this.path]);
    }

    catchClicDroit(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.return();
    }
}