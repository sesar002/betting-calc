import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BettingCalcService } from "./services/betting-calc-service.service";
import { BettingCalcComponent } from "./betting-calc.component";
import { LeagueItemComponent } from "./components/league-item/league-item.component";
import { EventItemComponent } from "./components/event-item/event-item.component";

@NgModule({
    declarations: [
        BettingCalcComponent,
        LeagueItemComponent,
        EventItemComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        BettingCalcComponent,
    ],
    providers: [
        BettingCalcService,
    ]
})
export class BettingCalcModule {};