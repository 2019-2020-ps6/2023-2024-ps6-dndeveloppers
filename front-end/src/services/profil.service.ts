import { BehaviorSubject } from 'rxjs';
import { Profil } from '../models/profil.model';
import { Injectable } from '@angular/core';
import { QuizService } from './quiz.service';
import { LISTE_PROFILS } from 'src/mocks/profil-list.mock';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
    providedIn: 'root'
})

export class ProfilService {
    private profilList: Profil[] = LISTE_PROFILS;
    private actualProfil: Profil = LISTE_PROFILS[0];
    private actualEditingProfil: Profil = LISTE_PROFILS[0];
    private profilUrl: string = serverUrl + '/profils';
    private httpOptions = httpOptionsBase;

    public profilList$: BehaviorSubject<Profil[]> = new BehaviorSubject(this.profilList);
    public actualProfil$: BehaviorSubject<Profil> = new BehaviorSubject(this.actualProfil);
    public actualEditingProfil$: BehaviorSubject<Profil> = new BehaviorSubject(this.actualEditingProfil);

    constructor(public quizService: QuizService, private http: HttpClient) {
        this.retrievesProfils();
        
    }

    retrievesProfils(): void {
        this.http.get<Profil[]>(this.profilUrl).subscribe((profilList) => {
            this.profilList = profilList;
            for (let i=0; i<this.profilList.length-1; i++) {
                let minIndex = i;
                for (let j=i; j<this.profilList.length; j++) {
                    if (this.profilList[j].nom.localeCompare(this.profilList[minIndex].nom) < 0) {
                        minIndex = j;
                    }
                }
    
                if (minIndex != i) {
                    const tmp = this.profilList[i];
                    this.profilList[i] = this.profilList[minIndex];
                    this.profilList[minIndex] = tmp;
                }
            }
            this.profilList$.next(this.profilList);
            console.log("Profils récupérés");
        })
    }

    addProfil(profil: Profil): void {
        this.http.post<Profil>(this.profilUrl, profil, this.httpOptions).subscribe(() => this.retrievesProfils());
    }

    deleteProfil(profil: Profil): void {
        console.log("Le profil : " ,profil.id, " a été supprimé");
        const urlWithId = this.profilUrl + '/:' + profil.id;
        this.http.delete<Profil>(urlWithId, this.httpOptions).subscribe(() => this.retrievesProfils());
      }

    selectProfil(profil: Profil) {
        this.quizService.selectProfil(profil);
        this.quizService.resetInfoQuiz();

        for (let i = 0; i < this.profilList.length; i++) {
            if (profil == LISTE_PROFILS[0]) {
                if (this.profilList[i].role == "admin") {
                    this.actualProfil = this.profilList[i];
                    this.actualProfil$.next(this.actualProfil);
                    console.log("Administrateur authentifié");
                    return;
                }
            }
            if (this.profilList[i] == profil) {
                this.actualProfil = this.profilList[i];
                this.actualProfil$.next(this.actualProfil);
                return;
            }
        }
        console.log("Problème sélection profil");
    }

    editingProfil(profil: Profil) {
        this.actualEditingProfil = profil;
        this.actualEditingProfil$.next(this.actualEditingProfil);
        console.log("Profil : ", profil, " en cours d'édition.");
    }

    updateProfil(profil: Profil) {
        console.log("Le profil : " ,profil.id, " a été mise à jour");
        const urlWithId = this.profilUrl + '/:' + profil.id;
        const urlWithIdStats = serverUrl + '/stats' + '/:' + profil.id;
        this.http.put<Profil>(urlWithIdStats, profil ,this.httpOptions);
        this.http.put<Profil>(urlWithId, profil ,this.httpOptions).subscribe(() => this.retrievesProfils());
    }
}
