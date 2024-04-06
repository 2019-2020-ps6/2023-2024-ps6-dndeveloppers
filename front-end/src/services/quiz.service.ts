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
  private choosenQuiz: Quiz | undefined;
  private actualQuestion: Question = QUESTION_ACTOR0;
  private actualResponses: Answer[] = QUESTION_ACTOR0.answers;
  private actualQuestionNumber: number = 0;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);
  public choosenQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject(QUIZ_LIST[0]);
  public actualQuestion$: BehaviorSubject<Question> = new BehaviorSubject(QUESTION_ACTOR0);
  public actualResponses$: BehaviorSubject<Answer[]> = new BehaviorSubject(QUESTION_ACTOR0.answers);

  public url: string = "";

  constructor() {}

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz: Quiz) {
    for(let i=0;i<this.quizzes.length;i++){
      if(this.quizzes[i].name==quiz.name){
        delete this.quizzes[i];
        this.quizzes$.next(this.quizzes);
        return;
      }
    }
  }

  selectQuiz(quiz: Quiz) {
    console.log("selected: " + quiz.name + ", " + quiz.theme);
    if (quiz.questions === undefined) {
      console.log("This quiz does not have any question!");
    } else {
      this.displayQuestion(quiz, 0);
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
    this.actualQuestionNumber++;
    if (this.actualQuestionNumber <= quiz.questions.length) {
      this.displayQuestion(quiz,this.actualQuestionNumber);
    } else {
      console.log("End of quiz");
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