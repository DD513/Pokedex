// import { TestBed, inject } from "@angular/core/testing";
// import { Router } from "@angular/router";
// import { AuthGuard } from "./auth.guard";
// import { AuthService } from "../services/auth.service";
// import { RouterTestingModule } from "@angular/router/testing";
// import { of } from "rxjs";

// describe("AuthGuard", () => {
//   let authGuard: AuthGuard;
//   let authService: jasmine.SpyObj<AuthService>;
//   let router: jasmine.SpyObj<Router>;

//   beforeEach(() => {
//     // 建立 Mock 服務
//     const authServiceMock = jasmine.createSpyObj("AuthService", [
//       "checkIsLoggedIn",
//     ]);
//     const routerMock = jasmine.createSpyObj("Router", ["navigate"]);

//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule], // 模擬 RouterModule
//       providers: [
//         AuthGuard,
//         { provide: AuthService, useValue: authServiceMock },
//         { provide: Router, useValue: routerMock },
//       ],
//     });

//     // 取得注入的服務
//     authGuard = TestBed.inject(AuthGuard);
//     authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//   });

//   it("should be created", () => {
//     expect(authGuard).toBeTruthy();
//   });

//   it("should allow navigation if user is logged in", () => {
//     authService.checkIsLoggedIn.and.returnValue(true); // 模擬使用者已登入
//     expect(authGuard.canActivate(null, null)).toBeTrue();
//     expect(router.navigate).not.toHaveBeenCalled(); // 不應該導航
//   });

//   it("should navigate to /pokedex if user is not logged in", () => {
//     authService.checkIsLoggedIn.and.returnValue(false); // 模擬使用者未登入
//     expect(authGuard.canActivate(null, null)).toBeFalse();
//     expect(router.navigate).toHaveBeenCalledWith(["/pokedex"]); // 確保導航至 `/pokedex`
//   });
// });
