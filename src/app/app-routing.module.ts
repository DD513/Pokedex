import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokedexComponent } from "./components/pokedex/pokedex.component";
import { PokelotteryComponent } from "./components/pokelottery/pokelottery.component";

const routes: Routes = [
  { path: "", redirectTo: "/pokedex", pathMatch: "full" }, // 預設路由
  { path: "pokedex", component: PokedexComponent },
  { path: "pokelottery", component: PokelotteryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
