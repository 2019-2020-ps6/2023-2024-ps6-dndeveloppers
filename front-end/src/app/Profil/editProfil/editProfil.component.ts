import { Component, OnInit } from "@angular/core";
import { Profil } from "src/models/profil.model";
import { ProfilService } from "src/services/profil.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { ADMIN } from "src/mocks/profil.mock";


@Component({
    selector: 'editProfil',
    templateUrl: './editProfil.component.html',
    styleUrls: ['./editProfil.component.scss']
})

export class EditProfilComponent implements OnInit {
    public profilEditing: Profil | undefined;
    public profilInital: Profil = ADMIN;

    public profilForm: FormGroup;
    public RoleList: String[] = ['patient','personnel'];
    public DayList: Number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    public MonthList: String[] = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    public FontSizeList: String[] = ['Petit', 'Moyen', 'Grand'];

    public initialMonth: String = 'janvier';

    constructor(public formBuilder: FormBuilder,public profilService: ProfilService, public router: Router){
        this.profilService.actualEditingProfil$.subscribe((profilEditing) => {
            this.profilEditing = profilEditing;
            this.profilInital = profilEditing;
            if(this.profilEditing?.dateNaissance?.[1]!= undefined){
                this.initialMonth = this.MonthList[this.profilEditing?.dateNaissance?.[1]-1];
            }
             
        });

        this.profilForm = this.formBuilder.group({
            nom: [this.profilEditing?.nom],
            prenom: [this.profilEditing?.prenom],
            role: [this.profilEditing?.role],
            
            jour: [this.profilEditing?.dateNaissance?.[0]],
            mois:[this.initialMonth],
            annee:[this.profilEditing?.dateNaissance?.[2]],

            optionPhoto: [this.profilEditing?.optionPhoto],
            optionIndice: [this.profilEditing?.optionIndice],

            optionSupprimerMauvaisesReponses: [this.profilEditing?.optionSupprimerMauvaisesReponses],
            optionReposerQuestionApres: [this.profilEditing?.optionReposerQuestionApres],

            optionTailleTexte: [this.profilEditing?.optionTailleTexte],
            
        });
    }

    ngOnInit(): void {}

    updateProfil(){
        const profilToCreate: Profil = this.profilForm.getRawValue() as Profil;
        if(this.profilForm.getRawValue().jour!=undefined && this.profilForm.getRawValue().mois!=undefined && this.profilForm.getRawValue().annee!=undefined){
        
            profilToCreate.dateNaissance = [
                this.profilForm.getRawValue().jour,
                this.MonthList.lastIndexOf(this.profilForm.getRawValue().mois)+1,
                this.profilForm.getRawValue().annee
            ];
        }

        console.log("add profil ", profilToCreate);
        this.profilService.updateProfil(this.profilInital,profilToCreate);
        this.router.navigate(['home/listProfil/']); 
    }
}