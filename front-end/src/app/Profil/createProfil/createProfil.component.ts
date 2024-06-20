import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { PROFIL_NULL } from "src/mocks/profil.mock";
import { STATS_PATIENT_INIT } from "src/mocks/statsMocks/stats-patient.mock";
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
    public photo : string = "";

    constructor(private router: Router, public formBuilder: FormBuilder, public profilService: ProfilService){
        this.profilForm = this.formBuilder.group({
            nom: [''],
            prenom: [''],
            role: [''],
            
            jour: [],
            mois:[],
            annee:[],

            optionPhoto: [false],
            optionIndice: [true],

            optionSupprimerMauvaisesReponses: [true],
            optionReposerQuestionApres: [false],

            optionTailleTexte: ['Moyen'],
            optionSkip: [true],
            optionTimeReponse: [3],
        });
    }

    ngOnInit(): void {}

    async addProfil(){
        const profilToCreate: Profil = JSON.parse(JSON.stringify(PROFIL_NULL));
        
        profilToCreate.nom = this.profilForm.getRawValue().nom;
        profilToCreate.prenom = this.profilForm.getRawValue().prenom;
        profilToCreate.role = this.profilForm.getRawValue().role;

        if(this.profilForm.getRawValue().jour!=undefined && this.profilForm.getRawValue().mois!=undefined && this.profilForm.getRawValue().annee!=undefined){
            profilToCreate.dateNaissance = [
                parseInt(this.profilForm.getRawValue().jour,10),
                this.MonthList.lastIndexOf(this.profilForm.getRawValue().mois)+1,
                this.profilForm.getRawValue().annee
            ];
        }
        else {
            profilToCreate.dateNaissance = [0,0,0];
        }

        profilToCreate.selfStats = JSON.parse(JSON.stringify(STATS_PATIENT_INIT));
        profilToCreate.optionTempsReponse = this.profilForm.getRawValue().optionTimeReponse;
        profilToCreate.optionTailleTexte = this.profilForm.getRawValue().optionTailleTexte;

        profilToCreate.optionIndice = this.profilForm.getRawValue().optionIndice;
        profilToCreate.optionPhoto = this.profilForm.getRawValue().optionPhoto;
        profilToCreate.optionSupprimerMauvaisesReponses = this.profilForm.getRawValue().optionSupprimerMauvaisesReponses;
        profilToCreate.optionReposerQuestionApres = this.profilForm.getRawValue().optionReposerQuestionApres;
        profilToCreate.optionSkipQuestion = this.profilForm.getRawValue().optionSkip;

        if(this.photo != ""){
            profilToCreate.photo = this.photo; 
            console.log("add profil ", profilToCreate);
            this.profilService.addProfil(profilToCreate);
            this.router.navigate(['home/listProfil/']); 
        }
        else {
            const reader = new FileReader();

            reader.readAsDataURL(await this.createFile());
            reader.onload = () => {
                profilToCreate.photo = reader.result as string;
                console.log("add profil ", profilToCreate);
                this.profilService.addProfil(profilToCreate);
                this.router.navigate(['home/listProfil/']); 
            };
        }


    }

    getFontSizeValue(): number {
        const sizeControl = this.profilForm.get('optionTailleTexte');
        const size = sizeControl ? sizeControl.value : 'Moyen';
        switch(size) {
            case 'Petit': return 1;
            case 'Moyen': return 1.2;
            case 'Grand': return 1.5;
            default: return 1.2;
        }
    }

    return(){
        this.router.navigate(['home/listProfil/']);
    }

    handleEvent(event: string) {
        if(event == undefined) {
            this.photo = "";
            return ;
        }
        this.photo = event;
        console.log(event.length);
        console.log(this.photo.length);
    }

    async createFile(){
        let response = await fetch("./assets/imageProfil/default.png");
        let data = await response.blob();
        let metadata = {
          type: 'image/png'
        };
        let file = new File([data], "test.jpg", metadata);
        return file;
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