import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthLayoutComponent } from "./auth-layout.component";

const routes: Routes = [
  {
    path: "",
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
