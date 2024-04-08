import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'listQuiz',
  templateUrl: './listQuiz.component.html',
  styleUrls: ['./listQuiz.component.scss']
})
export class ListQuizComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizList) => {
      this.quizList = quizList;
    });
  }

  ngOnInit() {
  }

  quizSelected(quiz: Quiz) {
    console.log("listQuiz",quiz);
    this.quizService.selectQuiz(quiz);
  }

  deleteQuiz(quiz: Quiz) {
    console.log(quiz);
    this.quizService.deleteQuiz(quiz);
  }
}
