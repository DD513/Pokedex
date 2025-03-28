import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// 不同的 Layout
import { PokemonLayoutComponent } from "./core/layout/pokemon-layout/pokemon-layout.component";
import { AuthLayoutComponent } from "./core/layout/auth-layout/auth-layout.component";
// import { AdminLayoutComponent } from "./components/layout/admin-layout/admin-layout.component";
import { AnimalModule } from "./pages/animal/animal.module";
const routes: Routes = [
  {
    path: "",
    loadChildren:
      "./core/layout/pokemon-layout/pokemon-layout.module#PokemonLayoutModule",
  },
  {
    path: "auth",
    loadChildren:
      "./core/layout/auth-layout/auth-layout.module#AuthLayoutModule",
  },
  // {
  //   path: "admin",
  //   component: AdminLayoutComponent,
  //   children: [
  //     { path: "dashboard", loadChildren: "./pages/admin/dashboard.module#DashboardModule" },
  //   ],
  // },
  {
    path: "animal-planet",
    loadChildren: "./pages/animal/animal.module#AnimalModule",
  },
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
