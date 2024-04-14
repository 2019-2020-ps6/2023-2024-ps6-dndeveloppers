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

  private nbBonneReponses: number = 0;
  private nbIndiceUtilise: number = 0;
  private streakDeBonneReponse: number = 0;
  private enStreak: number = 0;

  private bonScore: boolean = false;
  private bonneStreak: boolean = false;
  private peuDindice: boolean = false;

  private themeList: String[] = []; // liste des thèmes de quiz
  private editedQuiz: Quiz = this.quizzes[0]; // quiz en cours d'édition

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
  public editedQuiz$ : BehaviorSubject<Quiz> = new BehaviorSubject(this.editedQuiz);

  public nbBonneReponses$: BehaviorSubject<number> = new BehaviorSubject(0);
  public nbIndiceUtilise$: BehaviorSubject<number> = new BehaviorSubject(0);
  public streakDeBonneReponse$: BehaviorSubject<number> = new BehaviorSubject(0);

  public bonScore$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public bonneStreak$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public peuDindice$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public url: string = "";

  constructor(public statsService: StatsService) {}

  selectProfil(profil: Profil) {
    this.actualProfil = profil;
  }

  addQuiz(quiz: Quiz) {
    this.statsService.addQuiz(quiz);
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
    this.setUpTheme();
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

      this.nbBonneReponses = 0;
      this.nbBonneReponses$.next(this.nbBonneReponses);
      this.nbIndiceUtilise = 0;
      this.nbIndiceUtilise$.next(this.nbIndiceUtilise);
      this.streakDeBonneReponse = 0;
      this.streakDeBonneReponse$.next(this.streakDeBonneReponse);
      this.enStreak = 0;

      this.bonScore = false;
      this.bonScore$.next(this.bonScore);
      this.bonneStreak = false;
      this.bonneStreak$.next(this.bonneStreak);
      this.peuDindice = false;
      this.peuDindice$.next(this.peuDindice);

    }
  }

  displayQuestion(quiz: Quiz, numQuestion: number) {
    console.log(quiz.questions[numQuestion]);
    this.actualQuestion = quiz.questions[numQuestion];
    this.actualQuestion$.next(this.actualQuestion);
  }

  hintAsked() {
    this.usedHint++;
    this.nbIndiceUtilise++;
    this.nbIndiceUtilise$.next(this.nbIndiceUtilise);
  }

  responseSelected(quiz: Quiz, responseNumber: number) {
    console.log("Response selected (service POV) : ",responseNumber);
    if (this.actualResponses[responseNumber].isCorrect) {
      console.log("Bonne réponse félicitation!");
      this.statsService.successRateNewData(100, this.actualQuestionNumber);
      this.actualScore++;
      this.nbBonneReponses++;
      this.nbBonneReponses$.next(this.nbBonneReponses);
      this.enStreak++;
    } else {
      console.log("Mauvaise Réponse!");

      if(this.streakDeBonneReponse < this.enStreak){
        this.streakDeBonneReponse = this.enStreak;
        this.streakDeBonneReponse$.next(this.streakDeBonneReponse);
      }
      this.enStreak = 0;

      this.statsService.successRateNewData(0, this.actualQuestionNumber);
    }

    if (this.actualQuestionNumber == quiz.questions.length-1) {
      console.log("C'était la dernière question");
      this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
      this.statsService.addQuizDone();
      this.statsService.meanScoreNewData(this.actualScore/quiz.questions.length);
      this.statsService.usedHintNewData(this.usedHint);
                                        
      if(this.streakDeBonneReponse < this.enStreak){
        this.streakDeBonneReponse = this.enStreak;
        this.streakDeBonneReponse$.next(this.streakDeBonneReponse);
      }

      if(this.nbBonneReponses >= this.actualQuestionNumber){
        this.bonScore = true;
        this.bonScore$.next(this.bonScore);
      }

      if(this.streakDeBonneReponse >= 2){
        this.bonneStreak = true;
        this.bonneStreak$.next(this.bonneStreak);
      }

      if(this.nbIndiceUtilise <= this.actualQuestionNumber+1){
        this.peuDindice = true;
        this.peuDindice$.next(this.peuDindice);
      }


      this.statsService.patientScoreNewData(this.actualProfil, this.actualScore/quiz.questions.length);

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

  // ------------------------------------------------------------ thèmes ---------------------------------------------------------------------------------

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

  // ------------------------------------------------------------ édition quiz/questions ------------------------------------------------------------------------------

  editingQuiz(quiz: Quiz){
    this.editedQuiz = quiz;
    this.editedQuiz$.next(this.editedQuiz);
    console.log("edition : ",quiz);
  }

  addQuestion(question: Question){
    this.editedQuiz.questions.push(question);

    this.editedQuiz.nbQuestionsPerType
    console.log("Question ", question, " ajoutée.");
    console.log(this.editedQuiz);
  }

  deleteQuestion(question: Question){
    let questions: Question[] = [];
    for(let i=0;i<this.editedQuiz.questions.length;i++){
      if(this.editedQuiz.questions[i] != question){
        questions.push(this.editedQuiz.questions[i]);
      }
    }
    this.editedQuiz.questions = questions;
    this.editedQuiz$.next(this.editedQuiz);
    console.log("Question supprimée");
  }

  editQuestion(question: Question){
    for(let i=0;i<this.editedQuiz.questions.length;i++){
      if(this.editedQuiz.questions[i].label == question.label){
        this.editedQuiz.questions[i] = question;
        console.log("Question éditée");
        return;
      }
    }
  }

  editGlobalQuiz(valeurs: string[]){
    this.editedQuiz.name = valeurs[0];
    this.editedQuiz.theme = valeurs[1];
    this.editedQuiz$.next(this.editedQuiz);
    console.log("Quiz édité");
  }

  updateQuiz(){
    let quiz : Quiz = this.editedQuiz;
    this.deleteQuiz(quiz);
    this.addQuiz(quiz);
  }
}