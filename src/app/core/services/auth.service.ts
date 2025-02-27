import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { USER_LIST } from "../data/user.data";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor() {}

  public login(email: string, password: string): boolean {
    const foundUser = USER_LIST.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      this.currentUserSubject.next(foundUser);
      console.log("登入成功，訓練家：", foundUser.name);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.currentUserSubject.next(null);
    console.log("已登出");
  }

  // $ 代表這是一個 Observable 物件
  getCurrentUser$() {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUserData(): User | null {
    return this.currentUserSubject.value;
  }

  checkIsLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
