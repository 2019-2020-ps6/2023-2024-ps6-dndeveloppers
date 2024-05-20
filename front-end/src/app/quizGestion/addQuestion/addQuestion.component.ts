import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Question_Model, Indice_Model1, Indice_Model2, Indice_Model3} from "src/mocks/quiz-list.mock";
import { Indice } from "src/models/question.models";
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

    constructor(public formBuilder: FormBuilder, public quizService: QuizService){
        this.questionForm = this.formBuilder.group({
            label: ['Question'],
            q1: ['Réponse 1'],
            q2: ['Réponse 2'],
            q3: ['Réponse 3'],
            q4: ['Réponse 4'],
            i1: ['indice 1'],
            i2: ['indice 2'],
            i3: ['indice 3'],
            goodAnswer: [0]
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
        console.log("numéro : ",this.questionForm.value.goodAnswer); 
        question.answers[this.questionForm.value.goodAnswer].isCorrect = true;
        question.questionTexte = true;
        question.questionImage = false;

        let indice1 : Indice = Indice_Model1;
        indice1.value = this.questionForm.value.i1;

        let indice2 : Indice = Indice_Model2;
        indice2.value = this.questionForm.value.i2;

        let indice3 : Indice = Indice_Model3;
        indice3.value = this.questionForm.value.i3;

        question.indice = [indice1, indice2, indice3];

        console.log("question : ",question)
        this.quizService.addQuestion(question);
    }

    selectResponseNumber(event: Event, responseNumber: number) {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach((checkbox: Element) => {
                    if (checkbox != event.target) {
                        (checkbox as HTMLInputElement).checked = false;
                    }
                })
            } else {
                event.target.checked = true;
            }
        }
        this.questionForm.patchValue({
            goodAnswer: responseNumber
        })
    }
      
    addIndice() {
        for (let i=0; i<this.indicesNum.length; i++) {
            if (this.indicesNum[i] == false) {
                this.indicesNum[i] = true;
                break;
            }
        }
    }

    deleteIndice() {
        for (let i=this.indicesNum.length-1; i>=0; i--) {
            if (this.indicesNum[i] == true) {
                this.indicesNum[i] = false;
                break;
            }
        }
    }
}