import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUESTION_ACTOR0, QUIZ_LIST } from '../mocks/quiz-list.mock';
import { Answer, Question } from 'src/models/question.models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = QUIZ_LIST;
  private choosenQuiz: Quiz = this.quizzes[0];
  private actualQuestion: Question = QUESTION_ACTOR0;
  private actualResponses: Answer[] = QUESTION_ACTOR0.answers;
  private actualQuestionNumber: number = 0;
  private endOfQuiz: boolean = false;

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

  public url: string = "";

  constructor() {}

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
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
    let quizEnCours: Quiz = this.quizzes[0];
    for(let i=0;i<this.quizzes.length;i++){
      if(this.quizzes[i]==quiz){
        quizEnCours = this.quizzes[i];
        this.choosenQuiz = this.quizzes[i];
        this.choosenQuiz$.next(this.choosenQuiz);
        console.log("quiz choisit : ",this.choosenQuiz);
      }
    }
    if (quizEnCours.questions === undefined) {
      console.log("This quiz does not have any question!");
    } else {
      console.log("ok");
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

  responseSelected(quiz: Quiz, responseNumber: number) {
    console.log("Response selected (service POV) : ",responseNumber);
    if (this.actualResponses[responseNumber].isCorrect) {
      console.log("Right answer congrats!");
    } else {
      console.log("Wrong answer!");
    }

    if (this.actualQuestionNumber == quiz.questions.length-1) {
      console.log("C'était la dernière question");
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
}