import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUESTION_ACTOR0, QUIZ_LIST } from '../mocks/quiz-list.mock';
import { Answer, Question } from 'src/models/question.models';
import { StatsService } from './stats.service';
import { Profil } from 'src/models/profil.model';
import { LISTE_PROFILS } from 'src/mocks/profil-list.mock';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private actualProfil: Profil = LISTE_PROFILS[0];
  private quizzes: Quiz[] = QUIZ_LIST;
  private choosenQuiz: Quiz = this.quizzes[0];
  private actualQuestion: Question = QUESTION_ACTOR0;
  private actualResponses: Answer[] = QUESTION_ACTOR0.answers;
  private actualQuestionNumber: number = 0;
  private actualScore: number = 0;
  private usedHint: number = 0;
  private endOfQuiz: boolean = false;

  private themeList: String[] = []; // liste des thèmes de quiz

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);
  public choosenQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject(QUIZ_LIST[0]);
  public actualQuestion$: BehaviorSubject<Question> = new BehaviorSubject(QUESTION_ACTOR0);
  public actualResponses$: BehaviorSubject<Answer[]> = new BehaviorSubject(QUESTION_ACTOR0.answers);
  public actualQuestionNumber$: BehaviorSubject<number> = new BehaviorSubject(0);
  public endOfQuiz$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public themeList$: BehaviorSubject<String[]> = new BehaviorSubject(this.themeList);

  public url: string = "";

  constructor(public statsService: StatsService) {}

  selectProfil(profil: Profil) {
    this.actualProfil = profil;
  }

  addQuiz(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz: Quiz) {
    let newQuizzes: Quiz[] = [];
    for(let i=0;i<this.quizzes.length;i++){
      if(this.quizzes[i].name!=quiz.name){
        newQuizzes.push(this.quizzes[i]);        
      }
    }
    this.quizzes = newQuizzes;
    this.quizzes$.next(this.quizzes);
  }

  selectQuiz(quiz: Quiz) {
    this.statsService.selectQuiz(quiz);

    let quizEnCours: Quiz = this.quizzes[0];
    for(let i=0;i<this.quizzes.length;i++){
      if(this.quizzes[i]==quiz){
        quizEnCours = this.quizzes[i];
        this.choosenQuiz = this.quizzes[i];
        this.choosenQuiz$.next(this.choosenQuiz);
        console.log("Quiz choisit : ",this.choosenQuiz);
      }
    }
    if (quizEnCours.questions === undefined) {
      console.log("Ce quiz n'a pas de quesiton!");
    } else {
      console.log("ok");
      this.actualScore = 0;
      this.usedHint = 0;
      this.endOfQuiz = false;
      this.endOfQuiz$.next(this.endOfQuiz);
      
      this.actualQuestionNumber = 0;
      this.actualQuestionNumber$.next(this.actualQuestionNumber);
      this.displayQuestion(quizEnCours, this.actualQuestionNumber);
    }
  }

  displayQuestion(quiz: Quiz, numQuestion: number) {
    console.log(quiz.questions[numQuestion]);
    this.actualQuestion = quiz.questions[numQuestion];
    this.actualQuestion$.next(this.actualQuestion);
  }

  hintAsked() {
    this.usedHint++;
  }

  responseSelected(quiz: Quiz, responseNumber: number) {
    console.log("Response selected (service POV) : ",responseNumber);
    if (this.actualResponses[responseNumber].isCorrect) {
      console.log("Bonne réponse félicitation!");
      this.actualScore++;
    } else {
      console.log("Mauvaise Réponse!");
    }

    if (this.actualQuestionNumber == quiz.questions.length-1) {
      console.log("C'était la dernière question");
      this.statsService.addQuizDone();
      this.statsService.meanScoreNewData(this.actualScore);
      this.statsService.usedHintNewData(this.usedHint);
      this.statsService.patientNewData(this.actualProfil, this.actualScore);
      this.endOfQuiz = true;
      this.endOfQuiz$.next(this.endOfQuiz);
    } else {
      this.actualQuestion = this.choosenQuiz.questions[this.actualQuestionNumber];
      this.actualQuestion$.next(this.actualQuestion);
      this.actualQuestionNumber++;
      this.actualQuestionNumber$.next(this.actualQuestionNumber);
    }
  }

  getQuizzes(quiz: Quiz){
    for(let i=0;i<this.quizzes.length;i++){
      if(this.quizzes[i].name==quiz.name){
        console.log("Quiz sélectionné : ",this.quizzes[i].name);
      }
    }
  }

  setUpTheme(){ // mettre à jour la liste des thèmes
    let newThemeList: String[] = [];
    for(let i=0;i<this.quizzes.length;i++){
      if(newThemeList.lastIndexOf(this.quizzes[i].theme) == -1){
          newThemeList.push(this.quizzes[i].theme);
      }
    }
    this.themeList = newThemeList;
    this.themeList$.next(this.themeList);
    console.log("Liste des thèmes actuellement présents : ",this.themeList);
  }

  addTheme(theme: String){
    let a = "aaa";
    console.log(theme);
    console.log(a);
    this.themeList.push(theme);
    this.themeList$.next(this.themeList);
    console.log("Le thème : ",theme," a été rajouté (temporairement)")
  }
}