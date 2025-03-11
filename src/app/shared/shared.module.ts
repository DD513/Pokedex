import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoginFormComponent } from "./components/forms/login-form/login-form.component";
import { LoginModalComponent } from "./components/modal/login-modal/login-modal.component";
import { RegisterFormComponent } from "./components/forms/register-form/register-form.component";

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginModalComponent,
    RegisterFormComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [LoginFormComponent, LoginModalComponent, RegisterFormComponent],
})
export class SharedModule {}
