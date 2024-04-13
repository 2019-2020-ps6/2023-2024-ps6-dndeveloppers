import { Component, OnInit } from "@angular/core";
import * as Highcharts from 'highcharts';

declare var require: any;

@Component({
    selector: 'app-stats-patient-progression',
    templateUrl: './statsPatientProgression.component.html',
    styleUrls: ['./statsPatientProgression.component.scss']
})

export class StatsPatientThemeComponent implements OnInit {

    public options: any = {
        Chart: {
            type: 'area',
            height: 700
        },
        title: {
            text: 'Évolution'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: ['1', '2', '3'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        series: [{
            name: 'QuizName',
            data: [0, 1, 2]
        }]
    }

    constructor(){}

    ngOnInit(): void {
        Highcharts.chart('container', this.options);
    }
}