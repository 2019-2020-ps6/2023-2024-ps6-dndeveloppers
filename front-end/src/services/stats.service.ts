import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class StatsService {


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
  }