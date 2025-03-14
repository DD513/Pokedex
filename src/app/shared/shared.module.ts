import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoginFormComponent } from "./components/forms/login-form/login-form.component";
import { LoginModalComponent } from "./components/modal/login-modal/login-modal.component";
import { RegisterFormComponent } from "./components/forms/register-form/register-form.component";
import { SuccessToastComponent } from "./components/toast/success-toast/success-toast.component";

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginModalComponent,
    RegisterFormComponent,
    SuccessToastComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    LoginFormComponent,
    LoginModalComponent,
    RegisterFormComponent,
    SuccessToastComponent,
  ],
})
export class SharedModule {}
