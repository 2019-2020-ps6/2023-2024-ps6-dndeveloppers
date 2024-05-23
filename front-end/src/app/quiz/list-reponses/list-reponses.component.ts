import { Component, Input, OnInit } from "@angular/core";
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
    public profil: Profil  = this.listePatient[0];

    public couleur: string[] = ["#6958cf","#6958cf","#6958cf","#6958cf"];

    public infoQuiz: InfoQuiz = infoQuiz_INIT;
    public canClickButton: boolean = true;

    constructor(public quizService: QuizService, public profilService: ProfilService){
        this.quizService.actualResponses$.subscribe((actualResponses) => {
            this.actualResponses = actualResponses;
        })
        
        this.quizService.choosenQuiz$.subscribe((choosenQuiz) => {
            this.choosenQuiz = choosenQuiz;
        })

        this.quizService.infoQuiz$.subscribe((infoQuiz) => {
            this.infoQuiz = infoQuiz;
        })

        this.profilService.actualProfil$.subscribe((actualProfil)=>{
            this.profil = actualProfil;
        })
    }

    ngOnInit(): void {
        this.actualResponses = this.choosenQuiz.questions[0].answers;
        console.log("init",this.actualResponses);
    }

    responseSelected(responseNumber: number) {
        if(this.actualResponses[responseNumber].isCorrect){
            this.quizService.updatedisableAnswerButton(false);
            this.couleur = ["#939393","#939393","#939393","#939393"];
            this.couleur[responseNumber] = "lightgreen";
            setTimeout(() => {
                this.couleur = ["#6958cf","#6958cf","#6958cf","#6958cf"];
                this.quizService.updatedisableAnswerButton(true);
                this.quizService.responseSelected(this.choosenQuiz, responseNumber);
            }, 5000);
        }
        else if(this.quizService.getCanClickButtonAnswer()){
            
            if(!this.profil.optionSupprimerMauvaisesReponses){
                this.quizService.updatedisableAnswerButton(false);
                this.couleur = ["#939393","#939393","#939393","#939393"];
                let goodAnswer = 0;
                for(let i=0;i<4;i++){
                    if(this.actualResponses[i].isCorrect) goodAnswer=i;
                }
                this.couleur[goodAnswer] = "lightgreen"
                setTimeout(() => {
                    this.couleur = ["#6958cf","#6958cf","#6958cf","#6958cf"];
                    this.quizService.updatedisableAnswerButton(true);
                    this.quizService.responseSelected(this.choosenQuiz, responseNumber);
                }, 5000);
            }
            else {
                this.quizService.responseSelected(this.choosenQuiz, responseNumber);
            }

        
        }  
    }

    loadQuestion(nbQuestion: number) {
        console.log(this.infoQuiz.actualQuestionNumber);
        console.log(this.actualResponses);
        this.actualResponses = this.choosenQuiz.questions[this.infoQuiz.actualQuestionNumber].answers;
        console.log(this.actualResponses);
    }
}