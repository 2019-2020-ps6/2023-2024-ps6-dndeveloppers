import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { httpOptionsBase, serverUrl } from 'src/configs/server.config';
import { QUIZ_LIST, QUIZ_NULL } from 'src/mocks/quiz-list.mock';
import { Profil } from 'src/models/profil.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from './quiz.service';
import { InfoQuiz } from 'src/models/infoQuiz.model';
import { statsQuiz } from 'src/models/stats/statsQuiz.model';

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    

    /*
     * Pour les statistiques par patient
     */

    private listePatient: Profil[] = [];
    
    private series = [];
    private profilURL: string = serverUrl + '/profils';
    private httpOptions = httpOptionsBase;

    public listePatient$: BehaviorSubject<Profil[]> = new BehaviorSubject(this.listePatient);
    public series$: BehaviorSubject<any> = new BehaviorSubject(this.series);

    constructor(private http: HttpClient) {
      this.retrievePatients();
      this.http.get<Quiz[]>(serverUrl + '/quiz').subscribe((quizzes) => {
        this.fillSeries(quizzes)
      })
    }

    retrievePatients() {
      this.http.get<Profil[]>(this.profilURL).subscribe((profilList) => {
        let listeProfils = profilList;
        this.listePatient = [];
        for (let i=0; i<listeProfils.length; i++) {
          if (listeProfils[i].role == "patient") {
            this.listePatient.push(listeProfils[i]);
          }
        }
        this.listePatient$.next(this.listePatient);
      })
      return this.listePatient;
    }

    fillSeries(quizzes : Quiz[]) {
      let res = [];
      
      for (let i=0; i<quizzes.length; i++) {
          let name = quizzes[i].name;
          let data: number[] = [];
          let tab = {
              name: name,
              data: data
          }
          res.push(tab);
      }
      return res;
    }

    patientScoreNewData(profil: Profil, score: number) {
      profil.selfStats.nbQuizDone++;
      profil.selfStats.quizRes.push(score*100);

      let num = 0;
      for (let i=0; i<profil.selfStats.quizRes.length; i++) {
        num += profil.selfStats.quizRes[i];
      }
      profil.selfStats.meanScore = num/profil.selfStats.quizRes.length;
      this.updatePatientStats(profil);
    }

    updatePatientStats(profil: Profil) {
      console.log("Les stats du profil : ", profil.id, " ont été mise à jour");
      const urlWithIdStats = serverUrl + '/stats' + '/:' + profil.selfStats.id;
      this.http.put<Profil>(urlWithIdStats, profil.selfStats ,this.httpOptions).subscribe(() => this.retrievePatients());
    }

    /*
     * Pour les statistiques par quiz
     */

    // à la fin d'un quiz on met ses stats à jour 
    updateQuizStats(infoQuiz : InfoQuiz, chosenQuizStats : statsQuiz){
      chosenQuizStats.playedTime++;

      // update nb indice et moyenne d'indices : 
      chosenQuizStats.nbHintUsed.push(infoQuiz.nbHintUsed)
      let nbHint = 0;
      for (let i=0; i<chosenQuizStats.nbHintUsed.length; i++) {
        nbHint += chosenQuizStats.nbHintUsed[i];
      }
      chosenQuizStats.meanHintUsed = nbHint / chosenQuizStats.nbHintUsed.length;

      // update score moyen 
      chosenQuizStats.resTab.push(infoQuiz.actualScore / infoQuiz.scoreForEachQuestion.length)
      let nbScore = 0;
      for (let i=0; i<chosenQuizStats.resTab.length; i++) {
        nbScore += chosenQuizStats.resTab[i];
      }
      chosenQuizStats.meanScore = nbScore / chosenQuizStats.resTab.length;

      // update moyenne pour chaque question
      for(let i=0; i< infoQuiz.scoreForEachQuestion.length;i++){
        let score = infoQuiz.scoreForEachQuestion.at(0);
        if(score != undefined){
          if(chosenQuizStats.successPercentageByQuestion.length <= i){ // cas stats pour question nouvelle
            chosenQuizStats.successPercentageByQuestion.push(score)
          }
          else{ // cas normal
            chosenQuizStats.successPercentageByQuestion[i] = (score*(chosenQuizStats.playedTime-1) + score)/ chosenQuizStats.playedTime;
          }
        }
        
      }
      return chosenQuizStats
    }
}