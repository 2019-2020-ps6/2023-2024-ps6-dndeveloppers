import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { QuizService } from "src/services/quiz.service";

@Component({
  selector: 'choixQuiz',
  templateUrl: './choixQuiz.component.html',
  styleUrls: ['./choixQuiz.component.scss']
})
export class ChoixQuizComponent implements OnInit {
  @Input()
  quiz: Quiz | undefined;
  
  constructor(private router: Router,public quizService: QuizService) {
  }

  ngOnInit() {
  }

  selectQuiz(quiz: Quiz): void {
    console.log("ccc ",quiz);
    //this.quizSelected.emit(true);
    this.quizService.selectQuiz(quiz);
    console.log(this.router.url);
    console.log(quiz.name);
    this.router.navigate(['home/listQuiz/app-quiz/' + quiz.name]); 
  }

  delete(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }
}
