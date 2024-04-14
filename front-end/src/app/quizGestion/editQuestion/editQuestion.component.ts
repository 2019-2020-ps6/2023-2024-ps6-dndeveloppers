import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Question_Model, Answer_Model1, Answer_Model2, Answer_Model3, Answer_Model4 } from "src/mocks/quiz-list.mock";
import { Answer, Question } from "src/models/question.models";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'app-editQuestion',
    templateUrl: './editQuestion.component.html',
    styleUrls: ['./editQuestion.component.scss']
})

export class EditQuestionComponent implements OnInit {
    @Input()
    question : Question | undefined;

    public questionForm : FormGroup;

    public answers: String[] = ['','','',''];
    public numberGoodAnswer = 0;
    public texteImage: String = '';

    constructor(public formBuilder: FormBuilder, public quizService: QuizService){
        this.questionForm = this.formBuilder.group({
            label: [this.question?.label],
            q1: [this.question?.answers[0].value],
            q2: [this.question?.answers[1].value],
            q3: [this.question?.answers[2].value],
            q4: [this.question?.answers[3].value],
            goodAnswer: [this.findGoodAnswer()+1],

            photoLien: [],
            photoTexte: []
        });
    }

    ngOnInit(): void {
        if (this.question != undefined){
            this.answers = [this.question.answers[0].value,this.question.answers[1].value,this.question.answers[2].value,this.question.answers[3].value];
            this.numberGoodAnswer = this.findGoodAnswer()+1;
        }

        if(this.question != undefined && this.question.optionImage != undefined){
            this.texteImage = this.question.optionImage[1];
        }
        

        this.questionForm = this.formBuilder.group({
            label: [this.question?.label],
            q1: [this.question?.answers[0].value],
            q2: [this.question?.answers[1].value],
            q3: [this.question?.answers[2].value],
            q4: [this.question?.answers[3].value],
            goodAnswer: [this.findGoodAnswer()+1],

            photoLien: [],
            photoTexte: [this.texteImage]
        });
    }


    findGoodAnswer(){
        for(let i=0;i<4;i++){
            if(this.question?.answers[i].isCorrect){
                return i;
            }
        }
        return 0;
    }

    editQuestion(){
        let question : Question = Question_Model;        
        question.label = this.questionForm.value.label;

        // réponses
        let answer1 : Answer = Answer_Model1;
        answer1.value = this.questionForm.value.q1;
        answer1.isCorrect = false;

        let answer2 : Answer = Answer_Model2;
        answer2.value = this.questionForm.value.q2;
        answer2.isCorrect = false;

        let answer3 : Answer = Answer_Model3;
        answer3.value = this.questionForm.value.q3;
        answer3.isCorrect = false;

        let answer4 : Answer = Answer_Model4;
        answer4.value = this.questionForm.value.q4;
        answer4.isCorrect = false;

        question.answers = [answer1 , answer2 , answer3, answer4];        
        question.answers[this.questionForm.value.goodAnswer-1].isCorrect = true;

        // photo
        if(this.questionForm.value.photoLien !== null && this.questionForm.value.photoTexte != null){
            question.questionImage = true;
            question.questionTexte = false;
            let path : String = this.questionForm.value.photoLien;
            var spliter = path.split('\\');
            let bon_path : string = "./assets/quiz/"+spliter[spliter.length-1];
            question.optionImage = [bon_path,this.questionForm.value.photoTexte];
        }
        this.quizService.editQuestion(question);
    }

    deleteQuestion(){
        if(this.question != undefined){
            this.quizService.deleteQuestion(this.question);
        }
    }
}