import { Component, OnInit } from "@angular/core";
import { BettingCalcService } from "./services/betting-calc-service.service";
import { SportLocation } from "./types/betting-calc-data";
import { SelectedSportItem } from "./components/event-item/event-item.component";
import { faTrash, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'betting-calc',
    templateUrl: './betting-calc.component.html',
    styleUrl: './betting-calc.component.scss'
})
export class BettingCalcComponent implements OnInit {
    public offerLocations: SportLocation[] = [];
    public selectedEvents: SelectedSportItem[] = [];
    
    public trashIcon = faTrash;
    public chevronIcon = faChevronUp;

    public odds: number = 0;
    public inputValue = 10;
    public winAmount = 0;

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

    public inputValueChange() {
        if (this.inputValue > 500) {
            this.bettingService.showMessage("Betting amount can't be grater than 500 EUR.", "error");
            this.inputValue = 500;
        } else if (this.inputValue < 10) {
            this.bettingService.showMessage("Betting amount can't be less than 10 EUR.", "error");
            this.inputValue = 10;
        }
        this.calculateWinAmount()
    }

    public remove(sportEvent: SelectedSportItem) {
        this.bettingService.sportEventActionEventStream.next({action: 'remove', sportEvent: sportEvent});
        this.selectedEvents = this.selectedEvents.filter(e => e.id !== sportEvent.id);
        this.bettingService.selectedPicksLength = this.selectedEvents.length;
        this.calculateOdds();
    }

    public setSportEventValue(event: SelectedSportItem) {
        const eventIx = this.selectedEvents.map(e => e.id).indexOf(event.id);
        const item = structuredClone(event);
        if (eventIx !== -1) {
            if (event.pick) {
                this.selectedEvents[eventIx].pick = item.pick;
            } else {
                this.selectedEvents.splice(eventIx, 1);
            }
        } else {
            this.selectedEvents.push(item);
        }
        this.bettingService.selectedPicksLength = this.selectedEvents.length;
        this.calculateOdds();
    }

    private calculateOdds() {
        this.odds = this.selectedEvents.reduce((partial, sportEvent) => {
            return partial * (sportEvent.pick?.odds || 1);
        }, 1);
        this.calculateWinAmount();
    }

    private calculateWinAmount() {
        this.winAmount = this.inputValue * this.odds;
    }
}