import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PokedexComponent } from "./components/pokedex/pokedex.component";
import { PokelotteryComponent } from "./components/pokelottery/pokelottery.component";

@NgModule({
  declarations: [AppComponent, PokedexComponent, PokelotteryComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
