import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Quiz } from 'src/models/quiz.model';

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    /*
     * Pour les statistiques globales
     */

    private patientNumber: number = 0;
    private quizNumber: number = 0;
    private quizDone: number = 0;
    private quizDonePerPerson: number[] = [];

    public patientNumber$: BehaviorSubject<number> = new BehaviorSubject(this.patientNumber);
    public quizNumber$: BehaviorSubject<number> = new BehaviorSubject(this.quizNumber);
    public quizDone$: BehaviorSubject<number> = new BehaviorSubject(this.quizDone);
    public meanQuizPerPerson$: BehaviorSubject<number> = new BehaviorSubject(this.meanQuizDonePerPerson(this.quizDonePerPerson));

    meanQuizDonePerPerson(quizDonePerPerson: number[]) {
        let num = 0;
        for (let i=0; i<quizDonePerPerson.length; i++) {
            num += quizDonePerPerson[i];
        }
        return num/quizDonePerPerson.length;
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

    nbTypeQuestion(quiz: Quiz, type: string) {
      let res = 0;
      if (type == "Texte") {
        for (let i=0; i<10; i++) {
          if (quiz.questions[i].questionTexte) {
            res++;
          }
        }
      } else if (type == "Image") {
        for (let i=0; i<10; i++) {
          if (quiz.questions[i].questionImage) {
            res++;
          }
        }
      }
      return res;
    }

    selectedQuiz(quiz: Quiz) {
      this.actualQuiz = quiz;
      this.actualQuizId = this.actualQuiz.id;
      this.actualScore = 0;
      this.maxScore = this.actualQuiz.questions.length;
      this.usedHint = 0;
      this.nbQuestionsTexte = this.nbTypeQuestion(this.actualQuiz, "Texte");
      this.nbQuestionsImage = this.nbTypeQuestion(this.actualQuiz, "Image");
    }

}