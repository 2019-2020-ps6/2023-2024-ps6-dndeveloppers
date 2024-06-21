import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Question_Model, Indice_Model} from "src/mocks/quiz-list.mock";
import { Answer_Model } from "src/mocks/quiz-list.mock";
import { Answer, Question } from "src/models/question.models";
import { QuizService } from "src/services/quiz.service";


@Component({
    selector: 'app-addQuestion',
    templateUrl: './addQuestion.component.html',
    styleUrls: ['./addQuestion.component.scss']
})

export class AddQuestionComponent implements OnInit {

    public questionForm : FormGroup;

    public indicesNum: boolean[] = [true, true, true];
    photo : string = "";


    constructor(public formBuilder: FormBuilder, public quizService: QuizService){
        this.questionForm = this.formBuilder.group({
            label: [''],
            q1: [''],
            q2: [''],
            q3: [''],
            q4: [''],
            i1: [''],
            i2: [''],
            i3: [''],
            goodAnswer: [0],
            photoTexte: [],
        });
    }

    @Input()
    nbIndice: boolean[] = this.indicesNum;

    ngOnInit(): void {
        const firstCheckbox = document.getElementById("r1") as HTMLInputElement;
        firstCheckbox.checked = true;
        this.questionForm.patchValue({
            goodAnswer: 0
        })
    }

    addQuestion(){
        let question : Question = JSON.parse(JSON.stringify(Question_Model));       
        question.label = this.questionForm.value.label;

        // réponses
        let answer1 : Answer = JSON.parse(JSON.stringify(Answer_Model));
        answer1.value = this.questionForm.value.q1;
        answer1.isCorrect = false;

        let answer2 : Answer = JSON.parse(JSON.stringify(Answer_Model));
        answer2.value = this.questionForm.value.q2;
        answer2.isCorrect = false;

        let answer3 : Answer = JSON.parse(JSON.stringify(Answer_Model));
        answer3.value = this.questionForm.value.q3;
        answer3.isCorrect = false;

        let answer4 : Answer = JSON.parse(JSON.stringify(Answer_Model));
        answer4.value = this.questionForm.value.q4;
        answer4.isCorrect = false;

        question.answers = [answer1 , answer2 , answer3, answer4];       
        question.answers[this.questionForm.value.goodAnswer].isCorrect = true;

        question.indice = [];
        let indice = JSON.parse(JSON.stringify(Indice_Model));
        if(this.questionForm.value.i1 != "" && this.questionForm.value.i1 != " "){
            indice.value = this.questionForm.value.i1;
            question.indice.push(indice);
        }
        if(this.questionForm.value.i2 != "" && this.questionForm.value.i2 != " "){
            indice.value = this.questionForm.value.i2;
            question.indice.push(indice);
        }
        if(this.questionForm.value.i3 != "" && this.questionForm.value.i3 != " "){
            indice.value = this.questionForm.value.i3;
            question.indice.push(indice);
        }    
        
        // photo
        if(this.photo != "" && this.questionForm.value.photoTexte != null && this.questionForm.value.photoTexte != "none" && this.questionForm.value.photoTexte != ""){
            question.optionImageLien = this.photo,
            question.optionImageQuestion = this.questionForm.value.photoTexte;
        }
        else {
            question.optionImageLien = "none"
            question.optionImageQuestion = "none"
        }

        console.log("question : ",question)
        this.quizService.addQuestion(question);
        this.questionForm.reset();
        this.questionForm.patchValue({
            label: '',
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            i1: '',
            i2: '',
            i3: '',
            photoTexte: null,
            goodAnswer: 0
        });
    }

    selectResponseNumber(event: Event, responseNumber: number) {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                const checkboxes = document.getElementsByClassName("r");
                for (let i=0; i<checkboxes.length; i++) {
                    if (checkboxes[i] != event.target) {
                        (checkboxes[i] as HTMLInputElement).checked = false;
                    }
                }
            } else {
                event.target.checked = true;
            }
        }
        this.questionForm.patchValue({
            goodAnswer: responseNumber
        })
    }

    handleEvent(event: string) {
        if(event == undefined) {
            this.photo = "";
            return ;
        }
        this.photo = event;
        console.log(event.length)
        console.log(this.photo.length)
    }
}