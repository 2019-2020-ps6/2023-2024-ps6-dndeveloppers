import { Component, Input, OnInit } from "@angular/core";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Answer } from "src/models/question.models";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";
import { Profil } from "src/models/profil.model";
import { LISTE_PROFILS } from "src/mocks/profil-list.mock";
import { ProfilService } from "src/services/profil.service";


@Component({
    selector: 'app-list-reponses',
    templateUrl: './list-reponses.component.html',
    styleUrls: ['./list-reponses.component.scss']
})

export class ListReponsesComponent implements OnInit {

    public actualResponses: Answer[] = [];
    public actualQuestionNumber: number = 0;
    public displayResponses: boolean[] = [true, true, true , true];

    public choosenQuiz: Quiz = QUIZ_LIST[0];

    public endOfQuiz: boolean = false;
    public listePatient: Profil[] = LISTE_PROFILS;
    public profil: Profil  = this.listePatient[0];
    public possibleEndMessage: String[] = [];

    public  couleur1: string | undefined;
    public  couleur2: string | undefined;
    public  couleur3: string | undefined;
    public  couleur4: string | undefined;


    public optionSupprimerMauvaisesReponses : boolean | undefined = this.profil.optionSupprimerMauvaisesReponses;

    constructor(public quizService: QuizService, public profilService: ProfilService){
        this.quizService.actualResponses$.subscribe((actualResponses) => {
            this.actualResponses = actualResponses;
        })

        this.quizService.displayResponses$.subscribe((displayResponses) => {
            this.displayResponses = displayResponses;
        })
        
        this.quizService.choosenQuiz$.subscribe((choosenQuiz) => {
            this.choosenQuiz = choosenQuiz;
        })

        this.profilService.actualProfil$.subscribe((profil) => {
            this.optionSupprimerMauvaisesReponses = profil.optionSupprimerMauvaisesReponses;
        })

        this.quizService.endOfQuiz$.subscribe((endOfQuiz) => {
            this.endOfQuiz = endOfQuiz;
        })

    }

    ngOnInit(): void {
        this.actualResponses = this.choosenQuiz.questions[0].answers;
        console.log("init",this.actualResponses);
    }

    @Input()
    quiz: Quiz = this.choosenQuiz;

    responseSelected(responseNumber: number) {
        if(this.optionSupprimerMauvaisesReponses){
            this.quizService.responseSelectedWithOptionSupprimerMauvaiseReponse(this.choosenQuiz, responseNumber);
        }
        else{
            let goodAnswer = 0;
            for (let i=0; i<this.actualResponses.length; i++) {
                if (this.actualResponses[i].isCorrect) {
                    goodAnswer = i + 1;
                    break;
                }
            }
            if(goodAnswer == 1) {
                this.couleur1 = "lightgreen";
                this.couleur2 = "#939393";
                this.couleur3 = "#939393";
                this.couleur4 = "#939393";
            }
            if(goodAnswer == 2){
                this.couleur1 = "#939393";
                this.couleur2 = "lightgreen";
                this.couleur3 = "#939393";
                this.couleur4 = "#939393";
            }
            if(goodAnswer == 3){
                this.couleur1 = "#939393";
                this.couleur2 = "#939393";
                this.couleur3 = "lightgreen";
                this.couleur4 = "#939393";
            }
            if(goodAnswer == 4){
                this.couleur1 = "#939393";
                this.couleur2 = "#939393";
                this.couleur3 = "#939393";
                this.couleur4 = "lightgreen";
            }
            setTimeout(() => {
                this.quizService.responseSelected(this.choosenQuiz, responseNumber);
                this.couleur1 = "#6958cf";
                this.couleur2 = "#6958cf";
                this.couleur3 = "#6958cf";
                this.couleur4 = "#6958cf";
            }, 5000);
        }
    }

    loadQuestion(nbQuestion: number) {
        console.log(this.actualQuestionNumber);
        console.log(this.actualResponses);
        this.actualResponses = this.choosenQuiz.questions[this.actualQuestionNumber].answers;
        console.log(this.actualResponses);
    }

}