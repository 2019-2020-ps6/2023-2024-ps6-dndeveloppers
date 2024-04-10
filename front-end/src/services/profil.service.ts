import { BehaviorSubject } from 'rxjs';
import { Profil } from '../models/profil.model';
import { Injectable } from '@angular/core';
import { PROFIL_LIST } from '../mocks/profil-list.mock';

@Injectable({
    providedIn: 'root'
  })

export class ProfilService {
    private profilList: Profil[] = PROFIL_LIST;
    private actualProfil: Profil = PROFIL_LIST[0];

    public profilList$: BehaviorSubject<Profil[]> = new BehaviorSubject(PROFIL_LIST);
    public actualProfil$: BehaviorSubject<Profil> = new BehaviorSubject(PROFIL_LIST[0]);

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