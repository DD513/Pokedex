import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  // AuthGuard 負責攔截未登入的使用者進入受保護頁面，無法及時監聽。
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.checkIsLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/pokedex"]);
      return false;
    }
  }
}
