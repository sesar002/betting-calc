import { Component, Input } from "@angular/core";
import { League } from "../../types/betting-calc-data";

@Component({
    selector: 'league-item',
    templateUrl: './league-item.component.html',
    styleUrl: './league-item.component.scss'
})
export class LeagueItemComponent {

    @Input('data') public data: League | undefined;

    constructor() {
        
    }
}