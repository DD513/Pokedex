import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokedexComponent } from "./pages/pokedex/pokedex.component";
import { PokelotteryComponent } from "./pages/pokelottery/pokelottery.component";
import { TravelFoodComponent } from "./pages/travel-food/travel-food.component";

const routes: Routes = [
  { path: "", redirectTo: "/pokedex", pathMatch: "full" }, // 預設路由
  { path: "pokedex", component: PokedexComponent },
  { path: "pokelottery", component: PokelotteryComponent },
  { path: "travel-food", component: TravelFoodComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
