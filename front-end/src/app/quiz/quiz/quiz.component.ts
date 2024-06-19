import { Component, OnInit, Input } from "@angular/core";
import { QuizService } from "src/services/quiz.service";
import { Quiz } from "src/models/quiz.model";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Router } from "@angular/router";
import { ProfilService } from "src/services/profil.service";

import { ADMIN } from "src/mocks/profil.mock";
import { Profil } from "src/models/profil.model";
import { InfoQuiz } from "src/models/infoQuiz.model";
import { infoQuiz_INIT } from "src/mocks/infoQuiz.mock";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {
    public infoQuiz: InfoQuiz = infoQuiz_INIT;
    public showHint: boolean[] = [false, false, false];
    public choosenQuiz: Quiz = QUIZ_LIST[0];
    public optionIndice: boolean | undefined;

    public actualProfil: Profil = ADMIN;
    public pathImage: String = '';
    public skip: String = "Passer la question";
    public ask: String = "Voulez-vous revenir à votre dernière tentative sur ce quiz ?";
    public oui: String = "Revenir";
    public non: String = "Recommencer";

    constructor(public quizService: QuizService, public router: Router, public profilService: ProfilService){
        this.quizService.choosenQuiz$.subscribe((choosenQuiz) => {
            this.choosenQuiz = choosenQuiz;
            
        })

        this.quizService.infoQuiz$.subscribe((infoQuiz)=>{
            this.infoQuiz = infoQuiz;
        })

        this.quizService.showHint$.subscribe((showHint) => {
            this.showHint = showHint;
        })

        this.profilService.actualProfil$.subscribe((profil) => {
            this.optionIndice = profil.optionIndice;
        })
    }

    ngOnInit(): void {
        this.quizService.actualProfil$.subscribe((actualProfil) => {
            this.actualProfil = actualProfil;
        })
    }

    skipQuestion(){
        this.quizService.skipQuestion(this.choosenQuiz);
    }

    restoreQuiz(){
        this.quizService.restoreQuiz();
    }

    restartQuiz(){
        this.quizService.resetInfoQuiz();
    }
}