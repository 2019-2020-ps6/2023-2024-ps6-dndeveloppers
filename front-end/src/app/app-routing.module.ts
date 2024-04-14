import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndiceComponent } from './quiz/indice/indice.component';
import { QuestionComponent } from './quiz/question/question.component';
import { ReponseComponent } from './quiz/reponse/reponse.component';
import { ListReponsesComponent } from './quiz/list-reponses/list-reponses.component';
import { QuizComponent } from './quiz/quiz/quiz.component';
import { CreateQuizComponent } from './quizGestion/createQuiz/createQuiz.component';
import { ListQuizComponent } from './listQuiz/listQuiz.component';
import { ChoixQuizComponent } from './quiz/choixQuiz/choixQuiz.component';
import { HomeComponent } from './home/home.component';
import { ComeBackComponent } from './comeBack/comeBack.component'
import { StatsComponent } from './stats/stats.component';
import { HeaderComponent } from './header/header.component';
import { ListProfilComponent } from './Profil/listProfil/listProfil.component';
import { EditProfilComponent } from './Profil/editProfil/editProfil.component';
import { ViewProfilComponent } from './Profil/viewProfil/viewProfil.component';
import { CreateProfilComponent } from './Profil/createProfil/createProfil.component';
import { QuizGestionComponent } from './quizGestion/quizGestion/quizGestion.component';
import { EditQuizComponent } from './quizGestion/editQuiz/editQuiz.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'app-header', component: HeaderComponent}, // Bande haut : NomSite + Profil

  // Jouer Quiz 
  {path: 'app-indice', component: IndiceComponent},
  {path: 'app-question', component: QuestionComponent},
  {path: 'app-reponse', component: ReponseComponent},
  {path: 'app-list-reponses', component: ListReponsesComponent},
  {path: 'app-comeBack', component: ComeBackComponent},
  {path: 'home/listQuiz/app-quiz/:name_quiz', component: QuizComponent}, // Quiz x 
  {path: 'home/listQuiz', component: ListQuizComponent}, 
  {path: 'home/choixQuiz', component: ChoixQuizComponent}, // Les quiz dans listQuiz

  // Profil
  {path: 'home/listProfil', component: ListProfilComponent}, 
  {path: 'home/listProfil/editProfil/:name_profil', component: EditProfilComponent},
  {path: 'home/listProfil/editProfil', component: EditProfilComponent},
  {path: 'app-viewProfil', component: ViewProfilComponent}, // pour afficher les profils dans la liste des profils
  {path: 'home/listProfil/createProfil', component: CreateProfilComponent}, 

  // Edit - Gestion Quiz
  {path: 'home/gestionQuiz', component: QuizGestionComponent},
  {path: 'home/gestionQuiz/editQuiz/:name_quiz', component: EditQuizComponent},

  {path: 'home/stats', component: StatsComponent},

  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
