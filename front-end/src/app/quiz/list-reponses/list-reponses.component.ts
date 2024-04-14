import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Answer, Question } from "src/models/question.models";
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
    public endOfQuiz: boolean = false;
    public listePatient: Profil[] = LISTE_PROFILS;
    public profil: Profil  = this.listePatient[0];
    public possibleEndMessage: String[] = [];

    public nbBonneReponses: number = 0;
    public nbIndiceUtilise: number = 0;
    public streakDeBonneReponse: number = 0;

    public bonScore: boolean = false;
    public bonneStreak: boolean = false;
    public peuDindice: boolean = false;

    constructor(public quizService: QuizService){
        this.quizService.actualQuestionNumber$.subscribe((actualQuestionNumber) => {
            this.actualQuestionNumber = actualQuestionNumber;
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

        this.quizService.nbBonneReponses$.subscribe((nbBonneReponses) => {
            this.nbBonneReponses = nbBonneReponses;
        })

        this.quizService.nbIndiceUtilise$.subscribe((nbIndiceUtilise) => {
            this.nbIndiceUtilise = nbIndiceUtilise;
        })

        this.quizService.streakDeBonneReponse$.subscribe((streakDeBonneReponse) => {
            this.streakDeBonneReponse = streakDeBonneReponse;
        })
    }

    @Input()
    quiz: Quiz = QUIZ_LIST[0];


    ngOnInit(): void {
        this.actualResponses = this.quiz.questions[0].answers;
        console.log("init",this.actualResponses);
    }

    public choosenQuiz: Quiz = this.quiz;

    responseSelected(responseNumber: number) {
        console.log("Response selected : ",responseNumber," - bonne réponse : ",this.quiz.questions[this.actualQuestionNumber].answers);
        this.quizService.responseSelected(this.choosenQuiz, responseNumber);
        
        this.loadQuestion(0);
    }

    loadQuestion(nbQuestion: number) {
        this.actualResponses = this.quiz.questions[this.actualQuestionNumber].answers;
    }

}