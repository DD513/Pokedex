import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { PokemonDictionaryComponent } from "./pokemon-dictionary.component";
import { PokemonDictionaryRoutingModule } from "./pokemon-dictionary-routing.module";
import { PokemonDictionarySearchBarComponent } from "./components/pokemon-dictionary-search-bar/pokemon-dictionary-search-bar.component";
import { PokemonDictionaryTableComponent } from "./components/pokemon-dictionary-table/pokemon-dictionary-table.component";

@NgModule({
  declarations: [
    PokemonDictionaryComponent,
    PokemonDictionarySearchBarComponent,
    PokemonDictionaryTableComponent,
  ],
  imports: [CommonModule, FormsModule, PokemonDictionaryRoutingModule],
})
export class PokemonDictionaryModule {}
