import { Component, OnInit, Input } from "@angular/core";
import { QuizService } from "src/services/quiz.service";
import { Quiz } from "src/models/quiz.model";
import { QUIZ_LIST } from "src/mocks/quiz-list.mock";
import { Router } from "@angular/router";
import { Indice } from "src/models/question.models";
import { ProfilService } from "src/services/profil.service";

import { ADMIN } from "src/mocks/profil.mock";
import { Profil } from "src/models/profil.model";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

    public choosenQuiz: Quiz = QUIZ_LIST[0];
    public actualQuestionNumber: number = 0;
    public actualIndices: Indice[] = QUIZ_LIST[1].questions[0].indice//this.choosenQuiz.questions[this.actualQuestionNumber].indice;
    public usedIndice: number[] = [];
    public  optionIndice : boolean | undefined;

    public actualProfil: Profil = ADMIN;

    constructor(public quizService: QuizService, public router: Router, public profilService: ProfilService){
        this.quizService.choosenQuiz$.subscribe((choosenQuiz) => {
            this.choosenQuiz = choosenQuiz;
        })

        this.quizService.actualQuestionNumber$.subscribe((actualQuestionNumber) => {
            this.actualQuestionNumber = actualQuestionNumber;
        })


        this.quizService.actualIndices$.subscribe((actualIndices) => {
            this.actualIndices = actualIndices;
        })

        this.quizService.usedIndice$.subscribe((usedIndice) => {
            this.usedIndice = usedIndice;
        })

        profilService.actualProfil$.subscribe((profil) => {
            this.optionIndice = profil.optionIndice;
        })
    }

    ngOnInit(): void {
        console.log("indices",this.actualIndices);

        this.quizService.actualProfil$.subscribe((actualProfil) => {
            this.actualProfil = actualProfil;
        })
    }

    ngOnInit(): void {}

    @Input()
    tutorielView: boolean = true;
    helpWanted: boolean = false;

    tutoriel(){
        this.tutorielView = true;
    }

    tutorielWanted() {
        this.helpWanted = true;
    }

    stopShowTutoriel(){
        this.tutorielView = false;
        this.helpWanted = false;
    }

    dontShowTutoriel() {
        this.tutorielView = false;
        this.helpWanted = false;
        this.quizService.dontShowTutoriel();
    }
}