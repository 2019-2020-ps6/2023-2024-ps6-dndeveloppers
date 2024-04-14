import { Component, Input, OnInit } from "@angular/core";
import { ProfilService } from "src/services/profil.service";

@Component({
    selector: 'app-texteAdaptatif',
    templateUrl: './texteAdaptatif.component.html',
    styleUrls: ['./texteAdaptatif.component.scss']
})

export class TexteAdaptatifComponent implements OnInit {
    @Input()
    texte : String = '';

    public taille : number | undefined;
    public  fontSize : string | undefined;

    constructor(public profilService: ProfilService){
        this.profilService.actualProfil$.subscribe((profil) => {
            if(profil.optionTailleTexte == "Petit"){
                this.taille = 1;
            }
            else if(profil.optionTailleTexte == "Moyen"){
                this.taille = 1.2;
            }
            else {
                this.taille = 1.5;
            }
            this.fontSize = this.taille + "em";
        })
    }

    ngOnInit(): void {}
}