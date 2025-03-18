import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { PokemonNavbarComponent } from "./pokemon-navbar.component";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../../../../core/services/auth.service";
import { of, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

import { SharedModule } from "../../../../shared/shared.module";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("PokemonNavbarComponent", () => {
  let component: PokemonNavbarComponent;
  let fixture: ComponentFixture<PokemonNavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let currentUser$: BehaviorSubject<any>;
  let toastSpy: any;

  beforeEach(async(() => {
    // 模擬 AuthService
    authServiceSpy = jasmine.createSpyObj("AuthService", [
      "getCurrentUser",
      "logout",
    ]);

    // 建立一個 BehaviorSubject 來模擬即時登入狀態
    currentUser$ = new BehaviorSubject(null);
    authServiceSpy.getCurrentUser.and.returnValue(currentUser$.asObservable());

    // 模擬 Router
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      declarations: [PokemonNavbarComponent],
      imports: [SharedModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonNavbarComponent);
    component = fixture.componentInstance;

    // 建立 toast spy 對象
    toastSpy = { showToastMessage: jasmine.createSpy("showToastMessage") };
    component.toast = toastSpy as any;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // 點擊個人資訊區塊可切換下拉選單
  it("should toggle dropdown when clicked", () => {
    const mockEvent = new Event("click");
    spyOn(mockEvent, "stopPropagation");
    expect(component.isDropdownOpen).toBe(false);

    component.toggleDropdown(mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled(); // ✅ 確保 `stopPropagation` 被調用
    expect(component.isDropdownOpen).toBe(true);

    component.toggleDropdown(mockEvent);
    expect(component.isDropdownOpen).toBe(false);
  });

  // 點擊選單外部可關閉下拉選單
  it("should close dropwown when clicking outside", () => {
    component.isDropdownOpen = true;
    const outsideEvent = new Event("click");
    // 創建一個 click 事件，並模擬點擊發生在選單外部
    spyOnProperty(outsideEvent, "target", "get").and.returnValue(
      document.createElement("div")
    );

    component.closeDropdown(outsideEvent);
    expect(component.isDropdownOpen).toBe(false);
  });

  // 點擊選單內部不可關閉下拉選單
  it("should not cloes dropdown when clicking inside dropdown menu", () => {
    component.isDropdownOpen = true;
    const insideEvent = new Event("click");

    // 模擬點擊選單內部的元素（例如：.dropdown-menu 裡面的內容）
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");

    spyOnProperty(insideEvent, "target", "get").and.returnValue(dropdownMenu);
    component.closeDropdown(insideEvent);
    expect(component.isDropdownOpen).toBe(true);
  });

  // 點擊導覽選單後關閉下拉選單
  // it("should close dropdown when navigating to a page", () => {
  //   component.isDropdownOpen = true;
  //   component.navigateTo("/pokedex");

  //   expect(routerSpy.navigate).toHaveBeenCalledWith(["/pokedex"]);
  //   expect(component.isDropdownOpen).toBe(false);
  // });

  // 點擊登出後關閉選單，並觸發 authService.logout()
  it("should logout and close dropdown when logout is called", () => {
    component.isDropdownOpen = true;
    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(component.isDropdownOpen).toBe(false);
    expect(component.isLoggedIn).toBe(false);
    expect(toastSpy.showToastMessage).toHaveBeenCalledWith("登出成功！");
  });

  // 驗證 handleProtectedRouteNavigation() 的邏輯
  // describe('handleProtectedRouteNavigation', () => {
  //   // 登入後成功導航到保護路由
  //   it("should navigate to protected route when user is logged in", () => {
  //     component.isLoggedIn = true;
  //     component.handleProtectedRouteNavigation('/pokelottery');

  //     expect(routerSpy.navigate).toHaveBeenCalledWith(['/pokelottery']);
  //     expect(component.isDropdownOpen).toBe(false);
  //   });

  //   // 未登入時點擊保護路由，開啟登入彈窗
  //   it("should open login modal and save pending route when user is not logged in", () => {
  //     component.isLoggedIn = false;
  //     component.handleProtectedRouteNavigation('/pokelottery');

  //     expect(component.isLoginModalOpen).toBe(true);
  //     expect(component.pendingRedirectAfterLogin).toBe(true);
  //     expect(component.pendingRouteAfterLogin).toBe('/pokelottery');
  //     expect(routerSpy.navigate).not.toHaveBeenCalled();
  //   });
  // });

  // 測試處理登入完成事件
  describe("handleLoginCompleted", () => {
    it("should close modal and show success toast", () => {
      component.handleLoginCompleted();

      expect(component.isLoginModalOpen).toBe(false);
      expect(toastSpy.showToastMessage).toHaveBeenCalledWith(
        "登入成功！開始冒險吧！"
      );
    });

    // it("should navigate to pending route if one exists", () => {
    //   component.toast = { showToastMessage: jasmine.createSpy('showToastMessage') } as any;
    //   component.pendingRedirectAfterLogin = true;
    //   component.pendingRouteAfterLogin = '/pokelottery';

    //   component.handleLoginCompleted();

    //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/pokelottery']);
    //   expect(component.pendingRedirectAfterLogin).toBe(false);
    //   expect(component.pendingRouteAfterLogin).toBe(null);
    // });

    // it("should not navigate if no pending route exists", () => {
    //   component.toast = { showToastMessage: jasmine.createSpy('showToastMessage') } as any;
    //   component.pendingRedirectAfterLogin = false;
    //   component.pendingRouteAfterLogin = null;

    //   component.handleLoginCompleted();

    //   expect(routerSpy.navigate).not.toHaveBeenCalled();
    // });
  });

  // 測試登入狀態變更時的用戶資訊更新
  describe("user authentication state", () => {
    it("should update user info when logged in", () => {
      const mockUser = {
        name: "Ash Ketchum",
        email: "ash@gmail.com",
        image: "Ash.png",
      };

      currentUser$.next(mockUser);
      fixture.detectChanges();

      expect(component.isLoggedIn).toBe(true);
      expect(component.userName).toBe("Ash Ketchum");
      expect(component.userEmail).toBe("ash@gmail.com");
      expect(component.userAvatar).toBe("Ash.png");
    });

    it("should use default info when not logged in", () => {
      currentUser$.next(null);
      fixture.detectChanges();

      expect(component.isLoggedIn).toBe(false);
      expect(component.userName).toBe("未知的冒險者");
      expect(component.userEmail).toBe("");
      expect(component.userAvatar).toBe(component.defaultAvatar);
    });
  });

  // 測試打開登入 Modal
  it("should open login modal and close dropdown", () => {
    component.isDropdownOpen = true;
    component.openLoginModal();

    expect(component.isLoginModalOpen).toBe(true);
    expect(component.isDropdownOpen).toBe(false);
  });
});
