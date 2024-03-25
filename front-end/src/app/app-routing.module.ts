import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { IndiceComponent } from './quiz/indice/indice.component';
import { QuestionComponent } from './quiz/question/question.component';
import { ReponseComponent } from './quiz/reponse/reponse.component';
const routes: Routes = [
  {path: 'app-profil', component: ProfilComponent},
  {path: 'app-indice', component: IndiceComponent},
  {path: 'app-question', component: QuestionComponent},
  {path: 'app-reponse', component: ReponseComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
