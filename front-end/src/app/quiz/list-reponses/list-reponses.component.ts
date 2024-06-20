import { Component, OnInit } from "@angular/core";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Answer } from "src/models/question.models";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";
import { Profil } from "src/models/profil.model";
import { LISTE_PROFILS } from "src/mocks/profil-list.mock";
import { ProfilService } from "src/services/profil.service";
import { InfoQuiz } from "src/models/infoQuiz.model";
import { infoQuiz_INIT } from "src/mocks/infoQuiz.mock";

@Component({
    selector: 'app-list-reponses',
    templateUrl: './list-reponses.component.html',
    styleUrls: ['./list-reponses.component.scss']
})

export class ListReponsesComponent implements OnInit {

    public actualResponses: Answer[] = [];

    public choosenQuiz: Quiz = QUIZ_LIST[0];

    public listePatient: Profil[] = LISTE_PROFILS;
    public profil: Profil = this.listePatient[0];
    public fontSize: string = this.profil.optionTailleTexte; 

    public couleur: string[] = ["#6958cf","#6958cf","#6958cf","#6958cf"];

    public infoQuiz: InfoQuiz = infoQuiz_INIT;
    public canClickButton: boolean = true;

    public tempsAffichage: number = 3;
    public buttonActivation: boolean = true;
    public optionIndice: boolean | undefined;


    constructor(public quizService: QuizService, public profilService: ProfilService){
        this.quizService.choosenQuiz$.subscribe((choosenQuiz) => {
            this.choosenQuiz = choosenQuiz;
        })

        this.quizService.infoQuiz$.subscribe((infoQuiz) => {
            this.infoQuiz = infoQuiz;
            this.actualResponses = this.choosenQuiz.questions[infoQuiz.actualQuestionNumber].answers;
            const badAnswer = this.infoQuiz.questionToReplayBadAnswer.get(this.infoQuiz.actualQuestionNumber+"");
            if(badAnswer != undefined){
                this.infoQuiz.displayResponses[badAnswer] = false;
                
            }
            
        })

        this.profilService.actualProfil$.subscribe((actualProfil)=>{
            this.profil = actualProfil;
            this.tempsAffichage = actualProfil.optionTempsReponse;
            this.fontSize = this.profil.optionTailleTexte;
        })

        this.profilService.actualProfil$.subscribe((profil) => {
            this.optionIndice = profil.optionIndice;
        })

        switch (this.fontSize) {
            case "Petit":
                this.fontSize = 1 + "em";
                break;
            case "Moyen":
                this.fontSize = 1.2 + "em";
                break;
            case "Grand":
                this.fontSize = 1.5 + "em";
                break;
        }
    }

    ngOnInit(): void {}

    responseSelected(responseNumber: number) {
        if (!this.infoQuiz.endOfQuiz) {
            if(this.actualResponses[responseNumber].isCorrect){
                this.quizService.disablingHintAndHelp(false);
                this.buttonActivation = false;
                this.couleur = ["#939393","#939393","#939393","#939393"];
                this.couleur[responseNumber] = "lightgreen";

                setTimeout(() => {
                    this.couleur = ["#6958cf","#6958cf","#6958cf","#6958cf"];
                    this.quizService.disablingHintAndHelp(true);
                    this.buttonActivation = true;
                    this.quizService.responseSelected(this.choosenQuiz, responseNumber);
                }, this.tempsAffichage*1000);
            } else {
                if (!this.profil.optionSupprimerMauvaisesReponses) {
                    this.quizService.disablingHintAndHelp(false);
                    this.buttonActivation = false;
                    this.couleur = ["#939393","#939393","#939393","#939393"];
                    for (let i=0; i<4; i++) {
                        if (this.actualResponses[i].isCorrect) {
                            this.couleur[i] = "lightgreen";
                        }
                    }
                    setTimeout(() => {
                        this.couleur = ["#6958cf","#6958cf","#6958cf","#6958cf"];
                        this.quizService.disablingHintAndHelp(true);
                        this.buttonActivation = true;
                        this.quizService.responseSelected(this.choosenQuiz, responseNumber);
                    }, this.tempsAffichage*1000);
                } else {
                    this.quizService.responseSelected(this.choosenQuiz, responseNumber);
                }
            }
        }
    }

    loadQuestion(nbQuestion: number) {
        this.actualResponses = this.choosenQuiz.questions[this.infoQuiz.actualQuestionNumber].answers;
    }

    catchClicDroit(event: any, action: any) {
        if (typeof action === 'number') {
            this.responseSelected(action);
        }
    }
}