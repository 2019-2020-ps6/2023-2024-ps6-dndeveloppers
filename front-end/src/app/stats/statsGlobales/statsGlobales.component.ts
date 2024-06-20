import { Component, OnInit } from "@angular/core";
import { Profil } from "src/models/profil.model";
import { ProfilService } from "src/services/profil.service";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-stats-globales',
    templateUrl: './statsGlobales.component.html',
    styleUrls: ['./statsGlobales.component.scss']
})

export class StatsGlobalesComponent implements OnInit {

    public nbPatient: number = 0;
    public nbQuiz: number = 0;
    public quizDone: number = 0;

    constructor(public quizService: QuizService, public profilService: ProfilService){
        this.profilService.profilList$.subscribe((profilList) => {
            this.nbPatient = this.numberPatient(profilList);
            this.quizDone = this.nbQuizDone(profilList);
        })

        this.quizService.quizzes$.subscribe((quizzes) => {
            this.nbQuiz = quizzes.length;
        })
    }

    ngOnInit(): void {}

    nbQuizDone(profilList: Profil[]) {
        let res = 0;
        for (let i=0; i<profilList.length; i++) {
            if (profilList[i].selfStats != undefined) {
                res += profilList[i].selfStats.nbQuizDone;
            }   
        }
        return res;
    }

    numberPatient(profilList: Profil[]) {
        let res = 0;
        for (let i=0; i<profilList.length; i++) {
            if (profilList[i].role == "patient") {
                res++;
            }
        }
        return res;
    }
}