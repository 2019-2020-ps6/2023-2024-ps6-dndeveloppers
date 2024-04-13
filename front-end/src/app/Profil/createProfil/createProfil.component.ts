import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

import { Profil } from "src/models/profil.model";
import { ProfilService } from "src/services/profil.service";

@Component({
    selector: 'createProfil',
    templateUrl: './createProfil.component.html',
    styleUrls: ['./createProfil.component.scss']
})

export class CreateProfilComponent implements OnInit {

    public profilForm: FormGroup;
    public RoleList: String[] = ['patient','personnel'];
    public DayList: Number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    public MonthList: String[] = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    public FontSizeList: String[] = ['Petit', 'Moyen', 'Grand'];

    constructor(public formBuilder: FormBuilder, public profilService: ProfilService, private router: Router){
        //console.log("a");
        this.profilForm = this.formBuilder.group({
            nom: [''],
            prenom: [''],
            role: [''],
            
            jour: [],
            mois:[],
            annee:[],

            optionPhoto: [false],
            optionIndice: [false],

            optionSupprimerMauvaisesReponses: [false],
            optionReposerQuestionApres: [false],

            optionTailleTexte: ['Moyen'],
        });
    }

    ngOnInit(): void {}

    addProfil(){
        const profilToCreate: Profil = this.profilForm.getRawValue() as Profil;
        if(this.profilForm.getRawValue().jour!=undefined && this.profilForm.getRawValue().mois!=undefined && this.profilForm.getRawValue().annee!=undefined){
        
            profilToCreate.dateNaissance = [
                this.profilForm.getRawValue().jour,
                this.MonthList.lastIndexOf(this.profilForm.getRawValue().mois)+1,
                this.profilForm.getRawValue().annee
            ];
        }

        console.log("add profil ", profilToCreate);
        this.profilService.addProfil(profilToCreate);
        this.router.navigate(['home/listProfil/']); 
    }

    return(){
        this.router.navigate(['home/listProfil/']);
    }
}