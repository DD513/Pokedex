import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { AuthService } from "./core/services/auth.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "./core/models/user.model";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("AppComponent", () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let currentUser$: BehaviorSubject<any>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj("AuthService", ["getCurrentUser"]);
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    // 初始化 `BehaviorSubject`，並確保 `next()` 立即有值
    currentUser$ = new BehaviorSubject<User | null>(null);
    authServiceSpy.getCurrentUser.and.returnValue(currentUser$.asObservable());

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it("should redirect to /pokedex if user is not logged in and tries to access a protected route", fakeAsync(() => {
  //   // 先設定 `router.url` 在建立元件之前
  //   Object.defineProperty(routerSpy, "url", {
  //     get: () => "/pokelottery",
  //     configurable: true,
  //   });

  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges(); // 觸發 `ngOnInit()`

  //   //  確保 `BehaviorSubject` 會發送未登入狀態
  //   currentUser$.next(null);

  //   tick(); // 等待非同步動作完成

  //   expect(routerSpy.navigate).toHaveBeenCalledWith(["/pokedex"]);
  // }));

  it("should Not redirect if user is logged in and tries to access a protected route", fakeAsync(() => {
    // 模擬當前網址為受保護頁面 "/pokelottery"
    Object.defineProperty(routerSpy, "url", { get: () => "/pokelottery" });

    currentUser$.next({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "password",
      image: "assets/images/User/John-doe.png",
    });

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    tick(); // 確保 `subscribe()` 內的邏輯已執行

    expect(routerSpy.navigate).not.toHaveBeenCalled(); // 確保沒有導向 `/pokedex`
  }));
});
