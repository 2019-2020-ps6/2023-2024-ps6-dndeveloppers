import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Question_Model, Indice_Model1, Indice_Model2, Indice_Model3 } from "src/mocks/quiz-list.mock";
import { Indice } from "src/models/question.models";
import { Answer_Model } from "src/mocks/quiz-list.mock";
import { Answer, Question } from "src/models/question.models";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-editQuestion',
    templateUrl: './editQuestion.component.html',
    styleUrls: ['./editQuestion.component.scss']
})

export class EditQuestionComponent implements OnInit {

    public questionForm : FormGroup;

    public answers: String[] = ['','','',''];
    public indice: String[] = ['','',''];
    public indicesNum: boolean[] = [true, true, true];
    public numberGoodAnswer = 0;
    public texteImage: String = '';

    constructor(public formBuilder: FormBuilder, public quizService: QuizService){
        this.questionForm = this.formBuilder.group({
            label: [this.question?.label],
            q1: [this.question?.answers[0].value],
            q2: [this.question?.answers[1].value],
            q3: [this.question?.answers[2].value],
            q4: [this.question?.answers[3].value],
            i1: [this.question?.indice[0].value],
            i2: [this.question?.indice[1].value],
            i3: [this.question?.indice[2].value],

            photoLien: [],
            photoTexte: [],

            goodAnswer: [this.findGoodAnswer()]
        });
    }

    ngOnInit(): void {
        if (this.question != undefined){
            this.answers = [this.question.answers[0].value,this.question.answers[1].value,this.question.answers[2].value,this.question.answers[3].value];
            this.numberGoodAnswer = this.findGoodAnswer()+1;
            this.indice = [this.question?.indice[0].value, this.question?.indice[1].value, this.question?.indice[2].value];
        }

        if(this.question != undefined && this.question.optionImageLien != undefined && this.question.optionImageQuestion != undefined){
            this.texteImage = this.question.optionImageQuestion;
        }
        

        this.questionForm = this.formBuilder.group({
            label: [this.question?.label],
            q1: [this.question?.answers[0].value],
            q2: [this.question?.answers[1].value],
            q3: [this.question?.answers[2].value],
            q4: [this.question?.answers[3].value],
            goodAnswer: [this.findGoodAnswer()],
            i1: [this.question?.indice[0].value],
            i2: [this.question?.indice[1].value],
            i3: [this.question?.indice[2].value],

            photoLien: [],
            photoTexte: [this.texteImage],
        });
    }

    @Input()
    question : Question | undefined;
    nbIndice: boolean[] = this.indicesNum;


    findGoodAnswer(){
        for(let i=0;i<4;i++){
            if(this.question?.answers[i].isCorrect){
                return i;
            }
        }
        return 0;
    }

    editQuestion(){
        let question : Question = JSON.parse(JSON.stringify(Question_Model));;        
        question.label = this.questionForm.value.label;

        // réponses
        let answer1 : Answer = JSON.parse(JSON.stringify(Answer_Model));;
        answer1.value = this.questionForm.value.q1;
        answer1.isCorrect = false;

        let answer2 : Answer = JSON.parse(JSON.stringify(Answer_Model));;
        answer2.value = this.questionForm.value.q2;
        answer2.isCorrect = false;

        let answer3 : Answer = JSON.parse(JSON.stringify(Answer_Model));;
        answer3.value = this.questionForm.value.q3;
        answer3.isCorrect = false;

        let answer4 : Answer = JSON.parse(JSON.stringify(Answer_Model));;
        answer4.value = this.questionForm.value.q4;
        answer4.isCorrect = false;

        question.answers = [answer1 , answer2 , answer3, answer4];        
        question.answers[this.questionForm.value.goodAnswer-1].isCorrect = true;

        let indice1 : Indice = Indice_Model1;
        indice1.value = this.questionForm.value.i1;

        let indice2 : Indice = Indice_Model2;
        indice2.value = this.questionForm.value.i2;

        let indice3 : Indice = Indice_Model3;
        indice3.value = this.questionForm.value.i3;

        question.indice = [indice1, indice2, indice3];

        console.log("question : ",question)

        // photo
        if(this.questionForm.value.photoLien !== null && this.questionForm.value.photoTexte != null){
            question.questionImage = true;
            question.questionTexte = false;
            let path : String = this.questionForm.value.photoLien;
            var spliter = path.split('\\');
            let bon_path : string = "./assets/quiz/"+spliter[spliter.length-1];
            question.optionImageLien = bon_path,
            question.optionImageQuestion = this.questionForm.value.photoTexte;
        }
        this.quizService.editQuestion(question);
    }

    deleteQuestion(){
        if(this.question != undefined){
            this.quizService.deleteQuestion(this.question);
        }
    }

    addIndice(){
        for (let i=0; i<this.indicesNum.length; i++) {
            if (this.indicesNum[i] == false) {
                this.indicesNum[i] = true;
                break;
            }
        }
    }

    deleteIndice(){
        let indice = -1;
        for (let i=this.indicesNum.length-1; i>=0; i--) {
            if (this.indicesNum[i] == true) {
                this.indicesNum[i] = false;
                indice = i;
                break;
            }
        }
        if (indice == 0) {
            this.questionForm.patchValue({
                i1: '',
            })
        } else if (indice == 1) {
            this.questionForm.patchValue({
                i2: '',
            })
        } else {
            this.questionForm.patchValue({
                i3: '',
            })
        }
    }
}