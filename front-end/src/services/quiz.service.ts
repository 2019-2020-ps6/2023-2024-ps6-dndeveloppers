import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { Answer, Indice, Question } from 'src/models/question.models';
import { StatsService } from './stats.service';
import { Profil } from 'src/models/profil.model';
import { LISTE_PROFILS } from 'src/mocks/profil-list.mock';
import { QUESTION_ACTOR0 } from 'src/mocks/quizQuestion/question-acteur.mock';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private actualProfil: Profil = LISTE_PROFILS[0];
  private quizzes: Quiz[] = QUIZ_LIST;
  private choosenQuiz: Quiz = this.quizzes[0];
  private actualQuestion: Question = QUESTION_ACTOR0;
  private actualResponses: Answer[] = QUESTION_ACTOR0.answers;
  private displayResponses: boolean[] = [true, true, true, true];
  private hintAskedForQuestion: number = 0;
  private actualQuestionNumber: number = 0;
  private actualIndices: Indice[] = [];
  private actualScore: number = 0;
  private usedIndice: number[] = [];
  private usedHint: number = 0;
  private endOfQuiz: boolean = false;

  private nbBonneReponses: number = 0;
  private nbIndiceUtilise: number = 0;
  private streakDeBonneReponse: number = 0;
  private enStreak: number = 0;
  private scoreWithOptionSup: number = 0;

  private bonScore: boolean = false;
  private bonneStreak: boolean = false;
  private peuDindice: boolean = false;

  private goodAnswer: number = 0;

  private themeList: String[] = []; // liste des thèmes de quiz
  private editedQuiz: Quiz = this.quizzes[0]; // quiz en cours d'édition

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public actualProfil$: BehaviorSubject<Profil> = new BehaviorSubject(this.actualProfil);
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);
  public choosenQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject(QUIZ_LIST[0]);
  public actualQuestion$: BehaviorSubject<Question> = new BehaviorSubject(QUESTION_ACTOR0);
  public actualScore$: BehaviorSubject<number> = new BehaviorSubject(this.actualScore);
  public actualResponses$: BehaviorSubject<Answer[]> = new BehaviorSubject(QUESTION_ACTOR0.answers);
  public displayResponses$: BehaviorSubject<boolean[]> = new BehaviorSubject(this.displayResponses);
  public actualQuestionNumber$: BehaviorSubject<number> = new BehaviorSubject(0);
  public actualIndices$: BehaviorSubject<Indice[]> = new BehaviorSubject(this.actualIndices);
  public usedIndice$: BehaviorSubject<number[]> = new BehaviorSubject(this.usedIndice);
  public endOfQuiz$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public themeList$: BehaviorSubject<String[]> = new BehaviorSubject(this.themeList);
  public editedQuiz$ : BehaviorSubject<Quiz> = new BehaviorSubject(this.editedQuiz);

  public nbBonneReponses$: BehaviorSubject<number> = new BehaviorSubject(0);
  public nbIndiceUtilise$: BehaviorSubject<number> = new BehaviorSubject(0);
  public streakDeBonneReponse$: BehaviorSubject<number> = new BehaviorSubject(0);

  public bonScore$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public bonneStreak$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public peuDindice$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public indice$: BehaviorSubject<string[]> = new BehaviorSubject([""]);

  public goodAnswer$: BehaviorSubject<number> = new BehaviorSubject(0);


  public url: string = "";

  constructor(public statsService: StatsService) {
    this.fillThemeList();
  }

  fillThemeList() {
    let res: String[] = [];
    for (let i=0; i<this.quizzes.length; i++) {
      let toAdd = true;
      for (let j=0; j<res.length; j++) {
        if (this.quizzes[i].theme == res[j]) {
          toAdd = false;
          break;
        }
      }
      if (toAdd) {
        res.push(this.quizzes[i].theme);
      }
    }
    this.themeList = res;
    this.themeList$.next(this.themeList);
  }

  triQuizParTheme() {
    let sortedQuizList: Quiz[] = [];
    for (let i=0; i<this.themeList.length; i++) {
      for (let j=0; j<this.quizzes.length; j++) {
        if (this.quizzes[j].theme == this.themeList[i]) {
          sortedQuizList.push(this.quizzes[j]);
        }
      }
    }
    this.quizzes = sortedQuizList;
  }

  selectProfil(profil: Profil) {
    this.actualProfil = profil;
    this.actualProfil$.next(this.actualProfil);
  }

  dontShowTutoriel() {
    this.actualProfil.tutoriel = false;
  }

  addQuiz(quiz: Quiz) {
    this.statsService.addQuiz(quiz);
    this.quizzes.push(quiz);
    this.triQuizParTheme();
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
        this.actualResponses = this.quizzes[i].questions[0].answers;
        this.actualResponses$.next(this.actualResponses);
        console.log("Quiz choisit : ",this.choosenQuiz);
      }
    }
    if (quizEnCours.questions === undefined) {
      console.log("Ce quiz n'a pas de quesiton!");
    } else {
      this.hintAskedForQuestion = 0;
      console.log("Quiz valide");

      this.scoreWithOptionSup = 1;
      this.actualScore = 0;
      this.usedHint = 0;
      this.endOfQuiz = false;
      this.endOfQuiz$.next(this.endOfQuiz);

      this.actualIndices = this.choosenQuiz.questions[0].indice;
      this.actualIndices$.next(this.actualIndices);
      
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
    if (this.hintAskedForQuestion < this.actualIndices.length+3) {
      this.usedHint++;
      this.nbIndiceUtilise++;
      this.nbIndiceUtilise$.next(this.nbIndiceUtilise);
      if (this.usedIndice.length < this.actualIndices.length) {
        this.usedIndice.push(this.usedIndice.length);
      } else {
        this.hideResponse();
      }
    }
    this.hintAskedForQuestion++;
  }

  hideResponse() {
    let nbOfTrue = 0;
    for (let i=0; i<this.displayResponses.length; i++) {
      if (this.displayResponses[i]) {
        nbOfTrue++;
      }
    }
    if (nbOfTrue > 2) {
      let rightResponse = 0;
      for (let i=0; i<this.actualQuestion.answers.length; i++) {
        if (this.actualQuestion.answers[i].isCorrect) {
          rightResponse = i;
          break;
        }
      }
      let randomNumber = Math.trunc(Math.random()*(4-0) + 0);
      while (randomNumber == rightResponse || this.displayResponses[randomNumber] == false) {
        randomNumber = Math.trunc(Math.random()*(4-0) + 0);
      }
      this.displayResponses[randomNumber] = false;
      this.displayResponses$.next(this.displayResponses);
    }
  }

  isGoodAnswer(quiz: Quiz, responseNumber: number){

    if(this.actualResponses[0].isCorrect == true) {
      this.goodAnswer = 1;
    }
    if(this.actualResponses[1].isCorrect == true) {
      this.goodAnswer = 2;
    }
    if(this.actualResponses[2].isCorrect == true) {
      this.goodAnswer = 3;
    }
    else{
      if(this.actualResponses[3].isCorrect == true){
        this.goodAnswer = 4;
      }
    }
    this.goodAnswer$.next(this.goodAnswer);
  }

  responseSelectedWithOptionSupprimerMauvaiseReponse(quiz: Quiz, responseNumber: number) {
    if (this.actualResponses[responseNumber].isCorrect) {
      console.log("Bonne réponse félicitation!");
      this.statsService.successRateNewData(100, this.actualQuestionNumber);
      this.actualScore += this.scoreWithOptionSup;
      if (this.scoreWithOptionSup > 0.5) {
        this.nbBonneReponses++;
        this.nbBonneReponses$.next(this.nbBonneReponses);
      }  
      this.enStreak++;
      this.hintAskedForQuestion = 0;
      this.usedIndice = [];
      this.usedIndice$.next(this.usedIndice);
      this.scoreWithOptionSup = 1;

      this.displayResponses = [true, true, true, true];
      this.displayResponses$.next(this.displayResponses);

      if (this.actualQuestionNumber == quiz.questions.length-1) {
        console.log("C'était la dernière question");
        console.log("score: ",this.actualScore);
        this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
        this.statsService.addQuizDone();
        this.statsService.meanScoreNewData(this.actualScore/quiz.questions.length);
        this.statsService.usedHintNewData(this.usedHint);
                                          
        if (this.streakDeBonneReponse < this.enStreak) {
          this.streakDeBonneReponse = this.enStreak;
          this.streakDeBonneReponse$.next(this.streakDeBonneReponse);
        }

        if (this.nbBonneReponses >= this.actualQuestionNumber) {
          this.bonScore = true;
          this.bonScore$.next(this.bonScore);
        }

        if (this.streakDeBonneReponse >= 2) {
          this.bonneStreak = true;
          this.bonneStreak$.next(this.bonneStreak);
        }

        if (this.nbIndiceUtilise <= this.actualQuestionNumber+1) {
          this.peuDindice = true;
          this.peuDindice$.next(this.peuDindice);
        }

        this.statsService.patientScoreNewData(this.actualProfil, this.actualScore/quiz.questions.length);

        this.endOfQuiz = true;
        this.endOfQuiz$.next(this.endOfQuiz);

      } else {
        this.actualQuestionNumber++;
        this.actualQuestionNumber$.next(this.actualQuestionNumber);
        this.actualIndices = this.choosenQuiz.questions[this.actualQuestionNumber].indice;
        this.actualIndices$.next(this.actualIndices);

        this.actualQuestion = this.choosenQuiz.questions[this.actualQuestionNumber];
        this.actualQuestion$.next(this.actualQuestion);

        this.actualResponses = this.actualQuestion.answers;
        this.actualResponses$.next(this.actualResponses);
      }
    } else {
      if (this.streakDeBonneReponse < this.enStreak) {
        this.streakDeBonneReponse = this.enStreak;
        this.streakDeBonneReponse$.next(this.streakDeBonneReponse);
      }
      this.enStreak = 0;
      this.statsService.successRateNewData(0, this.actualQuestionNumber);
      this.displayResponses[responseNumber] = false;
      this.scoreWithOptionSup -= 0.25;
    }
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
    this.hintAskedForQuestion = 0;
    this.usedIndice = [];
    this.usedIndice$.next(this.usedIndice);

    this.displayResponses = [true, true, true, true];
    this.displayResponses$.next(this.displayResponses);

    if (this.actualQuestionNumber == quiz.questions.length-1) {
      console.log("C'était la dernière question");
      console.log("score: ",this.actualScore);
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
      this.actualQuestionNumber++;
      this.actualQuestionNumber$.next(this.actualQuestionNumber);
      this.actualIndices = this.choosenQuiz.questions[this.actualQuestionNumber].indice;
      this.actualIndices$.next(this.actualIndices);

      this.actualQuestion = this.choosenQuiz.questions[this.actualQuestionNumber];
      this.actualQuestion$.next(this.actualQuestion);

      this.actualResponses = this.actualQuestion.answers;
      this.actualResponses$.next(this.actualResponses);
    }
  }

  reset() {
    this.hintAskedForQuestion = 0;
    this.displayResponses = [true, true, true, true];
    this.usedIndice = [];
    this.displayResponses$.next(this.displayResponses);
    this.usedIndice$.next(this.usedIndice);
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
    if(valeurs.length == 3 ){
      this.editedQuiz.photo = valeurs[2];
    }
    this.editedQuiz$.next(this.editedQuiz);
    console.log("Quiz édité");
  }

  updateQuiz(){
    let quiz : Quiz = this.editedQuiz;
    this.deleteQuiz(quiz);
    this.addQuiz(quiz);
  }
}