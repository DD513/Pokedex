import { Component, ViewChild, OnInit, HostListener } from "@angular/core";
import { IMAGE_PATHS } from "../../../../core/constants/image-paths";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";
import { SuccessToastComponent } from "../../../../shared/components/toast/success-toast/success-toast.component";

@Component({
  selector: "app-pokemon-navbar",
  templateUrl: "./pokemon-navbar.component.html",
  styleUrls: ["./pokemon-navbar.component.css"],
})
export class PokemonNavbarComponent implements OnInit {
  @ViewChild(SuccessToastComponent) toast!: SuccessToastComponent; // 取得 Toast 元件的參考

  isDropdownOpen = false;
  isLoggedIn = false;
  isLoginModalOpen = false;
  pendingRedirectAfterLogin = false;
  pendingRouteAfterLogin: string | null = null; // 記錄受保護頁面路由
  showLoginToast = false;

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
  defaultAvatar = IMAGE_PATHS.USER_POKEMON_TRAINER;
  pokemonGoAppIcon = IMAGE_PATHS.HOME_POKEMON_APP_ICON;
  pokemonNewsIcon = IMAGE_PATHS.HOME_POKEMON_NEWS;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userAvatar = user.image;
        this.userName = user.name;
        this.userEmail = user.email;
      } else {
        this.isLoggedIn = false;
        this.userAvatar = this.defaultAvatar;
        this.userName = "未知的冒險者";
        this.userEmail = "";
      }
    });
  }

  openLoginModal() {
    this.closeDropdown();
    this.isLoginModalOpen = true;
  }

  handleProtectedRouteNavigation(route: string) {
    if (this.isLoggedIn) {
      this.navigateTo(route);
    } else {
      this.pendingRedirectAfterLogin = true;
      this.pendingRouteAfterLogin = route;
      this.openLoginModal();
    }
  }

  handleLoginCompleted() {
    this.isLoginModalOpen = false;

    this.toast.showToastMessage("登入成功！開始冒險吧！");

    if (this.pendingRedirectAfterLogin && this.pendingRouteAfterLogin) {
      this.router.navigate([this.pendingRouteAfterLogin]);
      this.pendingRedirectAfterLogin = false;
      this.pendingRouteAfterLogin = null;
    }
  }

  toggleDropdown(event: Event | null): void {
    if (event) {
      event.stopPropagation();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateTo(path: string): void {
    this.closeDropdown();
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
    this.closeDropdown();
    this.isLoggedIn = false;
    this.toast.showToastMessage("登出成功！");
  }

  @HostListener("document:click", ["$event"])
  closeDropdown(event?: Event): void {
    // 將 event.target 轉換成 HTMLElemen，因為EventTarget 沒有 closest() 方法。
    if (event && (event.target as HTMLElement).closest(".dropdown-menu")) {
      return;
    }
    this.isDropdownOpen = false;
  }
}
