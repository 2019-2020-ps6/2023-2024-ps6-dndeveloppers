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
        this.idPatient = this.route.snapshot.queryParams['id'];
        this.nomQuiz = this.route.snapshot.queryParams['quiz'];
        console.log(this.idPatient);
        console.log(this.nomQuiz);
    }

    @Input()
    idPatient: number = -1;

    @Input()
    nomQuiz: string = "";
}