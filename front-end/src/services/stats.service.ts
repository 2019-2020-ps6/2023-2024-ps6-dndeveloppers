import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LISTE_PATIENT } from 'src/mocks/patient-list.mock';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Quiz } from 'src/models/quiz.model';

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    /*
     * Pour les statistiques globales
     */

    private nbPatient: number = LISTE_PATIENT.length;
    private nbQuiz: number = QUIZ_LIST.length;
    private quizDone: number = this.nbQuizDone();
    private quizDonePerPerson: number[] = this.nbQuizDonePerPerson();

    public nbPatient$: BehaviorSubject<number> = new BehaviorSubject(this.nbPatient);
    public nbQuiz$: BehaviorSubject<number> = new BehaviorSubject(this.nbQuiz);
    public quizDone$: BehaviorSubject<number> = new BehaviorSubject(this.quizDone);
    public quizDonePerPerson$: BehaviorSubject<number[]> = new BehaviorSubject(this.quizDonePerPerson);

    addQuizDone() {
      this.quizDone++;
      this.quizDone$.next(this.quizDone);
    }

    nbQuizDone() {
      let res = 0;
      for (let i=0; i<LISTE_PATIENT.length; i++) {
        if(LISTE_PATIENT[i].selfStats != undefined){
          res += LISTE_PATIENT[i].selfStats.nbQuizDone;
        }
        
      }
      return res;
    }

    nbQuizDonePerPerson() {
      let res = [];
      for (let i=0; i<LISTE_PATIENT.length; i++) {
        res.push(LISTE_PATIENT[i].selfStats.nbQuizDone);
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

    public options$: BehaviorSubject<string[]> = new BehaviorSubject(this.options);
    public playedQuiz$: BehaviorSubject<number> = new BehaviorSubject(this.playedQuiz);
    public patientMeanScore$: BehaviorSubject<number> = new BehaviorSubject(this.patientMeanScore);
    public fiveLastQuizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.fiveLastQuizzes);

    /*
     * Pour les statistiques par theme
     */

    private theme: string = "";
    private score: number = 0;
    private attempt: number = 0;
    //private usedHint: number = 0;

    public theme$: BehaviorSubject<string> = new BehaviorSubject(this.theme);
    public score$: BehaviorSubject<number> = new BehaviorSubject(this.score);
    public attempt$: BehaviorSubject<number> = new BehaviorSubject(this.attempt);
    //public usedHint$: BehaviorSubject<number> = new BehaviorSubject(this.usedHint);

    /*
     * Pour les statistiques par quiz
     */

    private actualQuiz: Quiz = QUIZ_LIST[0];
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