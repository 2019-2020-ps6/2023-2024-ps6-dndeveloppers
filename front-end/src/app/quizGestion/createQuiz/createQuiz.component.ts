import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './createQuiz.component.html',
  styleUrls: ['./createQuiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  public quizForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
    });
  }

  public THEME_LIST: string[] = ['Histoire', 'Géographie','Personnalité','Politique','Faune','Flore','Objet','Quotidien','Sport','Musique'];

  ngOnInit() {
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    console.log('Add quiz: ', quizToCreate);
    this.quizService.addQuiz(quizToCreate);
  }

}
