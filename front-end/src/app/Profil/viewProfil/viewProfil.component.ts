import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ADMIN } from "src/mocks/profil.mock";
import { Profil } from "src/models/profil.model";
import { ProfilService } from "src/services/profil.service";

@Component({
    selector: 'app-viewProfil',
    templateUrl: './viewProfil.component.html',
    styleUrls: ['./viewProfil.component.scss']
})

export class ViewProfilComponent implements OnInit {
    @Input()
    typeView: String = "list"; // full = afficher entièrement le profil | list = afficher comme dans la listProfil (nom/prénom/photo) | play = pour choisir un joueur dans home

    @Input()
    profil: Profil = ADMIN;

    constructor(public profilService: ProfilService, private router: Router){}

    ngOnInit(): void {}

    selectProfil(profil:Profil){
        this.profilService.selectProfil(profil);
    }

    deleteProfil(profil:Profil){
        this.profilService.deleteProfil(profil);    
    }

    showProfil(profil:Profil){
        this.typeView="full";
    }

    stopShowProfil(profil:Profil){
        this.typeView="list";
    }

    editProfil(profil:Profil){
        this.router.navigate(['home/listProfil/editProfil/' + profil.nom + "-" + profil.prenom]);
        this.profilService.editingProfil(profil);
    }
}
