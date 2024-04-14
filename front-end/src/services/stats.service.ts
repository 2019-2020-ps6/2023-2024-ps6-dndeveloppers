import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ListProfilComponent } from 'src/app/Profil/listProfil/listProfil.component';
import { LISTE_PROFILS } from 'src/mocks/profil-list.mock';
import { QUIZ_LIST, QUIZ_NULL } from 'src/mocks/quiz-list.mock';
import { Profil } from 'src/models/profil.model';
import { Quiz } from 'src/models/quiz.model';

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    /*
     * Pour les statistiques globales
     */

    private nbPatient: number = this.numberPatient();
    private nbQuiz: number = QUIZ_LIST.length;
    private quizDone: number = this.nbQuizDone();

    public nbPatient$: BehaviorSubject<number> = new BehaviorSubject(this.nbPatient);
    public nbQuiz$: BehaviorSubject<number> = new BehaviorSubject(this.nbQuiz);
    public quizDone$: BehaviorSubject<number> = new BehaviorSubject(this.quizDone);

    numberPatient() {
      let res = 0;
      for (let i=0; i<LISTE_PROFILS.length; i++) {
        if (LISTE_PROFILS[i].role == "patient") {
          res++;
        }
      }
      return res;
    }

    addQuizDone() {
      this.quizDone++;
      this.quizDone$.next(this.quizDone);
    }

    nbQuizDone() {
      let res = 0;
      for (let i=0; i<LISTE_PROFILS.length; i++) {
        if(LISTE_PROFILS[i].selfStats != undefined){
          res += LISTE_PROFILS[i].selfStats.nbQuizDone;
        }
        
      }
      return res;
    }

    /*
     * Pour les statistiques par patient
     */

    private options: string[] = [];
    private playedQuiz: number = 0;
    private patientMeanScore: number = 0;
    private fiveLastQuizzes: Quiz[] = [];
    private series = this.fillSeries();

    public options$: BehaviorSubject<string[]> = new BehaviorSubject(this.options);
    public playedQuiz$: BehaviorSubject<number> = new BehaviorSubject(this.playedQuiz);
    public patientMeanScore$: BehaviorSubject<number> = new BehaviorSubject(this.patientMeanScore);
    public fiveLastQuizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.fiveLastQuizzes);
    public series$: BehaviorSubject<any> = new BehaviorSubject(this.series);

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

    addQuiz(quiz: Quiz) {
      let newElement = {
        name: quiz.name,
        data: []
      }
      this.series.push(newElement);
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
    private actualQuizId: number = 0;
    private actualScore: number = 0;
    private maxScore: number = QUIZ_LIST[0].questions.length;
    private usedHint: number = 0;
    private nbQuestionsTexte: number = this.nbTypeQuestion(this.actualQuiz, "Texte");
    private nbQuestionsImage: number = this.nbTypeQuestion(this.actualQuiz, "Image");

    public actualQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject(this.actualQuiz);
    public actualQuizId$: BehaviorSubject<number> = new BehaviorSubject(this.actualQuizId);
    public actualScore$: BehaviorSubject<number> = new BehaviorSubject(this.actualScore);
    public maxScore$: BehaviorSubject<number> = new BehaviorSubject(this.maxScore);
    public usedHint$: BehaviorSubject<number> = new BehaviorSubject(this.usedHint);
    public nbQuestionsTexte$: BehaviorSubject<number> = new BehaviorSubject(this.nbQuestionsTexte);
    public nbQuestionsImage$: BehaviorSubject<number> = new BehaviorSubject(this.nbQuestionsImage);

    selectQuiz(quiz: Quiz) {
      this.actualQuiz = quiz;
      this.actualQuiz.selfStats.playedTime++;
      this.actualQuizId = quiz.id;
      this.actualScore = 0;
      this.maxScore = quiz.questions.length;
      this.usedHint = 0;
      this.nbQuestionsTexte = this.nbTypeQuestion(quiz, "Texte");
      this.nbQuestionsImage = this.nbTypeQuestion(quiz, "Image");
      this.refreshQuizSubscribers();
    }

    nbTypeQuestion(quiz: Quiz, type: string) {
      let res = 0;
      if (type == "Texte") {
        for (let i=0; i<quiz.questions.length; i++) {
          if (quiz.questions[i].questionTexte) {
            res++;
          }
        }
      } else if (type == "Image") {
        for (let i=0; i<quiz.questions.length; i++) {
          if (quiz.questions[i].questionImage) {
            res++;
          }
        }
      }
      return res;
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

    refreshQuizSubscribers() {
      this.actualQuiz$.next(this.actualQuiz);
      this.actualQuizId$.next(this.actualQuizId);
      this.actualScore$.next(this.actualScore);
      this.maxScore$.next(this.maxScore);
      this.usedHint$.next(this.usedHint);
      this.nbQuestionsTexte$.next(this.nbQuestionsTexte);
      this.nbQuestionsImage$.next(this.nbQuestionsImage);
    }
}