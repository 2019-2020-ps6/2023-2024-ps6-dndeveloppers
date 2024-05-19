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

    public nbBonnesReponses: number = 0;
    public nbIndiceUtilise: number = 0;
    public streakDeBonneReponse: number = 0;

    public bonScore: boolean = false;
    public bonneStreak: boolean = false;
    public peuDindice: boolean = false;

    public goodAnswer: number = 0;

    public  couleur1: string | undefined;
    public  couleur2: string | undefined;
    public  couleur3: string | undefined;
    public  couleur4: string | undefined;


    public optionSupprimerMauvaisesReponses : boolean | undefined = this.profil.optionSupprimerMauvaisesReponses;

    constructor(public quizService: QuizService, public profilService: ProfilService){
        this.quizService.actualResponses$.subscribe((actualResponses) => {
            this.actualResponses = actualResponses;
        })

        this.quizService.actualQuestionNumber$.subscribe((actualQuestionNumber) => {
            this.actualQuestionNumber = actualQuestionNumber;
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

        this.quizService.bonScore$.subscribe((bonScore) => {
            this.bonScore = bonScore;
        })

        this.quizService.bonneStreak$.subscribe((bonneStreak) => {
            this.bonneStreak = bonneStreak;
        })

        this.quizService.peuDindice$.subscribe((peuDindice) => {
            this.peuDindice = peuDindice;
        })

        this.quizService.nbIndiceUtilise$.subscribe((nbIndiceUtilise) => {
            this.nbIndiceUtilise = nbIndiceUtilise;
        })

        this.quizService.nbBonneReponses$.subscribe((nbBonneReponses) => {
            this.nbBonnesReponses = nbBonneReponses;
        })

        this.quizService.streakDeBonneReponse$.subscribe((streakDeBonneReponse) => {
            this.streakDeBonneReponse = streakDeBonneReponse;
        })

        this.quizService.streakDeBonneReponse$.subscribe((streakDeBonneReponse) => {
            this.streakDeBonneReponse = streakDeBonneReponse;
        })

        this.quizService.goodAnswer$.subscribe((goodAnswer) => {
            this.goodAnswer = goodAnswer;
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
            this.quizService.isGoodAnswer(this.choosenQuiz, responseNumber);
            if(this.goodAnswer == 1){
                this.couleur1 = "lightgreen";
                this.couleur2 = "#939393";
                this.couleur3 = "#939393";
                this.couleur4 = "#939393";
            }
            if(this.goodAnswer == 2){
                this.couleur1 = "#939393";
                this.couleur2 = "lightgreen";
                this.couleur3 = "#939393";
                this.couleur4 = "#939393";
            }
            if(this.goodAnswer == 3){
                this.couleur1 = "#939393";
                this.couleur2 = "#939393";
                this.couleur3 = "lightgreen";
                this.couleur4 = "#939393";
            }
            if(this.goodAnswer == 4){
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