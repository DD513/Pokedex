import { Component, OnInit, HostListener } from "@angular/core";
import { IMAGE_PATHS } from "../../../../core/constants/image-paths";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";
import { User } from "../../../../core/models/user.model";

@Component({
  selector: "app-pokemon-navbar",
  templateUrl: "./pokemon-navbar.component.html",
  styleUrls: ["./pokemon-navbar.component.css"],
})
export class PokemonNavbarComponent implements OnInit {
  isDropdownOpen = false;
  isLoggedIn = false;

  userAvatar: string = "";
  userName: string = "";
  userEmail: string = "";

  // 🔹 圖片路徑
  homePageLogo = IMAGE_PATHS.HOME_PAGE_LOGO;
  pokedexLogo = IMAGE_PATHS.HOME_POKEDEX_LOGO;
  pokeLotteryLogo = IMAGE_PATHS.HOME_POKELOTTERY_LOGO;
  pokemonDictionaryLogo = IMAGE_PATHS.HOME_POKEMON_DICTIONARY_LOGO;
  dropdownMenuIcon = IMAGE_PATHS.MENU_DROPDOWN_ICON;
  loginIcon = IMAGE_PATHS.HOME_LOGIN_ICON;
  logoutIcon = IMAGE_PATHS.HOME_LOGOUT_ICON;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser$().subscribe((user) => {
      if (user) {
        console.log(user, "12312312");
        this.isLoggedIn = true;
        this.userAvatar = user.image;
        this.userName = user.name;
        this.userEmail = user.email;
      } else {
        this.isLoggedIn = false;
        this.userAvatar = "../../../assets/images/User/default-user.png";
        this.userName = "Guest";
        this.userEmail = "";
      }
    });
  }

  toggleDropdown(): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isDropdownOpen = false;
  }

  login(): void {
    this.router.navigate(["/auth/login"]);
    console.log("登入功能開發中...");
  }

  logout(): void {
    this.authService.logout();
    this.isDropdownOpen = false;
    console.log("登出成功");
  }

  @HostListener("document:click", ["$event"])
  closeDropdown(event: Event): void {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }
}
