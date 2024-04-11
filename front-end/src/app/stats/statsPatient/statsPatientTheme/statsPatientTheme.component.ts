import { Component, OnInit } from "@angular/core";
import { StatsService } from "src/services/stats.service";

@Component({
    selector: 'app-stats-patient-theme',
    templateUrl: './statsPatientTheme.component.html',
    styleUrls: ['./statsPatientTheme.component.scss']
})

export class StatsPatientThemeComponent implements OnInit {

    public theme: string = "";
    public score: number = 0;
    public attempt: number = 0;
    public usedHint: number = 0;

    constructor(public statsService: StatsService){
        this.statsService.theme$.subscribe((theme) => {
            this.theme = theme;
        })

        this.statsService.score$.subscribe((score) => {
            this.score = score;
        })

        this.statsService.attempt$.subscribe((attempt) => {
            this.attempt = attempt;
        })

        this.statsService.usedHint$.subscribe((usedHint) => {
            this.usedHint = usedHint;
        })
    }

    ngOnInit(): void {}
}