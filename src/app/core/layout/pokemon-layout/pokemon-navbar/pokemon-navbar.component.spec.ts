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
  // 驗證 handleProtectedRouteNavigation() 的邏輯
  // 登入後成功導航到保護路由
  // 未登入時點擊保護路由，開啟登入彈窗
});
