import { Component, OnInit } from "@angular/core";
import { BettingCalcService } from "./services/betting-calc-service.service";
import { SportLocation } from "./types/betting-calc-data";

@Component({
    selector: 'betting-calc',
    templateUrl: './betting-calc.component.html',
    styleUrl: './betting-calc.component.scss'
})
export class BettingCalcComponent implements OnInit {
    public offerLocations: SportLocation[] = [];

    constructor(
        private bettingService: BettingCalcService,
    ) {

    }

    ngOnInit(): void {
        this.bettingService.getOffer().subscribe({
            next: (res) => {
                if (res.locations) {
                    this.offerLocations = res.locations;
                } else {
                    console.warn('No data');
                }
            },
            error: (err) => {
                console.error(err);
            }
        })
    }
}