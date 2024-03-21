import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { SportLocation } from "../types/betting-calc-data";
import { SelectedSportItem } from "../components/event-item/event-item.component";

@Injectable()
export class BettingCalcService {
    public sportEventActionEventStream: Subject<SportEventAction>;

    public maxSelectedPicks = 8;
    public selectedPicksLength = 0;

    private offerDataUrl = '/assets/offer.json';
    
    constructor(
        private httpClient: HttpClient
    ) {
        this.sportEventActionEventStream = new Subject();
    }

    private t: any = {};
    public showMessage(message: string, state: 'good' | 'warning' | 'error') {
        const key = Date.now();
        const parentEl: HTMLDivElement = document.getElementById('messagesCont') as HTMLDivElement;
        const messageEl: HTMLDivElement = document.createElement('div');
        messageEl.classList.add(state);

        messageEl.innerText = message;
        parentEl.appendChild(messageEl);
        this.t[key] = setTimeout(() => {
            messageEl.remove();
            delete this.t[key];
        }, 3000);
    }

    public getOffer(): Observable<{locations: SportLocation[]}> {
        return this.httpClient.get<{locations: SportLocation[]}>(this.offerDataUrl);
    }

    public getDateObj(date: string) {
        return new Date(date);
    }
}

export type SportEventAction = {
    action: 'remove',
    sportEvent: SelectedSportItem
}