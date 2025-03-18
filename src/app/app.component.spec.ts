import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { AuthService } from "./core/services/auth.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "./core/models/user.model";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  // let routerSpy: jasmine.SpyObj<Router>;
  let router: Router; // 使用真實的 Router

  let currentUser$: BehaviorSubject<any>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj("AuthService", ["getCurrentUser"]);
    // routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    // 初始化 `BehaviorSubject`，並確保 `next()` 立即有值
    currentUser$ = new BehaviorSubject<User | null>(null);
    authServiceSpy.getCurrentUser.and.returnValue(currentUser$.asObservable());

    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule, RouterTestingModule.withRoutes([])], // 使用 RouterTestingModule
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        // 不直接覆蓋 Router，保留 RouterTestingModule 的實現
        // { provide: Router, useValue: routerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router); // 獲取真實 Router
    spyOn(router, "navigate"); // 監控 navigate 方法
  });

  it("should create the app", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // 使用者未登入跳轉到/pokedex
  it("should redirect to /pokedex if user is not logged in and tries to access a protected route", fakeAsync(() => {
    // 模擬當前網址為受保護路由
    Object.defineProperty(router, "url", {
      get: () => "/pokelottery",
      configurable: true,
    });

    currentUser$.next(null); // 未登入狀態
    fixture.detectChanges(); // 觸發 ngOnInit
    tick(); // 等待訂閱完成

    expect(router.navigate).toHaveBeenCalledWith(["/pokedex"]);
  }));

  // 使用者登入狀態，在保護路由中不會被導轉到/pokedex
  it("should Not redirect if user is logged in and tries to access a protected route", fakeAsync(() => {
    // 模擬當前網址為受保護頁面 "/pokelottery"
    Object.defineProperty(router, "url", {
      get: () => "/pokelottery",
      configurable: true,
    });

    currentUser$.next({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "password",
      image: "assets/images/User/John-doe.png",
    });

    fixture.detectChanges(); // 觸發 ngOnInit
    tick(); // 等待訂閱完成

    expect(router.navigate).not.toHaveBeenCalled(); // 確保沒有導向 `/pokedex`
  }));

  // 使用者未登入狀態，點擊非保護路由
  it("should not redirect if user is not logged in and accesses a non-protected route", fakeAsync(() => {
    // 模擬當前網址為非受保護路由
    Object.defineProperty(router, "url", {
      get: () => "/pokedex",
      configurable: true,
    });

    currentUser$.next(null); // 未登入狀態
    fixture.detectChanges(); // 觸發 ngOnInit
    tick(); // 等待訂閱完成

    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it("should unsubscribe from authService on destroy", () => {
    spyOn(component["destroy$"], "next"); // 監控 destroy$ 的 next 方法
    spyOn(component["destroy$"], "complete"); // 監控 destroy$ 的 complete 方法

    fixture.detectChanges(); // 初始化元件
    component.ngOnDestroy();

    expect(component["destroy$"].next).toHaveBeenCalled();
    expect(component["destroy$"].complete).toHaveBeenCalled();
  });
});
