import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { PokedexComponent } from "./pokedex.component";
import { PokemonCardComponent } from "./components/pokemon-card/pokemon-card.component";
import { PokedexSearchBarComponent } from "./components/search-bar/search-bar.component";
import { PokedexRoutingModule } from "./pokedex-routing.module";

@NgModule({
  declarations: [
    PokedexComponent,
    PokemonCardComponent,
    PokedexSearchBarComponent,
  ],
  imports: [CommonModule, FormsModule, PokedexRoutingModule],
})
export class PokedexModule {}
