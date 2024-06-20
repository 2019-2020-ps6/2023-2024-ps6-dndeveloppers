import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-editQuizGlobal',
    templateUrl: './editQuizGlobal.component.html',
    styleUrls: ['./editQuizGlobal.component.scss']
})

export class EditQuizGlobalComponent implements OnInit {

    public quizGlobalForm : FormGroup;
    public editQuiz: Quiz | undefined;
    public themeList : String[] = [];
    public photo : string = "";

    constructor(public quizService: QuizService, public formBuilder: FormBuilder,){
        this.quizService.editedQuiz$.subscribe( (editQuiz) => {
            this.editQuiz = editQuiz;
            if(this.editQuiz.photo != undefined && this.editQuiz.photo != "none"){
                this.photo = this.editQuiz.photo;
            }
        })

        this.quizGlobalForm = this.formBuilder.group({
            nom: [this.editQuiz?.name],
            theme: [this.editQuiz?.theme],
        });

        this.quizService.themeList$.subscribe( (themeList) => {
            this.themeList = themeList;
        })
    }

    ngOnInit(): void {}

    editGlobalQuiz(){
        let valeurs: string[] = [this.quizGlobalForm.value.nom,this.quizGlobalForm.value.theme];
        if(this.photo != ""){
            valeurs.push(this.photo);
        }
        else {
            valeurs.push("none");
        }
        console.log("valeurs : ",valeurs);
        this.quizService.editGlobalQuiz(valeurs);
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
}