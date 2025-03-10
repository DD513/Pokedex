import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { USER_LIST } from "../data/user.data";

@Injectable({
  providedIn: "root", // 使用 root，確保全局單例
})
export class AuthService {
  private currentUserSubject$ = new BehaviorSubject<User | null>(null);

  constructor() {
    // 檢查 localStorage 有沒有冒險者
    const userJson = localStorage.getItem("currentUser");
    if (userJson) {
      const userObj: User = JSON.parse(userJson);
      this.currentUserSubject$.next(userObj);
    }
  }

  public login(email: string, password: string): boolean {
    const user = USER_LIST.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.currentUserSubject$.next(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      console.log("登入成功，訓練家：", user.name);
      return true;
    } else {
      return false;
    }
  }

  public logout(): void {
    this.currentUserSubject$.next(null);
    localStorage.removeItem("currentUser");
    console.log("已登出");
  }

  public getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject$.asObservable();
  }

  // getCurrentUserData(): User | null {
  //   return this.currentUserSubject.value;
  // }

  public checkIsLoggedIn(): boolean {
    // value 與getValue()兩者都是取得當前保存得值，.value是TypeScript的屬性，.getValue()則會去訂閱Observable。
    return !!this.currentUserSubject$.getValue();
  }
}
