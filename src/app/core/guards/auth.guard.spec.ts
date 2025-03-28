import { TestBed, async } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "../services/auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

describe("AuthGuard", () => {
  let authGuard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  // 模擬路由快照 (ActivatedRouteSnapshot 和 RouterStateSnapshot)
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = { url: "/protected" } as RouterStateSnapshot;

  beforeEach(() => {
    // 模擬 AuthService
    const authSpy = jasmine.createSpyObj("AuthService", ["checkIsLoggedIn"]);
    // 模擬 Router
    const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // 模擬 RouterModule
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    // 取得注入的服務
    authGuard = TestBed.get(AuthGuard);
    authServiceSpy = TestBed.get(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.get(Router) as jasmine.SpyObj<Router>;
  });

  it("should be created", () => {
    expect(authGuard).toBeTruthy();
  });

  // 測試已登入的情況
  it("should allow activation when user is logged in", () => {
    // Arrange: 模擬已登入
    authServiceSpy.checkIsLoggedIn.and.returnValue(true);

    // Act: 執行 canActivate
    const result = authGuard.canActivate(mockRoute, mockState);

    // Assert: 確認返回 true，且不導航
    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  // 測試未登入的情況
  it("should deny activation and redirect to /pokedex when user is not logged in", () => {
    // Arrange: 模擬未登入
    authServiceSpy.checkIsLoggedIn.and.returnValue(false);

    // Act: 執行 canActivate
    const result = authGuard.canActivate(mockRoute, mockState);

    // Assert: 確認返回 false，且導航到 /pokedex
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(["/pokedex"]);
  });
});
