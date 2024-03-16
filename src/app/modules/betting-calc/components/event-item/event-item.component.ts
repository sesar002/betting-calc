import { Component, Input } from "@angular/core";
import { SportEvent } from "../../types/betting-calc-data";

@Component({
    selector: 'event-item',
    templateUrl: './event-item.component.html',
    styleUrl: './event-item.component.scss'
})
export class EventItemComponent {

    @Input('data') public data: SportEvent | undefined;
    
    constructor() {

    }
}