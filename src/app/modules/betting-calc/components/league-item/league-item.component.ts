import { Component, EventEmitter, Input } from "@angular/core";
import { EventDateGroup, League, MarketPick } from "../../types/betting-calc-data";
import { Observable, map, of } from "rxjs";
import { BettingCalcService } from "../../services/betting-calc-service.service";
import { SelectedSportItem } from "../event-item/event-item.component";

@Component({
    selector: 'league-item',
    templateUrl: './league-item.component.html',
    styleUrl: './league-item.component.scss',
    outputs: ['eventEmitter']
})
export class LeagueItemComponent {
    public leagueData: League | undefined;
    public maxMarketPickData: MarketPicksData[] = [];

    private eventEmitter: EventEmitter<SelectedSportItem> = new EventEmitter();

    @Input('data')
    set data(data: League) {
        // show league data after max market picks length is retrived
        this.getMaxMarketPickLength(data.eventDateGroups ?? []).subscribe(
            {
                next: (res) => {
                    this.maxMarketPickData = res;
                    console.log(this.maxMarketPickData)
                    this.leagueData = data;
                },
                error: (err) => {
                    console.error(err);
                }
            }
        )
    }

    constructor(
        public bettingService: BettingCalcService,
    ) {
        
    }

    public setSportEvent(event: SelectedSportItem) {
        this.eventEmitter.emit(event);
    }

    /**
     * Retrieves the maximum pick length for each market from the provided league data
     * 
     * @param data league data
     * @returns Observable emitting the remapped 
     */
    private getMaxMarketPickLength(dateGroups: EventDateGroup[]): Observable<MarketPicksData[]> {
        return of(dateGroups).pipe(
            map(dateGroups => {
                const markets: MarketPicksData[] = [];
                dateGroups.forEach(dateGroup => {
                    (dateGroup.events ?? []).forEach(sportEvent => {
                        (sportEvent.markets ?? []).forEach(market => {
                            const existingMarket = markets.find(item => item.marketId === market.marketId);
                            if (existingMarket) {
                                market.picks.forEach(pick => {
                                    if (!existingMarket.picks.map(e => e.id).includes(pick.id)) {
                                        existingMarket.picks.push(pick);
                                    }
                                });
                            } else {
                                markets.push({
                                    marketId: market.marketId,
                                    picks: [...market.picks],
                                    betCode: market.betCode,
                                    name: market.name
                                });
                            }
                        });
                    });
                });
                markets.forEach(market => {
                    market.picks.sort((a, b) => a.order - b.order);
                });
                return markets;
            })
        );
    }
}

export type MarketPicksData = {
    marketId: string,
    picks: MarketPick[],
    betCode: string,
    name: string
}