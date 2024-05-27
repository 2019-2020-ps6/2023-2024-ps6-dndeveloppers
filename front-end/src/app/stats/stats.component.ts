import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {

    constructor(private route: ActivatedRoute){}

    ngOnInit(): void {
        this.nomPatient = this.route.snapshot.queryParams['nom'];
        this.nomQuiz = this.route.snapshot.queryParams['quiz'];
        console.log(this.nomPatient);
        console.log(this.nomQuiz);
    }

    @Input()
    nomPatient: string = "";

    @Input()
    nomQuiz: string = "";
}