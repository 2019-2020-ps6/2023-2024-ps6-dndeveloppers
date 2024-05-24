import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LISTE_PATIENTS } from 'src/mocks/profil-list.mock';
import { QUIZ_LIST, QUIZ_NULL } from 'src/mocks/quiz-list.mock';
import { Profil } from 'src/models/profil.model';
import { Quiz } from 'src/models/quiz.model';

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    

    /*
     * Pour les statistiques par patient
     */

    constructor(private http: HttpClient){}

    private listePatient: Profil[] = LISTE_PATIENTS;
    private series = this.fillSeries();

    public listePatient$: BehaviorSubject<Profil[]> = new BehaviorSubject(this.listePatient);
    public series$: BehaviorSubject<any> = new BehaviorSubject(this.series);

    addPatient(patient: Profil) {
      this.listePatient.push(patient);
    }

    addQuiz(quiz: Quiz) {
      let newElement = {
        name: quiz.name,
        data: []
      }
      this.series.push(newElement);
    }

    fillSeries() {
      let res = [];
      for (let i=0; i<QUIZ_LIST.length; i++) {
          let name = QUIZ_LIST[i].name;
          let data: number[] = [];
          let tab = {
              name: name,
              data: data
          }
          res.push(tab);
      }
      return res;
    }

    patientScoreNewData(profil: Profil, score: number) {
      profil.selfStats.nbQuizDone++;
      profil.selfStats.quizRes.push(score*100);

      let num = 0;
      for (let i=0; i<profil.selfStats.quizRes.length; i++) {
        num += profil.selfStats.quizRes[i];
      }
      profil.selfStats.meanScore = num/profil.selfStats.quizRes.length;
    }

    /*
     * Pour les statistiques par quiz
     */

    private actualQuiz: Quiz = QUIZ_NULL;
    private actualScore: number = 0;
    private usedHint: number = 0;

    public actualQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject(this.actualQuiz);
    public actualScore$: BehaviorSubject<number> = new BehaviorSubject(this.actualScore);
    public usedHint$: BehaviorSubject<number> = new BehaviorSubject(this.usedHint);

    selectQuiz(quiz: Quiz) {
      this.actualQuiz = quiz;
      this.actualQuiz.selfStats.playedTime++;
      this.actualScore = 0;
      this.usedHint = 0;

      this.actualQuiz$.next(this.actualQuiz);
      this.actualScore$.next(this.actualScore);
      this.usedHint$.next(this.usedHint);
    }

    meanScoreNewData(score: number) {
      this.actualQuiz.selfStats.resTab.push(score);

      let num = 0;
      for (let i=0; i<this.actualQuiz.selfStats.resTab.length; i++) {
        num += this.actualQuiz.selfStats.resTab[i];
      }
      this.actualQuiz.selfStats.meanScore = num/this.actualQuiz.selfStats.resTab.length;
    }

    usedHintNewData(usedHint: number) {
      this.actualQuiz.selfStats.nbHintUsed.push(usedHint);

      let num = 0;
      for (let i=0; i<this.actualQuiz.selfStats.nbHintUsed.length; i++) {
        num += this.actualQuiz.selfStats.nbHintUsed[i];
      }
      this.actualQuiz.selfStats.meanHintUsed = num/this.actualQuiz.selfStats.nbHintUsed.length;
    }

    successRateNewData(responseVeracity: number, actualQuestionNumber: number) {
      if (this.actualQuiz.selfStats.successPercentageByQuestion[actualQuestionNumber] == undefined) {
        this.actualQuiz.selfStats.successPercentageByQuestion[actualQuestionNumber] = responseVeracity;
      } else {
        let rate = this.actualQuiz.selfStats.successPercentageByQuestion[actualQuestionNumber];
        rate *= this.actualQuiz.selfStats.playedTime-1;
        rate += responseVeracity;
        rate /= this.actualQuiz.selfStats.playedTime;
        this.actualQuiz.selfStats.successPercentageByQuestion[actualQuestionNumber] = rate;
      }
    }
}