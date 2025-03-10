import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IMAGE_PATHS } from "../../../core/constants/image-paths";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginPikachuLogo = IMAGE_PATHS.LOGIN_PIKACHU_LOGO;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  goHome() {
    this.router.navigateByUrl("/");
  }

  handleLoginSuccess() {
    this.router.navigate(["/pokedex"]);
  }
}
