import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { PokemonLayoutComponent } from "./pokemon-layout.component";
import { PokemonNavbarComponent } from "./pokemon-navbar/pokemon-navbar.component";
import { PokemonFooterComponent } from "./pokemon-footer/pokemon-footer.component";

@NgModule({
  declarations: [
    PokemonLayoutComponent,
    PokemonNavbarComponent,
    PokemonFooterComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [PokemonLayoutComponent],
})
export class PokemonLayoutModule {}
