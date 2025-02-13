import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokedexComponent } from "./pokedex.component";

const routes: Routes = [
  { path: "", component: PokedexComponent }, // 這個會對應 `/pokedex`
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}
