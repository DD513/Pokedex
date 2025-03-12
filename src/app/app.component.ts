import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./core/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "pokemonGo";

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // 這邊因為我要實時監聽使用者是否在登入中，因此保留getCurrentUser()，而不是checkIsLoggedIn()
    this.authService.getCurrentUser().subscribe((user) => {
      const isLoggedIn = !!user;
      const protectedRoutes = ["/pokelottery"];

      //  如果未登入，且當前路由是受保護頁面，則導回首頁
      if (!isLoggedIn && protectedRoutes.includes(this.router.url)) {
        this.router.navigate(["/pokedex"]);
      }
    });
  }
}
