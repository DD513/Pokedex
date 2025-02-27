import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent implements OnInit {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {}

  onSubmitForm(event: Event) {
    event.preventDefault();

    const isLoginSuccess = this.authService.login(this.email, this.password);
    if (isLoginSuccess) {
      this.router.navigate(["/pokedex"]);
    } else {
      this.errorMessage = "無法展開冒險，請重試！";
    }
  }
}
