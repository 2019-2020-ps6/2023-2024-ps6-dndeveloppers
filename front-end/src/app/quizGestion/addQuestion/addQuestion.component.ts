import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Answer_Model1, Answer_Model2, Answer_Model3, Answer_Model4, Question_Model } from "src/mocks/quiz-list.mock";
import { Answer, Question } from "src/models/question.models";
import { QuizService } from "src/services/quiz.service";


@Component({
    selector: 'app-addQuestion',
    templateUrl: './addQuestion.component.html',
    styleUrls: ['./addQuestion.component.scss']
})

export class AddQuestionComponent implements OnInit {

    public questionForm : FormGroup;
    constructor(public formBuilder: FormBuilder, public quizService: QuizService){
        this.questionForm = this.formBuilder.group({
            label: ['abcd'],
            q1: ['a'],
            q2: ['b'],
            q3: ['c'],
            q4: ['d'],
            goodAnswer: [1]
        });
    }

    @Input()

    ngOnInit(): void {}

    addQuestion(){
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

        console.log("question : ",question)
        this.quizService.addQuestion(question);
    }
}