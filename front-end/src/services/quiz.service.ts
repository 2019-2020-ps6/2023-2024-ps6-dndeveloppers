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
  private actualIndices: Indice[] = [];
  private usedIndice: number[] = [];
  private usedHint: number = 0;
  private hintAskedForQuestion: number = 0;
  private endOfQuiz: boolean = false;

  private scoreWithOptionSup: number = 0;

  private themeList: String[] = []; // liste des thèmes de quiz
  private editedQuiz: Quiz = this.quizzes[0]; // quiz en cours d'édition

  private askQuestionsAgain: boolean = false;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public actualProfil$: BehaviorSubject<Profil> = new BehaviorSubject(this.actualProfil);
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);
  public choosenQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject(QUIZ_LIST[0]);
  public actualQuestion$: BehaviorSubject<Question> = new BehaviorSubject(QUESTION_ACTOR0);
  public actualResponses$: BehaviorSubject<Answer[]> = new BehaviorSubject(QUESTION_ACTOR0.answers);
  public displayResponses$: BehaviorSubject<boolean[]> = new BehaviorSubject(this.displayResponses);
  public actualIndices$: BehaviorSubject<Indice[]> = new BehaviorSubject(this.actualIndices);
  public usedIndice$: BehaviorSubject<number[]> = new BehaviorSubject(this.usedIndice);
  public usedHint$: BehaviorSubject<number> = new BehaviorSubject(this.usedHint);
  public endOfQuiz$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public themeList$: BehaviorSubject<String[]> = new BehaviorSubject(this.themeList);
  public editedQuiz$ : BehaviorSubject<Quiz> = new BehaviorSubject(this.editedQuiz);

  public url: string = "";

  constructor(public statsService: StatsService) {
    this.setUpTheme();
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
    this.setUpQuiz();
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
      this.actualQuestion.nbIndiceUtiliseQuestion = 0;
      console.log("Quiz valide");

      this.scoreWithOptionSup = 1;
      this.choosenQuiz.actualScore = 0;
      this.usedHint = 0;
      this.endOfQuiz = false;
      this.endOfQuiz$.next(this.endOfQuiz);

      this.actualIndices = this.choosenQuiz.questions[0].indice;
      this.actualIndices$.next(this.actualIndices);
      
      this.choosenQuiz.actualQuestionNumber = 0;
      this.choosenQuiz$.next(this.choosenQuiz);
      this.displayQuestion(quizEnCours, this.choosenQuiz.actualQuestionNumber);

      this.choosenQuiz.nbBonnesReponses = 0;
      this.choosenQuiz.nbIndiceUtilises = 0;
      this.choosenQuiz.MeilleurStreak = 0;
      this.choosenQuiz.streakActuel = 0;
      this.choosenQuiz$.next(this.choosenQuiz);
      
    }
  }

  displayQuestion(quiz: Quiz, numQuestion: number) {
    console.log(quiz.questions[numQuestion]);
    this.actualQuestion = quiz.questions[numQuestion];
    this.actualQuestion$.next(this.actualQuestion);
  }

  hintAsked() {
    this.hintAskedForQuestion++;
    if (this.hintAskedForQuestion < this.actualIndices.length+3) {
      this.usedHint++;
      this.usedHint$.next(this.usedHint);
      let indiceQuestion = 0;
      for (let i=0; i<this.actualQuestion.indice.length; i++) {
        if (this.actualQuestion.indice[i].value != "") {
          indiceQuestion++;
        }
      }
      this.scoreWithOptionSup = 1 - (this.hintAskedForQuestion/(indiceQuestion + 3));
      if ((this.usedIndice.length < this.actualIndices.length) && (this.actualQuestion.indice[this.usedIndice.length].value != '')) {
        this.usedIndice.push(this.usedIndice.length);
      } else {
        this.hideResponse();
      }
    }
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

  responseSelectedWithOptionSupprimerMauvaiseReponse(quiz: Quiz, responseNumber: number) {
    if (this.actualResponses[responseNumber].isCorrect) {
      console.log("Bonne réponse félicitation!");
      this.statsService.successRateNewData(100, this.choosenQuiz.actualQuestionNumber);
      this.choosenQuiz.actualScore += this.scoreWithOptionSup;
      if (this.scoreWithOptionSup > 0.5) {
        this.choosenQuiz.nbBonnesReponses++;
        this.choosenQuiz$.next(this.choosenQuiz);
      }  
      this.choosenQuiz.streakActuel++;
      this.actualQuestion.nbIndiceUtiliseQuestion = 0;
      this.usedIndice = [];
      this.usedIndice$.next(this.usedIndice);
      this.scoreWithOptionSup = 1;

      this.displayResponses = [true, true, true, true];
      this.displayResponses$.next(this.displayResponses);

      if (this.choosenQuiz.actualQuestionNumber == quiz.questions.length-1) {
        console.log("C'était la dernière question");
        console.log("score: ",this.choosenQuiz.actualScore);
        this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
        this.statsService.addQuizDone();
        this.statsService.meanScoreNewData(this.choosenQuiz.actualScore/quiz.questions.length);
        this.statsService.usedHintNewData(this.usedHint);
                                          
        if (this.choosenQuiz.MeilleurStreak < this.choosenQuiz.streakActuel) {
          this.choosenQuiz.MeilleurStreak = this.choosenQuiz.streakActuel;
          this.choosenQuiz$.next(this.choosenQuiz);
        }

        if (this.choosenQuiz.nbBonnesReponses >= this.choosenQuiz.actualQuestionNumber) {
          this.choosenQuiz$.next(this.choosenQuiz);
        }

        if (this.choosenQuiz.MeilleurStreak >= 2) {
          this.choosenQuiz$.next(this.choosenQuiz);
        }

        if (this.choosenQuiz.nbIndiceUtilises <= this.choosenQuiz.actualQuestionNumber+1) {
          this.choosenQuiz$.next(this.choosenQuiz);

        }

        this.statsService.patientScoreNewData(this.actualProfil, this.choosenQuiz.actualScore/quiz.questions.length);

        this.endOfQuiz = true;
        this.endOfQuiz$.next(this.endOfQuiz);

      } else {
        this.choosenQuiz.actualQuestionNumber++;
        this.choosenQuiz$.next(this.choosenQuiz);
        this.actualIndices = this.choosenQuiz.questions[this.choosenQuiz.actualQuestionNumber].indice;
        this.actualIndices$.next(this.actualIndices);

        this.hintAskedForQuestion = 0;

        this.actualQuestion = this.choosenQuiz.questions[this.choosenQuiz.actualQuestionNumber];
        this.actualQuestion$.next(this.actualQuestion);

        this.actualResponses = this.actualQuestion.answers;
        this.actualResponses$.next(this.actualResponses);
      }
    } else {
      if (this.choosenQuiz.MeilleurStreak < this.choosenQuiz.streakActuel) {
        this.choosenQuiz.MeilleurStreak = this.choosenQuiz.streakActuel;
        this.choosenQuiz$.next(this.choosenQuiz);
      }
      this.choosenQuiz.streakActuel = 0;
      this.statsService.successRateNewData(0, this.choosenQuiz.actualQuestionNumber);
      this.displayResponses[responseNumber] = false;
      this.scoreWithOptionSup -= 0.25;
    }
  }

  responseSelectedWithAskAgainOption(quiz: Quiz, responseNumber: number){
    console.log("lancement ok");
    if (this.actualResponses[responseNumber].isCorrect) {
      console.log("Bonne réponse félicitation!");
      this.actualQuestion.dejaPosee = false;
      this.statsService.successRateNewData(100, this.choosenQuiz.actualQuestionNumber);
      this.choosenQuiz.actualScore++;
      this.choosenQuiz.nbBonnesReponses++;
      this.choosenQuiz.streakActuel++;

    } else {
      console.log("Mauvaise Réponse!");
      this.actualQuestion.dejaPosee = true;

      if(this.choosenQuiz.MeilleurStreak < this.choosenQuiz.streakActuel){
        this.choosenQuiz.MeilleurStreak = this.choosenQuiz.streakActuel;
      }
      this.choosenQuiz.streakActuel = 0;

      this.statsService.successRateNewData(0, this.choosenQuiz.actualQuestionNumber);
    }
    this.hintAskedForQuestion = 0;
    this.usedIndice = [];
    this.usedIndice$.next(this.usedIndice);

    this.displayResponses = [true, true, true, true];
    this.displayResponses$.next(this.displayResponses);

    if (this.choosenQuiz.actualQuestionNumber == quiz.questions.length-1 || this.askQuestionsAgain) {
      console.log("repose")
      this.askQuestionsAgain = true;
      quiz.questions[this.choosenQuiz.actualQuestionNumber].dejaPosee = false;
      let toAskAgain = -1;
      for(let i=0;i<quiz.questions.length;i++){
        if(quiz.questions[i].dejaPosee){
          toAskAgain = i;
        }
      }
      if (toAskAgain == -1) {
        console.log("C'était la dernière question");
        console.log("score: ",this.choosenQuiz.actualScore);
        this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
        this.statsService.addQuizDone();
        this.statsService.meanScoreNewData(this.choosenQuiz.actualScore/quiz.questions.length);
        this.statsService.usedHintNewData(this.usedHint);
                                        
        if(this.choosenQuiz.MeilleurStreak < this.choosenQuiz.streakActuel){
          this.choosenQuiz.MeilleurStreak = this.choosenQuiz.streakActuel;
        }

        this.statsService.patientScoreNewData(this.actualProfil, this.choosenQuiz.actualScore/quiz.questions.length);

        this.askQuestionsAgain = false;
        this.endOfQuiz = true;
        this.endOfQuiz$.next(this.endOfQuiz);
      }
      else{
        this.choosenQuiz.nbBonnesReponses--;
        this.choosenQuiz.actualQuestionNumber = toAskAgain;
        this.actualIndices = this.choosenQuiz.questions[this.choosenQuiz.actualQuestionNumber].indice;
        this.actualIndices$.next(this.actualIndices);

        this.actualQuestion = this.choosenQuiz.questions[this.choosenQuiz.actualQuestionNumber];
        this.actualQuestion$.next(this.actualQuestion);

        this.actualResponses = this.actualQuestion.answers;
        this.actualResponses$.next(this.actualResponses);
      }
    }
    else {
      this.choosenQuiz.actualQuestionNumber++;
      this.actualIndices = this.choosenQuiz.questions[this.choosenQuiz.actualQuestionNumber].indice;
      this.actualIndices$.next(this.actualIndices);

      this.actualQuestion = this.choosenQuiz.questions[this.choosenQuiz.actualQuestionNumber];
      this.actualQuestion$.next(this.actualQuestion);

      this.actualResponses = this.actualQuestion.answers;
      this.actualResponses$.next(this.actualResponses);
    }

    this.choosenQuiz$.next(this.choosenQuiz);
  }

  responseSelected(quiz: Quiz, responseNumber: number) {
    console.log("Response selected (service POV) : ",responseNumber);
    if (this.actualResponses[responseNumber].isCorrect) {
      console.log("Bonne réponse félicitation!");
      this.statsService.successRateNewData(100, this.choosenQuiz.actualQuestionNumber);
      this.choosenQuiz.actualScore++;
      this.choosenQuiz.nbBonnesReponses++;
      this.choosenQuiz$.next(this.choosenQuiz);
      this.choosenQuiz.streakActuel++;
    } else {
      console.log("Mauvaise Réponse!");

      if(this.choosenQuiz.MeilleurStreak < this.choosenQuiz.streakActuel){
        this.choosenQuiz.MeilleurStreak = this.choosenQuiz.streakActuel;
        this.choosenQuiz$.next(this.choosenQuiz);
      }
      this.choosenQuiz.streakActuel = 0;

      this.statsService.successRateNewData(0, this.choosenQuiz.actualQuestionNumber);
    }
    this.actualQuestion.nbIndiceUtiliseQuestion = 0;
    this.usedIndice = [];
    this.usedIndice$.next(this.usedIndice);

    this.displayResponses = [true, true, true, true];
    this.displayResponses$.next(this.displayResponses);

    if (this.choosenQuiz.actualQuestionNumber == quiz.questions.length-1) {
      console.log("C'était la dernière question");
      console.log("score: ",this.choosenQuiz.actualScore);
      this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
      this.statsService.addQuizDone();
      this.statsService.meanScoreNewData(this.choosenQuiz.actualScore/quiz.questions.length);
      this.statsService.usedHintNewData(this.usedHint);
                                        
      if(this.choosenQuiz.MeilleurStreak < this.choosenQuiz.streakActuel){
        this.choosenQuiz.MeilleurStreak = this.choosenQuiz.streakActuel;
        this.choosenQuiz$.next(this.choosenQuiz);
      }

      if(this.choosenQuiz.nbBonnesReponses >= this.choosenQuiz.actualQuestionNumber){
        this.choosenQuiz$.next(this.choosenQuiz);

      }

      if(this.choosenQuiz.MeilleurStreak >= 2){
        this.choosenQuiz$.next(this.choosenQuiz);

      }

      if(this.choosenQuiz.nbIndiceUtilises <= this.choosenQuiz.actualQuestionNumber+1){
        this.choosenQuiz$.next(this.choosenQuiz);

      }


      this.statsService.patientScoreNewData(this.actualProfil, this.choosenQuiz.actualScore/quiz.questions.length);

      this.endOfQuiz = true;
      this.endOfQuiz$.next(this.endOfQuiz);

    } else {
      this.choosenQuiz.actualQuestionNumber++;
      this.choosenQuiz$.next(this.choosenQuiz);
      this.actualIndices = this.choosenQuiz.questions[this.choosenQuiz.actualQuestionNumber].indice;
      this.actualIndices$.next(this.actualIndices);

      this.hintAskedForQuestion = 0;

      this.actualQuestion = this.choosenQuiz.questions[this.choosenQuiz.actualQuestionNumber];
      this.actualQuestion$.next(this.actualQuestion);

      this.actualResponses = this.actualQuestion.answers;
      this.actualResponses$.next(this.actualResponses);
    }
  }

  reset() {
    this.actualQuestion.nbIndiceUtiliseQuestion = 0;
    this.displayResponses = [true, true, true, true];
    this.usedIndice = [];
    this.hintAskedForQuestion = 0;
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
    this.setUpQuiz();
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

  setUpQuiz() {
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