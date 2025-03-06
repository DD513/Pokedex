import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokemonDictionaryComponent } from "./pokemon-dictionary.component";

const routes: Routes = [{ path: "", component: PokemonDictionaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonDictionaryRoutingModule {}
