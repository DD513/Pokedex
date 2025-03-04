import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./core/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  // title = "pokemonGo";

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.getCurrentUser$().subscribe((user) => {
      if (!user) {
        // 如果當前頁面是受保護頁面，則強制導向/pokedex頁面
        const protectedRoutes = ["/pokelottery"];

        if (protectedRoutes.includes(this.router.url)) {
          this.router.navigate(["/pokedex"]);
        }
      }
    });
  }
}
