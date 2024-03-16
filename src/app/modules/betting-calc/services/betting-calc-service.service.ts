import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SportLocation } from "../types/betting-calc-data";

@Injectable()
export class BettingCalcService {
    private offerDataUrl = '/assets/offer.json';
    
    constructor(
        private httpClient: HttpClient
    ) {
        
    }

    public getOffer(): Observable<{locations: SportLocation[]}> {
        return this.httpClient.get<{locations: SportLocation[]}>(this.offerDataUrl);
    }
}