import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IMAGE_PATHS } from "../../../core/constants/image-paths";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  loginPikachuLogo = IMAGE_PATHS.LOGIN_PIKACHU_LOGO;

  constructor(private router: Router) {}

  ngOnInit() {}

  login() {
    if (this.email === "peter@example.com" && this.password === "password") {
      console.log("登入成功");
      this.router.navigate(["/pokedex"]);
    } else {
      this.errorMessage = "帳號或密碼錯誤，請重試";
    }
  }

  goHome() {
    this.router.navigateByUrl("/");
  }
}
