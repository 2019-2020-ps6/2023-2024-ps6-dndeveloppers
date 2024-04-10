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

    constructor(public profilService: ProfilService){
        this.profilService.profilList$.subscribe((profilList) => {
            this.profilList = profilList;
          });
    }

    ngOnInit(): void {}
}