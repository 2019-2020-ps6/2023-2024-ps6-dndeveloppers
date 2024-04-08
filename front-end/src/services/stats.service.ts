import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class StatsService {

    /*
     * Pour les statistiques globales
     */

    private patientNumber: number = 0;
    private quizNumber: number = 0;
    private quizDone: number = 0;
    private quizDonePerPerson: number[] = [];

    public patientNumber$: BehaviorSubject<number> = new BehaviorSubject(this.patientNumber);
    public quizNumber$: BehaviorSubject<number> = new BehaviorSubject(this.quizNumber);
    public quizDone$: BehaviorSubject<number> = new BehaviorSubject(this.quizDone);
    public meanQuizPerPerson$: BehaviorSubject<number> = new BehaviorSubject(this.meanQuizDonePerPerson(this.quizDonePerPerson));

    meanQuizDonePerPerson(quizDonePerPerson: number[]) {
        let num = 0;
        for (let i=0; i<quizDonePerPerson.length; i++) {
            num += quizDonePerPerson[i];
        }
        return num/quizDonePerPerson.length;
    }

    /*
     * Pour les statistiques par quiz
     */

    private playedTime: number = 0;
    private meanScore: number = 0;
    private meanHintUsed: number = 0;
    private achievedPercentPerQuestion: number[] = [];
    private questionNumberPerType: number[] = [0,0,0];

    public playedTime$: BehaviorSubject<number> = new BehaviorSubject(this.playedTime);
    public meanScore$: BehaviorSubject<number> = new BehaviorSubject(this.meanScore);
    public meanHintUsed$: BehaviorSubject<number> = new BehaviorSubject(this.meanHintUsed);
    public achievedPercentPerQuestion$: BehaviorSubject<number[]> = new BehaviorSubject(this.achievedPercentPerQuestion);
    public questionNumberPerType$: BehaviorSubject<number[]> = new BehaviorSubject(this.questionNumberPerType);
  }