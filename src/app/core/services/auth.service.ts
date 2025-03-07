import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { USER_LIST } from "../data/user.data";

@Injectable({
  providedIn: "root", // 使用 root，確保全局單例
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    // 檢查 localStorage 有沒有冒險者
    const userJson = localStorage.getItem("currentUser");
    if (userJson) {
      const userObj: User = JSON.parse(userJson);
      this.currentUserSubject.next(userObj);
    }
  }

  public login(email: string, password: string): boolean {
    const foundUser = USER_LIST.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      this.currentUserSubject.next(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      console.log("登入成功，訓練家：", foundUser.name);
      // console.log(localStorage.getItem("currentUser"));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem("currentUser");
    // console.log(localStorage.getItem("currentUser"), "logout");
    console.log("已登出");
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  // getCurrentUserData(): User | null {
  //   return this.currentUserSubject.value;
  // }

  checkIsLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
