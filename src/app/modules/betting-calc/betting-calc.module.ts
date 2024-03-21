import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BettingCalcService } from "./services/betting-calc-service.service";
import { BettingCalcComponent } from "./betting-calc.component";
import { LeagueItemComponent } from "./components/league-item/league-item.component";
import { EventItemComponent } from "./components/event-item/event-item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        BettingCalcComponent,
        LeagueItemComponent,
        EventItemComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule
    ],
    exports: [
        BettingCalcComponent,
    ],
    providers: [
        BettingCalcService,
    ]
})
export class BettingCalcModule {};