import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { PokemonDictionaryComponent } from "./pokemon-dictionary.component";
import { PokemonDictionaryRoutingModule } from "./pokemon-dictionary-routing.module";

@NgModule({
  declarations: [PokemonDictionaryComponent],
  imports: [CommonModule, FormsModule, PokemonDictionaryRoutingModule],
})
export class PokemonDictionaryModule {}
