import { Component, OnInit } from "@angular/core";
import { Profil } from "src/models/profil.model";
import { ProfilService } from "src/services/profil.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { ADMIN, PROFIL_NULL } from "src/mocks/profil.mock";
import { STATS_PATIENT_INIT } from "src/mocks/statsMocks/stats-patient.mock";


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

    photo : string = "";

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
            
            mois:[this.setMonth()],
            annee:[this.profilEditing?.dateNaissance?.[2]],

            optionPhoto: [this.profilEditing?.optionPhoto],
            optionIndice: [this.profilEditing?.optionIndice],

            optionSupprimerMauvaisesReponses: [this.profilEditing?.optionSupprimerMauvaisesReponses],
            optionReposerQuestionApres: [this.profilEditing?.optionReposerQuestionApres],

            optionTimeReponse: [this.profilEditing?.optionTempsReponse],
            optionSkip: [this.profilEditing?.optionSkipQuestion],
            optionTailleTexte: [this.profilEditing?.optionTailleTexte],
            
        });
    }

    ngOnInit(): void {
        this.photo = this.profilInital.photo;
    }

    setMonth(): String{
        if(this.profilEditing?.dateNaissance?.[1] != undefined){
            return this.MonthList[this.profilEditing?.dateNaissance?.[1]-1];
        }
        return 'janvier'
    }

    updateProfil(){
        const profilToCreate: Profil = JSON.parse(JSON.stringify(PROFIL_NULL));
        profilToCreate.nom = this.profilForm.getRawValue().nom;
        profilToCreate.prenom = this.profilForm.getRawValue().prenom;
        profilToCreate.role = this.profilForm.getRawValue().role;

        if(this.profilForm.getRawValue().jour!=undefined && this.profilForm.getRawValue().mois!=undefined && this.profilForm.getRawValue().annee!=undefined){
            profilToCreate.dateNaissance = [
                parseInt(this.profilForm.getRawValue().jour, 10) ,
                this.MonthList.lastIndexOf(this.profilForm.getRawValue().mois)+1,
                this.profilForm.getRawValue().annee
            ];
        }
        else {
            profilToCreate.dateNaissance = [0,0,0]
        }

        if(this.profilForm.value.photo != undefined){
            let path : String = this.profilForm.value.photo;
            var spliter = path.split('\\');
            let bon_path : string = spliter[spliter.length-1];
            console.log(bon_path);
            profilToCreate.photo = "./assets/imageProfil/"+bon_path; 
        }

        profilToCreate.optionTailleTexte = this.profilForm.getRawValue().optionTailleTexte,
        profilToCreate.optionIndice = this.profilForm.getRawValue().optionIndice,
        profilToCreate.optionPhoto = this.profilForm.getRawValue().optionPhoto,
        profilToCreate.optionTempsReponse = this.profilForm.getRawValue().optionTimeReponse,

        profilToCreate.optionSupprimerMauvaisesReponses = this.profilForm.getRawValue().optionSupprimerMauvaisesReponses,
        profilToCreate.optionReposerQuestionApres = this.profilForm.getRawValue().optionReposerQuestionApres,
        profilToCreate.optionSkipQuestion = this.profilForm.getRawValue().optionSkip,
        
        profilToCreate.selfStats = JSON.parse(JSON.stringify(STATS_PATIENT_INIT));
        profilToCreate.id = this.profilEditing?.id;

        if(this.photo != ""){
            profilToCreate.photo = this.photo; 
        }
        

        console.log("add profil ", profilToCreate);
        this.profilService.updateProfil(profilToCreate);
        this.router.navigate(['home/listProfil/']); 
    }

    handleEvent(event: string) {
        console.log("ok");
        this.photo = event;
        console.log(event.length)
        console.log(this.photo.length)
      }

    unicity(event: any) {
        const options = document.getElementsByClassName("unparalleled");
        for (let i=0; i<options.length; i++) {
            if ((options[i] as HTMLInputElement) != event.target) {
                (options[i] as HTMLInputElement).checked = false;
            }
        }
    }  
}