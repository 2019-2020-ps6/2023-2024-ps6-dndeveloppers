import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { IndiceComponent } from './quiz/indice/indice.component';
import { QuestionComponent } from './quiz/question/question.component';
import { ReponseComponent } from './quiz/reponse/reponse.component';
import { ListReponsesComponent } from './quiz/list-reponses/list-reponses.component';
const routes: Routes = [
  {path: 'app-profil', component: ProfilComponent},
  {path: 'app-indice', component: IndiceComponent},
  {path: 'app-question', component: QuestionComponent},
  {path: 'app-reponse', component: ReponseComponent},
  {path: 'app-list-reponses', component: ListReponsesComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
