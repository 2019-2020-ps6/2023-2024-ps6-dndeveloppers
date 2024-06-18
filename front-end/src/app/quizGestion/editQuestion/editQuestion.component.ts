import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Question_Model, Indice_Model1, Indice_Model2, Indice_Model3, QUIZ_LIST } from "src/mocks/quiz-list.mock";
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
    public targetIndex: number = 0;
    public url: string = window.location.href;
    public quizName: string = "";
    photo : string = "";

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

            photoTexte: [],

            goodAnswer: [this.findGoodAnswer()]
        });

        let URL = this.url.split('/');
        //console.log("url : ", URL);
        this.quizName = URL[URL.length-1];
        //console.log("url courante : ", this.quizName);
    }

    ngOnInit(): void {
        if (this.question != undefined){
            this.answers = [this.question.answers[0].value,this.question.answers[1].value,this.question.answers[2].value,this.question.answers[3].value];
            this.numberGoodAnswer = this.findGoodAnswer()+1;
            for(let i=0; i<this.question.indice.length;i++){
                this.indice[i] = this.question.indice[i].value
            }

        }

        if(this.question != undefined && this.question.optionImageLien != undefined && this.question.optionImageQuestion != undefined){
            if(this.question.optionImageLien != "none"){ 
                this.photo = this.question.optionImageLien;
            }
            if(this.question.optionImageQuestion != "none"){ 
                this.texteImage = this.question.optionImageQuestion;
            }
           
        }
        

        this.questionForm = this.formBuilder.group({
            label: [this.question?.label],
            q1: [this.question?.answers[0].value],
            q2: [this.question?.answers[1].value],
            q3: [this.question?.answers[2].value],
            q4: [this.question?.answers[3].value],
            goodAnswer: [this.findGoodAnswer()],
            i1: [this.indice[0]],
            i2: [this.indice[1]],
            i3: [this.indice[2]],
            photoTexte: [this.texteImage],
        });

        this.quizService.editedQuiz$.subscribe((editedQuiz) => {
            let veracity = [];
            if (editedQuiz != undefined) {
                for (let i=0; i<editedQuiz?.questions.length; i++) {
                    for (let j=0; j<editedQuiz.questions[i].answers.length; j++) {
                        veracity.push(editedQuiz.questions[i].answers[j].isCorrect);
                    }
                }
            }

            const checkboxes = document.querySelectorAll('.rr');
            for (let i=0; i<checkboxes.length; i++) {
                if (veracity[i]) {
                    (checkboxes[i] as HTMLInputElement).checked = true;
                }
            }
        })  
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
        question.answers[this.questionForm.value.goodAnswer].isCorrect = true;

        let oneChecked = 0;
        const checkboxes = document.getElementsByClassName("rr");
        for (let i=Math.floor(this.targetIndex/4)*4; i<Math.floor(this.targetIndex/4)*4 +4; i++) {
            if ((checkboxes[i] as HTMLInputElement).checked) {
                oneChecked++;
            }
        }

        let indice1 : Indice = Indice_Model1;
        if (this.questionForm.value.i1 == "indice 1") {
            indice1.value = "";
        } else {
            indice1.value = this.questionForm.value.i1;
        }

        let indice2 : Indice = Indice_Model2;
        if (this.questionForm.value.i2 == "indice 2") {
            indice2.value = "";
        } else {
            indice2.value = this.questionForm.value.i2;
        }

        let indice3 : Indice = Indice_Model3;
        if (this.questionForm.value.i3 == "indice 3") {
            indice3.value = "";
        } else {
            indice3.value = this.questionForm.value.i3;
        }

        question.indice = [indice1, indice2, indice3];

        if (indice1.value == "" && indice2.value != "" && indice3.value == "") {
            indice1.value = indice2.value;
            indice2.value = "";
        } else if (indice1.value == "" && indice2.value == "" && indice3.value != "") {
            indice1.value = indice3.value;
            indice3.value = "";
        } else if (indice1.value != "" && indice2.value == "" && indice3.value != "") {
            indice2.value = indice3.value;
            indice3.value = "";
        } else if (indice1.value == "" && indice2.value != "" && indice3.value != "") {
            indice1.value = indice2.value;
            indice2.value = indice3.value;
            indice3.value = "";
        }

        question.indice = [indice1, indice2, indice3];

        // photo
        if(this.photo != "" && this.questionForm.value.photoTexte != null && this.questionForm.value.photoTexte != "none"){
            question.optionImageLien = this.photo,
            question.optionImageQuestion = this.questionForm.value.photoTexte;
        }
        else {
            question.optionImageLien = "none"
            question.optionImageQuestion = "none"
        }
        question.id = this.question?.id;
        question.idQuiz = this.question?.idQuiz;
        if (oneChecked == 1) {
            this.quizService.editQuestion(question);
        } else {
            alert("Veuillez selectionner une unique bonne réponse");
        }
    }

    selectResponseNumber(event: any, responseNumber: number) {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                const checkboxes = document.querySelectorAll('.rr');
                let indiceTarget = 0;
                for (let i=0; i<checkboxes.length; i++) {
                    if (checkboxes[i] == event.target) {
                        indiceTarget = i;
                        this.targetIndex = i;
                        break;
                    }
                }
                let range = [];
                for (let i=Math.floor(indiceTarget/4)*4; i<Math.floor(indiceTarget/4)*4 +4; i++) {
                    console.log("range : ", i);
                    range.push(checkboxes[i]);
                }
                console.log("There is ", range.length, " checkboxes");
                range.forEach((checkbox: Element) => {
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

    deleteQuestion(){
        if(this.question != undefined){
            this.quizService.deleteQuestion(this.question);
        }
    }

    handleEvent(event: string) {
        this.photo = event;
        console.log(event.length)
        console.log(this.photo.length)
    }
}