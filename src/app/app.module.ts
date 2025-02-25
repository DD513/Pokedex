import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TravelFoodComponent } from "./pages/travel-food/travel-food.component";
import { PokemonLayoutModule } from "./components/layout/pokemon-layout/pokemon-layout.module";
import { TravelFoodCardComponent } from "./pages/travel-food/components/travel-food-card/travel-food-card.component";
import { PokemonDictionaryModule } from './pages/pokemon-dictionary/pokemon-dictionary.module';

@NgModule({
  declarations: [AppComponent, TravelFoodComponent, TravelFoodCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // Shared Layout Module
    PokemonLayoutModule,

    PokemonDictionaryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
