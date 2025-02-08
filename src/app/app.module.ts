import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PokedexComponent } from "./pages/pokedex/pokedex.component";
import { PokelotteryComponent } from "./pages/pokelottery/pokelottery.component";
import { TravelFoodComponent } from "./pages/travel-food/travel-food.component";

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    PokelotteryComponent,
    TravelFoodComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
