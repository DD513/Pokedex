import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [{ path: "", component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class LoginModule {}
