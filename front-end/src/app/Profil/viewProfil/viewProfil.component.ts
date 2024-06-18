import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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

    public worstQuiz = "";

    constructor(private route: ActivatedRoute, private router: Router, public profilService: ProfilService) {}//, public statsPatient: StatsPatientComponent, public statsQuiz: StatsQuizComponent){}

    ngOnInit(): void {}

   

    selectProfil(profil:Profil){
        this.profilService.selectProfil(profil);
        this.getWorstQuiz(profil);
        this.router.navigate(['home/listQuiz']);
    }

    deleteProfil(profil:Profil){
        this.profilService.deleteProfil(profil);    
    }

    profilShow(str: String) {
        this.typeView=str;
        console.log(this.profil);
        this.getWorstQuiz(this.profil);
    }

    editProfil(profil:Profil){
        this.router.navigate(['home/listProfil/editProfil/' + profil.nom + "-" + profil.prenom]);
        this.profilService.editingProfil(profil);
    }

    birthDayOk(){
        if(this.profil.dateNaissance != undefined && this.profil.dateNaissance.length == 3){
            if(this.profil.dateNaissance[0] != 0 && this.profil.dateNaissance[1] != 0 && this.profil.dateNaissance[2] != 0){
                return true;
            }
        }
        return false
    }

    getWorstQuiz(profil: Profil) {
        let worstQuizIndice = 0;
        for (let i=0; i<profil.selfStats.quizRes.length; i++) {
            if (profil.selfStats.quizRes[i] < profil.selfStats.quizRes[worstQuizIndice]) {
                worstQuizIndice = i;
            }
        }
        this.worstQuiz = profil.selfStats.quizDone[worstQuizIndice];
    }

    seeStats(profil: Profil, worstQuiz: string) {
        this.router.navigate(['/home/stats'], {
            queryParams: { 
                nom: profil.nom,
                quiz: worstQuiz
            }
        });
    }
    
}
