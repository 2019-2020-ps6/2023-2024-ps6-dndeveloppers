import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { IndiceComponent } from './quiz/indice/indice.component';
const routes: Routes = [
  {path: 'app-profil', component: ProfilComponent},
  {path: 'app-indice', component: IndiceComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
