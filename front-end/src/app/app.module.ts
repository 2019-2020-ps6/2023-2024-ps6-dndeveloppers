import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IndiceComponent } from './quiz/indice/indice.component';
import { HomeComponent } from './home/home.component';

import { QuestionComponent } from './quiz/question/question.component';
import { ReponseComponent } from './quiz/reponse/reponse.component';
import { ListReponsesComponent } from './quiz/list-reponses/list-reponses.component';
import { QuizComponent } from './quiz/quiz/quiz.component';
import { ListQuizComponent } from './listQuiz/listQuiz.component';
import { ChoixQuizComponent } from './quiz/choixQuiz/choixQuiz.component';
import { ComeBackComponent } from './comeBack/comeBack.component';
import { HeaderComponent } from './header/header.component';

import { CreateQuizComponent } from './quizGestion/createQuiz/createQuiz.component';
import { QuizGestionComponent } from './quizGestion/quizGestion/quizGestion.component';
import { EditQuizComponent } from './quizGestion/editQuiz/editQuiz.component';
import { AddQuestionComponent } from './quizGestion/addQuestion/addQuestion.component';
import { EditQuizGlobalComponent } from './quizGestion/editQuizGlobal/editQuizGlobal.component';
import { EditQuestionComponent } from './quizGestion/editQuestion/editQuestion.component';

import { EditProfilComponent } from './Profil/editProfil/editProfil.component';
import { ListProfilComponent } from './Profil/listProfil/listProfil.component';
import { ViewProfilComponent } from './Profil/viewProfil/viewProfil.component';
import { CreateProfilComponent } from './Profil/createProfil/createProfil.component';

import { StatsComponent } from './stats/stats.component';
import { StatsGlobalesComponent } from './stats/statsGlobales/statsGlobales.component';
import { StatsPatientComponent } from './stats/statsPatient/statsPatient.component';
import { StatsQuizComponent } from './stats/statsQuiz/statsQuiz.component';
import { ViewQuizComponent } from './quizGestion/viewQuiz/viewQuiz.component';
import { AddThemeComponent } from './quizGestion/addTheme/addTheme.component';
import { TexteAdaptatifComponent } from './texteAdaptatif/texteAdaptatif.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TexteAdaptatifComponent,
    ComeBackComponent,

    // Jouer Quiz
    IndiceComponent,
    QuestionComponent,
    ReponseComponent,
    ListReponsesComponent,
    QuizComponent,
    ListQuizComponent,
    ChoixQuizComponent,

    // Création - Edition - Gestion des Quiz
    QuizGestionComponent,
    CreateQuizComponent,
    EditQuizComponent,
    AddQuestionComponent,
    EditQuizGlobalComponent,
    EditQuestionComponent,
    ViewQuizComponent,
    AddThemeComponent,

    // Profil
    EditProfilComponent,
    ListProfilComponent,
    ViewProfilComponent,
    CreateProfilComponent,

    // Stats
    StatsComponent,
    StatsGlobalesComponent,
    StatsPatientComponent,
    StatsQuizComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,

    FormsModule,
    AppRoutingModule,

    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }