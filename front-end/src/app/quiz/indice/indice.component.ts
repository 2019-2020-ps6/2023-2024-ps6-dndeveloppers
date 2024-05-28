import { Component, Input, OnInit } from "@angular/core";
import { QuizService } from "src/services/quiz.service";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-indice',
    templateUrl: './indice.component.html',
    styleUrls: ['./indice.component.scss']
})

export class IndiceComponent implements OnInit {

    public notDisabled: boolean = true;

    constructor(public quizService: QuizService){
        this.quizService.disableHintHelp$.subscribe((disability) => {
            this.notDisabled = disability;
        })
    }

    @Input()

    ngOnInit(): void {}

    hintAsked() {
        if (this.notDisabled) {
            this.quizService.hintAsked();
        }
    }
}