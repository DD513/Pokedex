import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokedexComponent } from "./pages/pokedex/pokedex.component";
import { PokelotteryComponent } from "./pages/pokelottery/pokelottery.component";
import { TravelFoodComponent } from "./pages/travel-food/travel-food.component";

import { LayoutComponent } from "./components/layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent, // 讓所有子路由都包在 LayoutComponent 裡
    children: [
      { path: "", redirectTo: "/pokedex", pathMatch: "full" },
      // {
      //   path: "pokedex",
      //   loadChildren: "./pages/pokedex/pokedex.module#PokedexModule",
      // },
      { path: "pokedex", component: PokedexComponent },
      { path: "pokelottery", component: PokelotteryComponent },
      { path: "travel-food", component: TravelFoodComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
