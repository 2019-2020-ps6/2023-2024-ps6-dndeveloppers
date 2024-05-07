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
  public afficher: boolean = false;

  public messageEcrit: String = '';
  public motDePasse: String = 'admin';

  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizList) => {
      this.quizList = quizList;
    });
  }

  ngOnInit() {
    this.triQuizParTheme();
  }

  triQuizParTheme() {
    let listeTheme: String[] = [];
    for (let i=0; i<this.quizList.length; i++) {
      let toAdd = true;
      for (let j=0; j<listeTheme.length; j++) {
        if (this.quizList[i].theme == listeTheme[j]) {
          toAdd = false;
          break;
        }
      }
      if (toAdd) {
        listeTheme.push(this.quizList[i].theme);
      }
    }
    let sortedQuizList: Quiz[] = [];
    for (let i=0; i<listeTheme.length; i++) {
      for (let j=0; j<this.quizList.length; j++) {
        if (this.quizList[j].theme == listeTheme[i]) {
          sortedQuizList.push(this.quizList[j]);
        }
      }
    }
    this.quizList = sortedQuizList;
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
}
