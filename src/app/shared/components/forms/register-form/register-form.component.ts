import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.css"],
})
export class RegisterFormComponent implements OnInit {
  @Output() registerSuccess = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  username: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  errorMessage: string = "";

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  onSubmitForm(event: Event) {
    event.preventDefault();

    if (
      !this.username ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = "所有欄位皆為必填";
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = "密碼與確認密碼不一致";
      return;
    }

    const isRegisterSuccess = this.authService.register(
      this.username,
      this.email,
      this.password
    );

    if (isRegisterSuccess) {
      this.registerSuccess.emit();
    } else {
      this.errorMessage = "註冊失敗，請重試！";
    }
  }
}
