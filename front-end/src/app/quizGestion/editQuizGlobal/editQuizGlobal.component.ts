import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-editQuizGlobal',
    templateUrl: './editQuizGlobal.component.html',
    styleUrls: ['./editQuizGlobal.component.scss']
})

export class EditQuizGlobalComponent implements OnInit {

    public quizGlobalForm : FormGroup;

    public themeList : String[] = [];

    constructor(public quizService: QuizService, public formBuilder: FormBuilder,){
        this.quizGlobalForm = this.formBuilder.group({
            nom: [''],
            theme: [''],
            photo: []
        });

        this.quizService.themeList$.subscribe( (themeList) => {
            this.themeList = themeList;
        })
    }

    @Input()
    nom: String = '';

    @Input()
    theme: String = '';

    ngOnInit(): void {}

    editGlobalQuiz(){
        let valeurs: string[] = [this.quizGlobalForm.value.nom,this.quizGlobalForm.value.theme];
        if(this.quizGlobalForm.value.photo !== null){
            let path : String = this.quizGlobalForm.value.photo;
            var spliter = path.split('\\');
            let bon_path : string = spliter[spliter.length-1];
            valeurs.push("./assets/quiz/"+bon_path); 
        }
        console.log("valeurs : ",valeurs)
        this.quizService.editGlobalQuiz(valeurs);
    }
}