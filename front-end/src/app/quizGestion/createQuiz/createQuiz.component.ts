import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { STATS_INIT } from 'src/mocks/statsMocks/stats-quiz.mock';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './createQuiz.component.html',
  styleUrls: ['./createQuiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  public quizForm: FormGroup;
  public themeList: String[] = []

  constructor(private router: Router, public formBuilder: FormBuilder, public quizService: QuizService) {
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
    quizToCreate.selfStats = STATS_INIT;
    quizToCreate.photo = "none";
    console.log('Add quiz: ', quizToCreate);
    console.log('Editing new quiz');
    this.quizService.addQuiz(quizToCreate);
    this.quizForm.reset();
    this.quizService.editingQuiz(quizToCreate);
    this.router.navigate(['home/gestionQuiz/editQuiz/' + quizToCreate.name]);
  }
}
