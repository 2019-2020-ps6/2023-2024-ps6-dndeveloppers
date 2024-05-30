import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { Question } from 'src/models/question.models';
import { StatsService } from './stats.service';
import { Profil } from 'src/models/profil.model';
import { LISTE_PROFILS } from 'src/mocks/profil-list.mock';
import { InfoQuiz } from 'src/models/infoQuiz.model';
import { infoQuiz_INIT } from 'src/mocks/infoQuiz.mock';
import { httpOptionsBase, serverUrl } from 'src/configs/server.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private actualProfil: Profil = LISTE_PROFILS[0];
  private quizzes: Quiz[] = QUIZ_LIST;
  private choosenQuiz: Quiz = this.quizzes[0];

  private themeList: String[] = []; // liste des thèmes de quiz
  private editedQuiz: Quiz = this.quizzes[0]; // quiz en cours d'édition

  private infoQuiz: InfoQuiz = JSON.parse(JSON.stringify(infoQuiz_INIT)); // contient les info du quiz joué en cours
  public disableHintHelp: boolean = true;

  private quizURL: string = serverUrl + '/quiz';
  private httpOptions = httpOptionsBase;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public actualProfil$: BehaviorSubject<Profil> = new BehaviorSubject(this.actualProfil);
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);
  public choosenQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject(QUIZ_LIST[0]);

  public themeList$: BehaviorSubject<String[]> = new BehaviorSubject(this.themeList);
  public editedQuiz$ : BehaviorSubject<Quiz> = new BehaviorSubject(this.editedQuiz);
  public disableHintHelp$: BehaviorSubject<boolean> = new BehaviorSubject(this.disableHintHelp);

  public infoQuiz$: BehaviorSubject<InfoQuiz> = new BehaviorSubject(this.infoQuiz);

  constructor(public statsService: StatsService, private http: HttpClient) {
    this.retrievesQuiz();
  }

  retrievesQuiz(){
    this.http.get<Quiz[]>(this.quizURL).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
      console.log("quiz : ",this.quizzes);
      this.setUpTheme();
    });
  }

  selectProfil(profil: Profil) {
    this.actualProfil = profil;
    this.actualProfil$.next(this.actualProfil);
  }

  // ---------- Méthodes Appel Back ----------

  /*
  addQuiz(quiz: Quiz) {
    this.statsService.addQuizToSeries(quiz);
    this.quizzes.push(quiz);
    this.setUpQuiz();
    this.quizzes$.next(this.quizzes);
  }*/

  addQuiz(quiz: Quiz){
    this.http.post<Quiz>(this.quizURL, quiz, this.httpOptions).subscribe(() => this.retrievesQuiz());
  }

  /*
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
  }*/

  deleteQuiz(quiz : Quiz){
    console.log("Le quiz : " ,quiz.name, " a été supprimé");
    const urlWithId = this.quizURL + '/:' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrievesQuiz());
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
      console.log("Quiz valide");
    }
  }

  getQuizzes(quiz: Quiz){
    for(let i=0;i<this.quizzes.length;i++){
      if(this.quizzes[i].name==quiz.name){
        console.log("Quiz sélectionné : ",this.quizzes[i].name);
      }
    }
  }

  // --------------- Méthodes pour jouer un quiz ---------------

  resetInfoQuiz(){
    this.infoQuiz = JSON.parse(JSON.stringify(infoQuiz_INIT));
    this.infoQuiz$.next(this.infoQuiz);
  }

  updateInfoQuiz(){
    this.infoQuiz$.next(this.infoQuiz);
  }

  dontShowTutoriel() {
    this.actualProfil.tutoriel = false;
  }

  getActualQuestion(){
    return this.choosenQuiz.questions[this.infoQuiz.actualQuestionNumber];
  }

  // return the number of hint in the current Question 
  getActualQuestionNumberHint(){
    let indiceQuestion = 0;
      for (let i=0; i<this.getActualQuestion().indice.length; i++) {
        if (this.getActualQuestion().indice[i].value != "") {
          indiceQuestion++;
        }
      }
      return indiceQuestion;
  }

  // return boolean if we need to show the good answer, if yes reset the value to false
  showGoodAnswer(){
    let choice = this.infoQuiz.showGoodAnswer;
    if(choice){
      this.infoQuiz.showGoodAnswer = false;
      this.updateInfoQuiz();
    }
    return choice
  }

  disablingHintAndHelp(bool: boolean) {
    console.log("disability called");
    this.disableHintHelp = bool;
    this.disableHintHelp$.next(this.disableHintHelp);
  }

  hintAsked(){
    // premier cas : on affiche l'indice
    if(this.infoQuiz.nbHintAskedForActualQuestion < this.getActualQuestionNumberHint()){
      this.infoQuiz.nbHintAskedForActualQuestion++;
      console.log("Indice demandé");
      this.updateInfoQuiz();  
    }
    // deuxième cas : on enlève une réponse (car on a déjà utilisé tout les indices textuels)
    else if (this.infoQuiz.nbHintAskedForActualQuestion-2 < this.getActualQuestionNumberHint()) {
      this.infoQuiz.nbHintAskedForActualQuestion++;
      this.updateInfoQuiz(); 
      this.hideResponse();
      console.log("cache une réponse");
    } 
    // troisième cas : rien
    else {
      console.log("Plus d'indice");
    }
  }

  hideResponse() {
    let nbOfTrue = 0;
    for (let i=0; i<this.infoQuiz.displayResponses.length; i++) {
      if (this.infoQuiz.displayResponses[i]) {
        nbOfTrue++;
      }
    }
    let rightResponse = 0;
    for (let i=0; i<4; i++) {
      if (this.getActualQuestion().answers[i].isCorrect) {
        rightResponse = i;
        break;
      }
    }
    // une réponse aléatoire fausse n'apparaîtra plus  
    let randomNumber = Math.trunc(Math.random()*(4-0) + 0);
    while (randomNumber == rightResponse || this.infoQuiz.displayResponses[randomNumber] == false) {
      randomNumber = Math.trunc(Math.random()*(4-0) + 0);
    }
    this.infoQuiz.displayResponses[randomNumber] = false;
    this.updateInfoQuiz();
  }

  responseSelected(quiz: Quiz, responseNumber: number) {
    console.log("Response selected (service POV) : ",responseNumber);
    if(this.actualProfil.optionReposerQuestionApres){
      this.responsesSelectedWithAskedAgain(quiz,responseNumber);
    }
    else {
      this.responsesSelectedNormal(quiz,responseNumber);
    }
  }
  
  // si l'on a l'option reposer la question plus tard
  responsesSelectedWithAskedAgain(quiz: Quiz, responseNumber: number) {
  }

  // pas l'option reposer la question plus tard
  responsesSelectedNormal(quiz: Quiz, responseNumber: number) {
    if (this.getActualQuestion().answers[responseNumber].isCorrect) {
      console.log("Bonne réponse félicitation!");
      this.statsService.successRateNewData(100, this.infoQuiz.actualQuestionNumber);
      let score = 1 - (this.infoQuiz.nbHintAskedForActualQuestion/(this.getActualQuestionNumberHint() + 3));
      console.log("score à cette question : ",score-(this.infoQuiz.nbErrors/4));

      if(score-(this.infoQuiz.nbErrors/4) > 0){
        this.infoQuiz.actualScore += score-(this.infoQuiz.nbErrors/4); // on ajoute le score s'il est positif
      }
      
      if(this.infoQuiz.nbErrors==0){
        this.infoQuiz.nbGoodAnswer++; // on a bien répondu du premier coup
      }

      this.infoQuiz.actualStreak++; // on continue la suite de bonnes réponses
      this.infoQuiz.nbHintUsed += this.infoQuiz.nbHintAskedForActualQuestion; // on ajoute le nombre d'indices utilisés
      this.infoQuiz.nbHintAskedForActualQuestion = 0;
      this.infoQuiz.displayResponses = [true, true, true, true];
      this.infoQuiz.nbErrors = 0;
      this.infoQuiz.showGoodAnswer = true;
      
      // si le quiz est finit
      if (this.infoQuiz.actualQuestionNumber == quiz.questions.length-1) {
        console.log("C'était la dernière question");
        console.log("score final : ",this.infoQuiz.actualScore);
        this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
        this.statsService.meanScoreNewData(this.infoQuiz.actualScore);
        this.statsService.usedHintNewData(this.infoQuiz.nbHintUsed);
                                          
        if (this.infoQuiz.bestStreak < this.infoQuiz.actualStreak) {
          this.infoQuiz.bestStreak = this.infoQuiz.actualStreak;
        }

        this.statsService.patientScoreNewData(this.actualProfil, this.infoQuiz.actualScore/quiz.questions.length);
        this.infoQuiz.endOfQuiz = true;
      } 
      else { // sinon on continue le quiz
        this.infoQuiz.actualQuestionNumber++;
        this.infoQuiz.nbHintAskedForActualQuestion = 0
      }
    } 
    // sinon on a donc une mauvaise réponse
    else {
      if (this.infoQuiz.bestStreak < this.infoQuiz.actualStreak) {
        this.infoQuiz.bestStreak = this.infoQuiz.actualStreak;
      }
      this.infoQuiz.actualStreak = 0;
      this.statsService.successRateNewData(0, this.infoQuiz.actualQuestionNumber);

      // disjonction de cas : on supprime la mauvaise réponse
      if(this.actualProfil.optionSupprimerMauvaisesReponses){
        this.infoQuiz.displayResponses[responseNumber] = false;
        this.infoQuiz.nbErrors ++;
      }
      // sinon on passe à la question suivante
      else {
        if(this.infoQuiz.actualQuestionNumber == quiz.questions.length-1){
          console.log("C'était la dernière question");
          console.log("score final : ",this.infoQuiz.actualScore);
          this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
          this.statsService.meanScoreNewData(this.infoQuiz.actualScore);
          this.statsService.usedHintNewData(this.infoQuiz.nbHintUsed);
          this.statsService.patientScoreNewData(this.actualProfil, this.infoQuiz.actualScore/quiz.questions.length);
          this.infoQuiz.endOfQuiz = true;
        }
        else {
          this.infoQuiz.actualQuestionNumber++;
          this.infoQuiz.nbHintUsed += this.infoQuiz.nbHintAskedForActualQuestion;
          this.infoQuiz.nbHintAskedForActualQuestion = 0;
        }
      }
    }
    this.updateInfoQuiz();
  }

  /*
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
        this.statsService.meanScoreNewData(this.choosenQuiz.actualScore);
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
  }*/


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

  /*
  addQuestion(question: Question){
    this.editedQuiz.questions.push(question);
    console.log("Question ", question, " ajoutée.");
    console.log(this.editedQuiz);
  }*/

  addQuestion(question: Question){
    question.idQuiz = this.editedQuiz.id;
    console.log("qestion : ",question)
    this.http.post<Question>(serverUrl + '/question', question, this.httpOptions).subscribe(() => {this.retrievesQuiz(); this.updateEditedQuiz()});
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

  updateEditedQuiz(){
    for(let i=0; i< this.quizzes.length; i++){
      if(this.quizzes[i].id == this.editedQuiz.id){
        this.editedQuiz = this.quizzes[i]
        this.editedQuiz$.next(this.editedQuiz)
        console.log("okok")
      }
    }
  }
}

