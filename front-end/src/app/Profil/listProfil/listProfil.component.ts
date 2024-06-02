import { Component, OnInit } from "@angular/core";
import { Profil } from "src/models/profil.model";
import { ProfilService } from "src/services/profil.service";

@Component({
    selector: 'listProfil',
    templateUrl: './listProfil.component.html',
    styleUrls: ['./listProfil.component.scss']
})

export class ListProfilComponent implements OnInit {
    profilList: Profil[] = [];
    public searchTermPatient: string = '';
    public searchTermPersonnel: string = '';


    constructor(public profilService: ProfilService){
        this.profilService.profilList$.subscribe((profilList) => {
            this.profilList = profilList;
          });
    }

    ngOnInit(): void {}

    filterProfilsPatient() {
        if (this.searchTermPatient) {
            return this.profilList.filter(profil => 
                profil.nom.toLowerCase().includes(this.searchTermPatient.toLowerCase()) ||
                profil.prenom.toLowerCase().includes(this.searchTermPatient.toLowerCase())
            );
        } else {
            return this.profilList;
        }
    }

    filterProfilsPersonnel() {
        if (this.searchTermPersonnel) {
            return this.profilList.filter(profil => 
                profil.nom.toLowerCase().includes(this.searchTermPersonnel.toLowerCase()) ||
                profil.prenom.toLowerCase().includes(this.searchTermPersonnel.toLowerCase())
            );
        } else {
            return this.profilList;
        }
    }
}