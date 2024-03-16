import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BettingCalcModule } from "./modules/betting-calc/betting-calc.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BettingCalcModule,
        HttpClientModule,
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {};