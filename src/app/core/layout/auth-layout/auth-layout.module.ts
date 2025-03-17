import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "./auth-layout.component";
import { RouterModule } from "@angular/router";
import { AuthNavbarComponent } from "./auth-navbar/auth-navbar.component";
import { AuthRoutingModule } from "./auth-layout-routing.module";

@NgModule({
  declarations: [AuthLayoutComponent, AuthNavbarComponent],
  imports: [CommonModule, RouterModule, AuthRoutingModule],
  exports: [AuthLayoutComponent, AuthNavbarComponent],
})
export class AuthLayoutModule {}
