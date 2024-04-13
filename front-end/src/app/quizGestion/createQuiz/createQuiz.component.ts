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
  public themeList: String[] = []

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
    });

    this.quizService.themeList$.subscribe((themeList) => {
      this.themeList = themeList;
    });

  }

  ngOnInit() {
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    quizToCreate.questions = [];
    console.log('Add quiz: ', quizToCreate);
    this.quizService.addQuiz(quizToCreate);
  }
}
