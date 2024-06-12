import { Component, OnInit } from "@angular/core";
import { ADMIN } from "src/mocks/profil.mock";
import { Profil } from "src/models/profil.model";
import { ProfilService } from "src/services/profil.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    profil: Profil = ADMIN;

    constructor(public profilService: ProfilService){
        this.profilService.actualProfil$.subscribe((profil) => {
            this.profil = profil;
          });
    }

    ngOnInit(): void {}
}