import { Component, Input, OnInit } from "@angular/core";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "src/services/quiz.service";

@Component({
    selector: 'quizGestion',
    templateUrl: './quizGestion.component.html',
    styleUrls: ['./quizGestion.component.scss']
})

export class QuizGestionComponent implements OnInit {

    public quizList: Quiz[] = [];
    public searchTerm: string = '';



    constructor(public quizService: QuizService) {
        this.quizService.quizzes$.subscribe((quizList) => {
          this.quizList = quizList;
        });
        this.quizService.setUpTheme();
    }

    ngOnInit(): void {}

    filterQuizs() {
        if (this.searchTerm) {
            return this.quizList.filter(quiz => 
                quiz.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                quiz.theme.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        } else {
            return this.quizList;
        }
    }
}