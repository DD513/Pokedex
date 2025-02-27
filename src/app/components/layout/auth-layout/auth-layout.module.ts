import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "./auth-layout.component";
import { RouterModule } from "@angular/router";
import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';

@NgModule({
  declarations: [AuthLayoutComponent, AuthNavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [AuthLayoutComponent],
})
export class AuthLayoutModule {}
