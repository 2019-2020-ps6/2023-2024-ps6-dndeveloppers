import { Component, OnInit } from "@angular/core";
import { PROFIL0 } from "src/mocks/profil-list.mock";
import { Profil } from "src/models/profil.model";
import { ProfilService } from "src/services/profil.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    profil: Profil = PROFIL0;;

    constructor(public profilService: ProfilService){
        this.profilService.actualProfil$.subscribe((profil) => {
            this.profil = profil;
          });
    }

    ngOnInit(): void {}
}