import { Component, EventEmitter, Input, OnInit } from "@angular/core";
import { FixtureParticipant, Market, MarketPick, SportEvent } from "../../types/betting-calc-data";
import { MarketPicksData } from "../league-item/league-item.component";
import { BettingCalcService } from "../../services/betting-calc-service.service";

@Component({
    selector: 'event-item',
    templateUrl: './event-item.component.html',
    styleUrl: './event-item.component.scss',
    outputs: ['eventEmitter']
})
export class EventItemComponent implements OnInit {
    public selectedPick: MarketPick | null = null;
    public sportEventData: SportEvent | null = null;

    private eventEmitter: EventEmitter<SelectedSportItem> = new EventEmitter();

    @Input('data')
    set data(data: {sportEvent: SportEvent, maxMarketPickData: MarketPicksData[]}) {
        this.sportEventData = this.remapSportEventMarkets(data.sportEvent, data.maxMarketPickData);
    }
    
    constructor(
        public bettingService: BettingCalcService,
    ) {

    }

    ngOnInit(): void {
        this.bettingService.sportEventActionEventStream.subscribe((change) => {
            if (change.action === 'remove' && change.sportEvent.id === this.sportEventData?.id) {
                this.selectedPick = null;
            }
        })
    }

    public pickAction(pick: MarketPick) {
        if (this.bettingService.maxSelectedPicks === this.bettingService.selectedPicksLength && this.selectedPick === null) {
            this.bettingService.showMessage("Maximum 8 bets selectable.", 'error');
            return;
        }
        if (this.selectedPick && pick.id === this.selectedPick.id) {
            this.selectedPick = null;
        } else {
            this.selectedPick = pick;
        }
        if (this.sportEventData) {
            this.eventEmitter.emit({
                id: this.sportEventData?.id,
                participants: this.sportEventData.fixture.participants,
                pick: this.selectedPick
            })
        }
    }

    /**
     * Remaps the markets of a SportEvent object based on the provided maxMarketPickData
     */
    private remapSportEventMarkets(sportEventData: SportEvent, maxMarketPickData: MarketPicksData[]): SportEvent {
        const mappedMarkets: Market[] = [];
    
        maxMarketPickData.forEach(maxMarket => {
            const foundMarket = sportEventData.markets.find(market => market.marketId === maxMarket.marketId);
            if (foundMarket) {
                // reorder picks according to maxMarket.picks order or add missing pick as empty
                const reorderedPicks = maxMarket.picks.map(maxPick => {
                    const foundPick = foundMarket.picks.find(pick => pick.id === maxPick.id);
                    return foundPick ? foundPick : { odds: 0, id: maxPick.id, name: maxPick.name, order: maxPick.order };
                });
                // update market picks
                foundMarket.picks = reorderedPicks;
                // push mapped market to arr
                mappedMarkets.push(foundMarket);
                // remove the found market from sportEventData.markets
                const index = sportEventData.markets.indexOf(foundMarket);
                if (index !== -1) {
                    sportEventData.markets.splice(index, 1);
                }
            } else {
                // create missing
                const newMarket: Market = {
                    marketId: maxMarket.marketId,
                    betCode: maxMarket.betCode,
                    name: maxMarket.name,
                    picks: []
                };
                // fill market with empty picks
                maxMarket.picks.forEach(pick => {
                    newMarket.picks.push({
                        odds: 0,
                        id: pick.id,
                        name: pick.name,
                        order: pick.order
                    });
                })
                mappedMarkets.push(newMarket);
            }
        });
        // replace markets with mappedmarkets
        sportEventData.markets = mappedMarkets
        return sportEventData;
    }
}

export type SelectedSportItem = {
    id: SportEvent['id']
    participants: FixtureParticipant[],
    pick: MarketPick | null
}