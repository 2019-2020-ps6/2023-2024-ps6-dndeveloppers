import { BehaviorSubject } from 'rxjs';
import { Profil } from '../models/profil.model';
import { Injectable } from '@angular/core';
import { QuizService } from './quiz.service';
import { LISTE_PATIENT } from 'src/mocks/patient-list.mock';

@Injectable({
    providedIn: 'root'
  })

export class ProfilService {
    private profilList: Profil[] = LISTE_PATIENT;
    private actualProfil: Profil = LISTE_PATIENT[0];

    public profilList$: BehaviorSubject<Profil[]> = new BehaviorSubject(this.profilList);
    public actualProfil$: BehaviorSubject<Profil> = new BehaviorSubject(this.actualProfil);

    constructor(public quizService: QuizService) {}

    addProfil(profil: Profil) {
        this.profilList.push(profil);
        this.profilList$.next(this.profilList);
        console.log("Le profil ",profil.nom," ",profil.prenom," a été ajouté.");
    }

    deleteProfil(profil: Profil) {
        let newProfilList: Profil[] = [];
        for(let i=0;i<this.profilList.length;i++){
            if(this.profilList[i] != profil){
                newProfilList.push(this.profilList[i]);
            }
        }
        this.profilList = newProfilList;
        this.profilList$.next(this.profilList);
        console.log("Le profil ",profil.nom," ",profil.prenom," a été supprimé.");
    }

    selectProfil(profil: Profil){
        this.quizService.selectProfil(profil);

        for(let i=0;i<this.profilList.length;i++){
            if(this.profilList[i]==profil){
              this.actualProfil = this.profilList[i];
              this.actualProfil$.next(this.actualProfil);
              console.log("profil choisit : ",this.actualProfil);
              return;
            }
        }
        console.log("Problème sélection profil");
    }
}