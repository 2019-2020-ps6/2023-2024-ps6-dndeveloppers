import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Question } from "src/models/question.models";
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
            theme: ['']
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
        this.quizService.editGlobalQuiz(valeurs);
    }
}