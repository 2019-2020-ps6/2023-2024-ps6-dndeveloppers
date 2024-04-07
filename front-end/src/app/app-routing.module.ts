import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilComponent } from './profil/profil.component';
import { IndiceComponent } from './quiz/indice/indice.component';
import { QuestionComponent } from './quiz/question/question.component';
import { ReponseComponent } from './quiz/reponse/reponse.component';
import { ListReponsesComponent } from './quiz/list-reponses/list-reponses.component';
import { QuizComponent } from './quiz/quiz/quiz.component';
import { CreateQuizComponent } from './createQuiz/createQuiz.component';
import { ListQuizComponent } from './listQuiz/listQuiz.component';
import { ChoixQuizComponent } from './quiz/choixQuiz/choixQuiz.component';
import { HomeComponent } from './home/home.component';
import { ComeBackComponent } from './quiz/comeBack/comeBack.component'

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  

  {path: 'app-profil', component: ProfilComponent},
  {path: 'app-indice', component: IndiceComponent},
  {path: 'app-question', component: QuestionComponent},
  {path: 'app-reponse', component: ReponseComponent},
  {path: 'app-list-reponses', component: ListReponsesComponent},
  {path: 'app-comeBack', component: ComeBackComponent},

  //{path: 'home/listQuiz/app-quiz', component: QuizComponent},
  {path: 'home/listQuiz/app-quiz/:id_quiz', component: QuizComponent},
  {path: 'app-create-quiz', component: CreateQuizComponent},
  {path: 'home/listQuiz', component: ListQuizComponent},
  {path: 'home/choixQuiz', component: ChoixQuizComponent},

  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
