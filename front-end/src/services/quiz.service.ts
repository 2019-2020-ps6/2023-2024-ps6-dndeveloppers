import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST, QUIZ_NULL } from '../mocks/quiz-list.mock';
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
  private choosenQuiz: Quiz = QUIZ_NULL;

  private themeList: String[] = []; // liste des thèmes de quiz
  private editedQuiz: Quiz = QUIZ_NULL; // quiz en cours d'édition

  private infoQuiz: InfoQuiz = JSON.parse(JSON.stringify(infoQuiz_INIT)); // contient les info du quiz joué en cours
  public disableHintHelp: boolean = true;
  public showHint: boolean[] = [false, false, false];

  private quizURL: string = serverUrl + '/quiz';
  private httpOptions = httpOptionsBase;

  

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public actualProfil$: BehaviorSubject<Profil> = new BehaviorSubject(this.actualProfil);
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);
  public choosenQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject(QUIZ_NULL);

  public themeList$: BehaviorSubject<String[]> = new BehaviorSubject(this.themeList);
  public editedQuiz$ : BehaviorSubject<Quiz> = new BehaviorSubject(this.editedQuiz);
  public disableHintHelp$: BehaviorSubject<boolean> = new BehaviorSubject(this.disableHintHelp);
  public showHint$: BehaviorSubject<boolean[]> = new BehaviorSubject(this.showHint);

  public infoQuiz$: BehaviorSubject<InfoQuiz> = new BehaviorSubject(this.infoQuiz);

  constructor(public statsService: StatsService, private http: HttpClient) {
    this.retrievesQuiz();
  }

  retrievesQuiz(idQuiz = -1){
    this.http.get<Quiz[]>(this.quizURL).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
      console.log("quiz : ",this.quizzes);
      this.setUpTheme();

      if(idQuiz != -1){
        for(let i=0; i< this.quizzes.length; i++){
          if(this.quizzes[i].id == this.editedQuiz.id){
            this.editedQuiz = this.quizzes[i];
            this.editedQuiz$.next(this.editedQuiz);
          }
        }
      }
    });
  }

  selectProfil(profil: Profil) {
    this.actualProfil = profil;
    this.actualProfil$.next(this.actualProfil);
  }

  // ---------- Méthodes Appel Back ----------

  addQuiz(quiz: Quiz){
    this.http.post<Quiz>(this.quizURL, quiz, this.httpOptions).subscribe(() => {this.retrievesQuiz(); //this.editingQuiz(quiz)

    });
  }

  deleteQuiz(quiz : Quiz){
    console.log("Le quiz : " ,quiz.name, " a été supprimé");
    const urlWithId = this.quizURL + '/:' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrievesQuiz());
  }

  selectQuiz(quiz: Quiz) {
    //console.log("info quiz : ",this.infoQuiz);
    for(let i=0;i<this.quizzes.length;i++){
      if(this.quizzes[i]==quiz){
        this.choosenQuiz = this.quizzes[i];
        this.choosenQuiz$.next(this.choosenQuiz);
        console.log("Quiz choisit : ",this.choosenQuiz);
      }
    }
    this.showHint = [false, false, false];
    for (let i=0; i<this.choosenQuiz.questions[0].indice.length; i++) {
      if (this.choosenQuiz.questions[0].indice[i].value != "") {
        this.showHint[i] = true;
      }
    }
    this.showHint$.next(this.showHint);

    if (this.infoQuiz.lastQuizPlayed == this.choosenQuiz.name) { // on rétablit la partie
     this.infoQuiz.askedToRestoreGame = true;
     this.updateInfoQuiz();
    }
    else {
      this.resetInfoQuiz();
      this.infoQuiz.lastQuizPlayed = this.choosenQuiz.name;
      this.updateInfoQuiz();
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

  restoreQuiz(){
    this.infoQuiz.askedToRestoreGame = false;
    this.updateInfoQuiz();
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
        if (this.getActualQuestion().indice[i].value.length > 1) {
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
    //console.log("disability called");
    this.disableHintHelp = bool;
    this.disableHintHelp$.next(this.disableHintHelp);
  }

  hintAsked(){
    if (!this.infoQuiz.endOfQuiz) {
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
  }

  hideResponse() {
    console.log("hide");
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
    if (nbOfTrue > 2) {
      while (randomNumber == rightResponse || this.infoQuiz.displayResponses[randomNumber] == false) {
        randomNumber = Math.trunc(Math.random()*(4-0) + 0);
      }
      this.infoQuiz.displayResponses[randomNumber] = false;
      this.updateInfoQuiz();
    }
  }

  responseSelected(quiz: Quiz, responseNumber: number) {
    if(this.actualProfil.optionReposerQuestionApres){
      if(this.infoQuiz.replayQuestion){ // on est dans la phase où on repose les questions
        this.responsesSelectedPlayAskedAgain(quiz, responseNumber);
      }
      else{ // on n'est pas encore dans la phase où on repose les questions
        this.responsesSelectedWithAskedAgain(quiz,responseNumber);
      }
    }
    else {
      this.responsesSelectedNormal(quiz,responseNumber);
    }
      
  }
  
  // si l'on a l'option reposer la question plus tard
  responsesSelectedWithAskedAgain(quiz: Quiz, responseNumber: number) {
    if (this.getActualQuestion().answers[responseNumber].isCorrect) { // on passe à la suivante
      console.log("Bonne réponse félicitation!");
      let score = 1 - (this.infoQuiz.nbHintAskedForActualQuestion/(this.getActualQuestionNumberHint() + 3));
      console.log("score à cette question : ",score);

      this.infoQuiz.actualScore += score;
      this.infoQuiz.scoreForEachQuestion.push(score);
      this.infoQuiz.nbGoodAnswer ++;
      this.infoQuiz.actualStreak ++;
      this.infoQuiz.nbHintUsed += this.infoQuiz.nbHintAskedForActualQuestion;
      this.infoQuiz.displayResponses = [true, true, true, true];
      this.infoQuiz.showGoodAnswer = true;

      if(this.infoQuiz.actualQuestionNumber == quiz.questions.length-1){ // si le quiz est finit
        console.log("quiz finit");
        if (this.infoQuiz.bestStreak < this.infoQuiz.actualStreak) {
          this.infoQuiz.bestStreak = this.infoQuiz.actualStreak;
        }

        if(this.infoQuiz.questionToReplay.length == 0){ // il n'y a pas de question a reposer donc le quiz est vraiment finit
          this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
          this.choosenQuiz.selfStats = this.statsService.updateQuizStats(this.infoQuiz,this.choosenQuiz.selfStats);
          this.statsService.patientScoreNewData(this.actualProfil, this.infoQuiz.actualScore/quiz.questions.length);
          this.infoQuiz.endOfQuiz = true;
          this.http.put<Quiz>(serverUrl + '/quiz/:' + this.choosenQuiz.id , this.choosenQuiz ,this.httpOptions).subscribe(() => this.retrievesQuiz());
        }
        else { // sinon on repose les questions à reposer
          this.infoQuiz.replayQuestion = true;
          console.log("on passe aux questions à rejouer",this.infoQuiz.questionToReplay)
          this.infoQuiz.questionToReplay.reverse();
          let numQuestion = this.infoQuiz.questionToReplay.pop();
          this.infoQuiz.questionToReplay.reverse();
          if(numQuestion != undefined){
            this.infoQuiz.actualQuestionNumber = numQuestion;
          }
          
        }
      }
      else { // sinon on continue le quiz
        this.infoQuiz.actualQuestionNumber++;
        this.showHint = [false, false, false];
        for (let i=0; i<this.choosenQuiz.questions[this.infoQuiz.actualQuestionNumber].indice.length; i++) {
          console.log("indice : ", this.choosenQuiz.questions[this.infoQuiz.actualQuestionNumber].indice[i].value);
          if (this.choosenQuiz.questions[this.infoQuiz.actualQuestionNumber].indice[i].value != "") {
            this.showHint[i] = true;
          }
        }
        this.showHint$.next(this.showHint);
        this.infoQuiz.nbHintAskedForActualQuestion = 0
      }  

    }
    else { // on enregistre la question a reposer et on passe à la suivante
      console.log("faux");
      this.infoQuiz.scoreForEachQuestion.push(0);
      this.infoQuiz.questionToReplay.push(this.infoQuiz.actualQuestionNumber)
      this.infoQuiz.displayResponses = [true, true, true, true];
      this.infoQuiz.showGoodAnswer = true;
      this.infoQuiz.nbHintAskedForActualQuestion = 0; // on ne compte pas les indices sur les questions à reposer

      if (this.infoQuiz.bestStreak < this.infoQuiz.actualStreak) {
        this.infoQuiz.bestStreak = this.infoQuiz.actualStreak;
      }
      this.infoQuiz.actualStreak = 0;

      if(this.infoQuiz.actualQuestionNumber == quiz.questions.length-1){ // si on est à la fin du quiz on lance les questions à reposer
        this.infoQuiz.replayQuestion = true;
        this.infoQuiz.questionToReplay.reverse();
        let numQuestion = this.infoQuiz.questionToReplay.pop();
        this.infoQuiz.questionToReplay.reverse();
        console.log("nb Question : ",numQuestion);
        if(numQuestion != undefined){
          this.infoQuiz.actualQuestionNumber = numQuestion;
          console.log("on passe aux questions à rejouer ",this.infoQuiz.questionToReplay)
        }
      }
      else{ // sinon on continue le quiz
        this.infoQuiz.actualQuestionNumber++;
      }
    }
    this.updateInfoQuiz();
  }

   // si l'on a l'option reposer la question plus tard et qu'on est au moment où on repose les questions
   responsesSelectedPlayAskedAgain(quiz: Quiz, responseNumber: number) {
    this.infoQuiz.nbHintUsed += this.infoQuiz.nbHintAskedForActualQuestion;
    if (this.getActualQuestion().answers[responseNumber].isCorrect) {
      let score = 1 - (this.infoQuiz.nbHintAskedForActualQuestion/(this.getActualQuestionNumberHint() + 3));
      console.log("score à cette question : ",score);
      this.infoQuiz.actualScore += score;

      let nbQuestion = this.infoQuiz.actualQuestionNumber
      
      if(nbQuestion != undefined){
        this.infoQuiz.scoreForEachQuestion[nbQuestion] = score;
        console.log("nb Question ::: ", nbQuestion)
      }
      this.infoQuiz.nbGoodAnswer ++;
      this.infoQuiz.displayResponses = [true, true, true, true];
      this.infoQuiz.showGoodAnswer = true;
    }

    console.log("question qu'il reste : ",this.infoQuiz.questionToReplay)
    // s'il ne reste pas de question à reposer
    if(this.infoQuiz.questionToReplay.length == 0){
      this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
      this.choosenQuiz.selfStats = this.statsService.updateQuizStats(this.infoQuiz,this.choosenQuiz.selfStats);
      this.statsService.patientScoreNewData(this.actualProfil, this.infoQuiz.actualScore/quiz.questions.length);
      this.infoQuiz.endOfQuiz = true;
      this.http.put<Quiz>(serverUrl + '/quiz/:' + this.choosenQuiz.id , this.choosenQuiz ,this.httpOptions).subscribe(() => this.retrievesQuiz());
    }
    else {
      this.infoQuiz.questionToReplay.reverse();
      let nbNewQuestion = this.infoQuiz.questionToReplay.pop();
      this.infoQuiz.questionToReplay.reverse();
      if(nbNewQuestion != undefined){
        this.infoQuiz.actualQuestionNumber = nbNewQuestion;
      }
      
    }
    this.updateInfoQuiz();
  }

  // pas l'option reposer la question plus tard
  responsesSelectedNormal(quiz: Quiz, responseNumber: number) {
    if (this.getActualQuestion().answers[responseNumber].isCorrect) {
      // on ajoute le score
      console.log("Bonne réponse félicitation!");
      let score = 1 - (this.infoQuiz.nbHintAskedForActualQuestion/(this.getActualQuestionNumberHint() + 3));
      console.log("score à cette question : ",score-(this.infoQuiz.nbErrors/4));

      if(score-(this.infoQuiz.nbErrors/4) > 0){
        this.infoQuiz.actualScore += score-(this.infoQuiz.nbErrors/4); // on ajoute le score s'il est positif
        this.infoQuiz.scoreForEachQuestion.push(score-(this.infoQuiz.nbErrors/4));
      }
      else {
        this.infoQuiz.scoreForEachQuestion.push(0);
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
        this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
        this.choosenQuiz.selfStats = this.statsService.updateQuizStats(this.infoQuiz,this.choosenQuiz.selfStats);
        if (this.infoQuiz.bestStreak < this.infoQuiz.actualStreak) {
          this.infoQuiz.bestStreak = this.infoQuiz.actualStreak;
        }

        this.statsService.patientScoreNewData(this.actualProfil, this.infoQuiz.actualScore/quiz.questions.length);
        this.infoQuiz.endOfQuiz = true;
        this.http.put<Quiz>(serverUrl + '/quiz/:' + this.choosenQuiz.id , this.choosenQuiz ,this.httpOptions).subscribe(() => this.retrievesQuiz());
      } 
      else { // sinon on continue le quiz
        this.infoQuiz.actualQuestionNumber++;
        this.showHint = [false, false, false];
        for (let i=0; i<this.choosenQuiz.questions[this.infoQuiz.actualQuestionNumber].indice.length; i++) {
          if (this.choosenQuiz.questions[this.infoQuiz.actualQuestionNumber].indice[i].value != "") {
            this.showHint[i] = true;
          }
        }
        this.showHint$.next(this.showHint);
        this.infoQuiz.nbHintAskedForActualQuestion = 0
      }
    } 
    // sinon on a donc une mauvaise réponse
    else {
      if (this.infoQuiz.bestStreak < this.infoQuiz.actualStreak) {
        this.infoQuiz.bestStreak = this.infoQuiz.actualStreak;
      }
      this.infoQuiz.actualStreak = 0;

      // disjonction de cas : on supprime la mauvaise réponse
      if(this.actualProfil.optionSupprimerMauvaisesReponses){
        this.infoQuiz.displayResponses[responseNumber] = false;
        this.infoQuiz.nbErrors ++;
      }
      // sinon on passe à la question suivante
      else {
        if(this.infoQuiz.actualQuestionNumber == quiz.questions.length-1){ // cas fin quiz
          console.log("C'était la dernière question");
          console.log("score final : ",this.infoQuiz.actualScore);
          this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
          this.infoQuiz.scoreForEachQuestion.push(0)
          this.statsService.patientScoreNewData(this.actualProfil, this.infoQuiz.actualScore/quiz.questions.length);
          this.choosenQuiz.selfStats = this.statsService.updateQuizStats(this.infoQuiz,this.choosenQuiz.selfStats);

          this.infoQuiz.endOfQuiz = true;
          this.http.put<Quiz>(serverUrl + '/quiz/:' + this.choosenQuiz.id , this.choosenQuiz ,this.httpOptions).subscribe(() => this.retrievesQuiz());
        }
        else {
          this.infoQuiz.actualQuestionNumber++;
          this.infoQuiz.nbHintUsed += this.infoQuiz.nbHintAskedForActualQuestion;
          this.infoQuiz.nbHintAskedForActualQuestion = 0;
          this.infoQuiz.scoreForEachQuestion.push(0);
        }
      }
    }
    this.updateInfoQuiz();
  }

  // quand un joueur skip une question
  skipQuestion(quiz: Quiz){
    if (this.infoQuiz.bestStreak < this.infoQuiz.actualStreak) {
      this.infoQuiz.bestStreak = this.infoQuiz.actualStreak;
    }
    this.infoQuiz.actualStreak = 0;
    this.infoQuiz.scoreForEachQuestion.push(0);
    this.infoQuiz.nbHintAskedForActualQuestion = 0;
    this.infoQuiz.displayResponses = [true, true, true, true];
    this.infoQuiz.nbErrors = 0;
    this.infoQuiz.showGoodAnswer = true;

    if(this.infoQuiz.actualQuestionNumber == quiz.questions.length-1){ // si on est à la fin du quiz
      console.log("C'était la dernière question");
      this.actualProfil.selfStats.quizDone.push(this.choosenQuiz.name);
      this.choosenQuiz.selfStats = this.statsService.updateQuizStats(this.infoQuiz,this.choosenQuiz.selfStats);
      this.statsService.patientScoreNewData(this.actualProfil, this.infoQuiz.actualScore/quiz.questions.length);
      this.infoQuiz.endOfQuiz = true;
      this.http.put<Quiz>(serverUrl + '/quiz/:' + this.choosenQuiz.id , this.choosenQuiz ,this.httpOptions).subscribe(() => this.retrievesQuiz());
    }
    else {
      this.infoQuiz.actualQuestionNumber++;      
    }
    this.updateInfoQuiz();
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
    this.setUpQuiz();
  }

  addTheme(theme: String){
    let add = true;
    for (let i=0; i<this.themeList.length; i++) {
      if (this.themeList[i] == theme) {
        add = false;
        break;
      }
    }
    if (add) {
      this.themeList.push(theme);
      this.themeList$.next(this.themeList);
      console.log("Le thème : ",theme," a été rajouté (temporairement)");
    }
  }

  // ------------------------------------------------------------ édition quiz/questions ------------------------------------------------------------------------------

  editingQuiz(quiz: Quiz){
    this.editedQuiz = quiz;
    this.editedQuiz.id = quiz.id
    this.editedQuiz$.next(this.editedQuiz);
    console.log("edition : ",quiz);
  }

  // trier les quiz par thème
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
    question.idQuiz = this.editedQuiz.id;
    this.http.post<Question>(serverUrl + '/question', question, this.httpOptions).subscribe(() => {
      this.retrievesQuiz(question.idQuiz);
    });
  }

  deleteQuestion(question: Question){
    console.log("Le question : " ,question.label, " a été supprimé");
    const urlWithId = serverUrl + '/question' + '/:' + question.id;
    this.http.delete<Question>(urlWithId, this.httpOptions).subscribe(() => this.retrievesQuiz(question.idQuiz));
  }

  editQuestion(question: Question){
    console.log("Question éditée : ",question);
    this.http.put<Question>(serverUrl + '/question', question ,this.httpOptions).subscribe(() => this.retrievesQuiz());
  }

  editGlobalQuiz(valeurs: string[]){
    this.http.put<Question>(serverUrl + '/quiz/:' + this.editedQuiz.id , valeurs ,this.httpOptions).subscribe(() => this.retrievesQuiz());
    console.log("Quiz édité");
  }

  updateQuiz(){
    let quiz : Quiz = this.editedQuiz;
    this.deleteQuiz(quiz);
    this.addQuiz(quiz);
  }
}

