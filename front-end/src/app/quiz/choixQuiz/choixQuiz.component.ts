import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-choix-quiz',
  templateUrl: './choixQuiz.component.html',
  styleUrls: ['./choixQuiz.component.scss']
})
export class ChoixQuizComponent implements OnInit {
  @Input()
  quiz: Quiz | undefined;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {
  }

  ngOnInit() {
  }

  selectQuiz() {
    this.quizSelected.emit(true);
  }

  delete() {
    this.deleteQuiz.emit(this.quiz);
  }
}
