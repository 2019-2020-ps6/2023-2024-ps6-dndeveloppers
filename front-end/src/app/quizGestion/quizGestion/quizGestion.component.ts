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
    public themeList: String[] = [];
    public themeListShow: String[] = this.themeList;
    public searchTerm: string = '';



    constructor(public quizService: QuizService) {
        this.quizService.quizzes$.subscribe((quizList) => {
          this.quizList = quizList;
        });
        this.quizService.setUpTheme();

        this.quizService.themeList$.subscribe((themeList) => {
            this.themeList = themeList;
            this.themeListShow = this.themeList;
        })
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

    filterQuizsByTheme(theme: String) {
        let res = [];
        for (let i=0; i<this.quizList.length; i++) {
          if (this.quizList[i].name.toLowerCase().includes(this.searchTerm.toLowerCase())
            || this.quizList[i].theme.toLowerCase().includes(this.searchTerm.toLowerCase())) {
            if (this.quizList[i].theme == theme) {
              res.push(this.quizList[i]);
            }
          }
        }
        return res;
      }

    quizShow(event: any) {
        console.log("okok");
    }
}