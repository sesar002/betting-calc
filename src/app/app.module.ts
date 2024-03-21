import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BettingCalcModule } from "./modules/betting-calc/betting-calc.module";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BettingCalcModule,
        HttpClientModule,
        FontAwesomeModule,
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {};