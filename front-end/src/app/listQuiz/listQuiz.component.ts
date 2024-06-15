import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { Router } from '@angular/router';
import { ProfilService } from 'src/services/profil.service';
import { LISTE_PROFILS } from 'src/mocks/profil-list.mock';

@Component({
  selector: 'listQuiz',
  templateUrl: './listQuiz.component.html',
  styleUrls: ['./listQuiz.component.scss']
})
export class ListQuizComponent implements OnInit {

  public quizList: Quiz[] = [];
  public themeList: String[] = [];
  public themeListShow: String[] = this.themeList;
  public searchTerm: string = '';
  public selectedTheme: string = '';
  public helpWanted: boolean = false;

  public messageEcrit: String = '';
  public motDePasse: String = 'admin';

  constructor(public profilService: ProfilService, public quizService: QuizService, private router: Router) {
    this.quizService.quizzes$.subscribe((quizList) => {
      this.quizList = quizList;
    });

    this.quizService.themeList$.subscribe((themeList) => {
      this.themeList = themeList;
      this.themeListShow = this.themeList;
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
      this.profilService.selectProfil(LISTE_PROFILS[0]);
      this.router.navigate(['home']);
      return;
    }
    for(let i=0;i<this.messageEcrit.length;i++){
      if(this.messageEcrit[i] !== this.motDePasse[i]){
        this.messageEcrit = '';
        return;
      }
    }
  }
  
  /* filterQuizs() {
    return this.quizList.filter(quiz => {
      const matchesSearchTerm = this.searchTerm ? 
        quiz.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        quiz.theme.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      const matchesTheme = this.selectedTheme ? 
        quiz.theme === this.selectedTheme : true;
      return matchesSearchTerm && matchesTheme;
    });
  } */

  filterQuizsByTheme(theme: String) {
    let res = [];
    for (let i=0; i<this.quizList.length; i++) {
      if (this.quizList[i].name.toLowerCase().includes(this.searchTerm.toLowerCase())
        || this.quizList[i].theme.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        if (this.quizList[i].theme == theme) {
          res.push(this.quizList[i]);
        }
      }
    }
    return res;
  }

  themeShow(event: any) {
    if (event.target.value == "") {
      this.themeListShow = this.themeList;
    } else {
      this.themeListShow = [];
      this.themeListShow.push(event.target.value);
    }
  }

  quizShow(event: any) {
    let themes: String[] = [];
    for (let i=0; i<this.quizList.length; i++) {
      if (this.quizList[i].name.toLowerCase().includes(event.target.value.toLowerCase()) || this.quizList[i].theme.toLowerCase().includes(event.target.value.toLowerCase())) {
        if (!themes.includes(this.quizList[i].theme)) {
          themes.push(this.quizList[i].theme);
        }
      }
    }
    this.themeListShow = themes;
  }

  tutorielWanted() {
    this.helpWanted = true;
  }

  stopShowTutoriel(){
    this.helpWanted = false;
  }
}
