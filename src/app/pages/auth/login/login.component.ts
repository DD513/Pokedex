import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IMAGE_PATHS } from "../../../core/constants/image-paths";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginPikachuLogo = IMAGE_PATHS.LOGIN_PIKACHU_LOGO;

  constructor(private router: Router) {}

  ngOnInit() {}

  goHome() {
    this.router.navigateByUrl("/");
  }
}
