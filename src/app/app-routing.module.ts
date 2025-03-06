import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TravelFoodComponent } from "./pages/travel-food/travel-food.component";
import { AuthGuard } from "./core/guards/auth.guard";

// 不同的 Layout
import { PokemonLayoutComponent } from "./core/layout/pokemon-layout/pokemon-layout.component";
import { AuthLayoutComponent } from "./core/layout/auth-layout/auth-layout.component";
// import { AdminLayoutComponent } from "./components/layout/admin-layout/admin-layout.component";

const routes: Routes = [
  {
    path: "",
    component: PokemonLayoutComponent,
    children: [
      { path: "", redirectTo: "/pokedex", pathMatch: "full" },
      {
        path: "pokedex",
        loadChildren: "./pages/pokedex/pokedex.module#PokedexModule",
      },
      {
        path: "pokelottery",
        loadChildren:
          "./pages/pokelottery/pokelottery.module#PokelotteryModule",
        canActivate: [AuthGuard],
      },
      {
        path: "pokemon-dictionary",
        loadChildren:
          "./pages/pokemon-dictionary/pokemon-dictionary.module#PokemonDictionaryModule",
      },
      { path: "travel-food", component: TravelFoodComponent },
    ],
  },
  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [
      { path: "", redirectTo: "/auth/login", pathMatch: "full" },
      {
        path: "login",
        loadChildren: "./pages/auth/login/login.module#LoginModule",
      },
      // {
      //   path: "register",
      //   loadChildren: "./pages/auth/register.module#RegisterModule",
      // },
    ],
  },
  // {
  //   path: "admin",
  //   component: AdminLayoutComponent,
  //   children: [
  //     { path: "dashboard", loadChildren: "./pages/admin/dashboard.module#DashboardModule" },
  //   ],
  // },
  {
    path: "404",
    loadChildren: "./pages/not-found/not-found.module#NotFoundModule",
  },
  { path: "**", redirectTo: "/404" }, // 🚀 這裡捕捉所有未匹配的路由
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
