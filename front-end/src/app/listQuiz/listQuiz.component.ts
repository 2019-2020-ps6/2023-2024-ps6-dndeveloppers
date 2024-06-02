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
  public themeList: String[] = [];
  public afficher: boolean = false;
  public searchTerm: string = '';


  public messageEcrit: String = '';
  public motDePasse: String = 'admin';

  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizList) => {
      this.quizList = quizList;
    });

    this.quizService.themeList$.subscribe((themeList) => {
      this.themeList = themeList;
    })
  }

  ngOnInit() {
    this.quizService.setUpTheme();
  }

  quizSelected(quiz: Quiz) {
    console.log("listQuiz",quiz);
    this.quizService.selectQuiz(quiz);
  }

  deleteQuiz(quiz: Quiz) {
    console.log(quiz);
    this.quizService.deleteQuiz(quiz);
  }

  // fonction pour afficher le bouton retour dès qu'on a écrit this.motDePasse
  onSomeAction(event: { keyCode: number; }){
    this.messageEcrit += String.fromCharCode(event.keyCode);
    console.log(this.messageEcrit);
    if(this.messageEcrit === this.motDePasse){
      this.afficher = true;
      return;
    }
    for(let i=0;i<this.messageEcrit.length;i++){
      if(this.messageEcrit[i] !== this.motDePasse[i]){
        this.messageEcrit = '';
        return;
      }
    }
  }

  
  filterQuizs() {
    if (this.searchTerm) {
        return this.quizList.filter(quiz => 
            quiz.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            quiz.theme.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    } else {
        return this.quizList;
    }
}
}
