import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokedexComponent } from "./pokedex.component";
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { PokedexSearchBarComponent } from "./components/search-bar/search-bar.component";
import { PokedexRoutingModule } from "./pokedex-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PokedexComponent,
    PokemonCardComponent,
    PokedexSearchBarComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [PokedexComponent, PokedexRoutingModule],
})
export class PokedexModule {}
