import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { QuizService } from "src/services/quiz.service";
import { ProfilService } from 'src/services/profil.service';

@Component({
  selector: 'choixQuiz',
  templateUrl: './choixQuiz.component.html',
  styleUrls: ['./choixQuiz.component.scss']
})
export class ChoixQuizComponent implements OnInit {

  public optionPhoto : boolean = false;

  constructor(private router: Router, public quizService: QuizService, public profilService: ProfilService) {
    this.profilService.actualProfil$.subscribe( (profil) => {
      if(profil.optionPhoto){
        this.optionPhoto = profil.optionPhoto;
      }
    })
  }

  ngOnInit() {}

  @Input()
  quiz: Quiz | undefined;

  selectQuiz(quiz: Quiz) {
    this.quizService.selectQuiz(quiz);
    this.router.navigate(['home/listQuiz/app-quiz/' + quiz.name]); 
  }

  delete(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }

  catchClicDroit() {
    if (this.quiz != undefined) {
      this.selectQuiz(this.quiz);
    }
  }
}
