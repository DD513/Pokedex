import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TravelFoodComponent } from "./pages/travel-food/travel-food.component";
import { PokemonLayoutModule } from "./components/layout/pokemon-layout/pokemon-layout.module";
import { AuthLayoutModule } from "./components/layout/auth-layout/auth-layout.module";
import { TravelFoodCardComponent } from "./pages/travel-food/components/travel-food-card/travel-food-card.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, TravelFoodComponent, TravelFoodCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // Shared Layout Module
    PokemonLayoutModule,
    AuthLayoutModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
