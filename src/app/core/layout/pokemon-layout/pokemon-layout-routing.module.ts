import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokemonLayoutComponent } from "./pokemon-layout.component";
import { AuthGuard } from "../../guards/auth.guard";
import { PokedexModule } from "../../../pages/pokemon/pokedex/pokedex.module";

const routes: Routes = [
  {
    path: "",
    component: PokemonLayoutComponent,
    children: [
      { path: "", redirectTo: "/pokedex", pathMatch: "full" },
      {
        path: "pokedex",
        loadChildren:
          "../../../pages/pokemon/pokedex/pokedex.module#PokedexModule",
      },
      {
        path: "pokelottery",
        loadChildren:
          "../../../pages/pokemon/pokelottery/pokelottery.module#PokelotteryModule",
        canActivate: [AuthGuard],
      },
      {
        path: "pokemon-dictionary",
        loadChildren:
          "../../../pages/pokemon/pokemon-dictionary/pokemon-dictionary.module#PokemonDictionaryModule",
      },
      {
        path: "travel-food",
        loadChildren:
          "../../../pages/travel-food/travel-food.module#TravelFoodModule",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonLayoutRoutingModule {}
