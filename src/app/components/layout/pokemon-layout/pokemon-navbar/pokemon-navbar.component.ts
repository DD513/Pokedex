import { Component, OnInit, HostListener } from "@angular/core";
import { IMAGE_PATHS } from "../../../../core/constants/image-paths";
import { Router } from "@angular/router";

@Component({
  selector: "app-pokemon-navbar",
  templateUrl: "./pokemon-navbar.component.html",
  styleUrls: ["./pokemon-navbar.component.css"],
})
export class PokemonNavbarComponent implements OnInit {
  isDropdownOpen = false;
  isLoggedIn = false; // 假設登入狀態，未來可以用 AuthService 來處理
  userAvatar = IMAGE_PATHS.USER_PETER;
  userName = "Peter";
  userEmail = "peter@example.com";

  // 🔹 圖片路徑
  homePageLogo = IMAGE_PATHS.HOME_PAGE_LOGO;
  pokedexLogo = IMAGE_PATHS.HOME_POKEDEX_LOGO;
  pokeLotteryLogo = IMAGE_PATHS.HOME_POKELOTTERY_LOGO;
  pokemonDictionaryLogo = IMAGE_PATHS.HOME_POKEMON_DICTIONARY_LOGO;
  dropdownMenuIcon = IMAGE_PATHS.MENU_DROPDOWN_ICON;
  loginIcon = IMAGE_PATHS.HOME_LOGIN_ICON;
  logoutIcon = IMAGE_PATHS.HOME_LOGOUT_ICON;

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleDropdown(): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isDropdownOpen = false; // 關閉選單
  }

  login(): void {
    // 這裡放登入邏輯
    console.log("登入功能開發中...");
  }

  logout(): void {
    this.isLoggedIn = false;
    console.log("登出成功");
  }

  @HostListener("document:click", ["$event"])
  closeDropdown(event: Event): void {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }
}
