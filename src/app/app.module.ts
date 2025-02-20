import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PokedexModule } from "./pages/pokedex/pokedex.module";
import { PokelotteryModule } from "./pages/pokelottery/pokelottery.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TravelFoodComponent } from "./pages/travel-food/travel-food.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { TravelFoodCardComponent } from './pages/travel-food/components/travel-food-card/travel-food-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TravelFoodComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    TravelFoodCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // PodexModule 這個模組是我們自己寫的，所以要 import 進來
    PokedexModule,
    PokelotteryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
