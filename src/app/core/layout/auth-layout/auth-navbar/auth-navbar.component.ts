import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
  styleUrls: ["./auth-navbar.component.css"],
})
export class AuthNavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goHome() {
    this.router.navigateByUrl("/");
  }
}
