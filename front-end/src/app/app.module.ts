import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ComeBackComponent } from './quiz/comeBack/comeBack.component';

import { StatsComponent } from './stats/stats.component';
import { StatsGlobalesComponent } from './stats/statsGlobales/statsGlobales.component';
import { StatsPatientComponent } from './stats/statsPatient/statsPatient.component';
import { StatsQuizComponent } from './stats/statsQuiz/statsQuiz.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    IndiceComponent,
    QuestionComponent,
    ReponseComponent,
    ListReponsesComponent,
    QuizComponent,
    CreateQuizComponent,
    ListQuizComponent,
    ChoixQuizComponent,
    HomeComponent,
    ComeBackComponent,
    StatsComponent,
    StatsGlobalesComponent,
    StatsPatientComponent,
    StatsQuizComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
