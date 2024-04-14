import { Component, OnInit } from "@angular/core";
import { Profil } from "src/models/profil.model";
import { ProfilService } from "src/services/profil.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    public profilList: Profil[] = [];
    public showProfil: boolean = false;

    constructor(public profilService: ProfilService){
        this.profilService.profilList$.subscribe((profilList) => {
            this.profilList = profilList;
          });
    }

    ngOnInit(): void {}

    choixProfil(){
        this.showProfil = !this.showProfil;
    }
    
}