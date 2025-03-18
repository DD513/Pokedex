import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "../../../shared/shared.module";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { By } from "@angular/platform-browser";
import { IMAGE_PATHS } from "../../../core/constants/image-paths";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj("AuthService", [
      "login",
      "checkIsLoggedIn",
    ]);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, SharedModule],
      providers: [{ provide: AuthService, useValue: authSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService) as jasmine.SpyObj<AuthService>;
    spyOn(router, "navigateByUrl");
    spyOn(router, "navigate");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set loginPikachuLogo from IMAGE_PATHS", () => {
    expect(component.loginPikachuLogo).toBe(IMAGE_PATHS.LOGIN_PIKACHU_LOGO);
  });

  it("should navigate to home when Pikachu image is clicked", () => {
    const PikachuImg = fixture.debugElement.query(By.css(".pikachu-img"));
    PikachuImg.triggerEventHandler("click", null);

    expect(router.navigateByUrl).toHaveBeenCalledWith("/");
  });

  it("should navigate to pokedex on login success", () => {
    component.handleLoginSuccess();
    expect(router.navigate).toHaveBeenCalledWith(["/pokedex"]);
  });

  it("should call handleLoginSuccess when login-form emits loginSuccess", () => {
    spyOn(component, "handleLoginSuccess");
    const loginForm = fixture.debugElement.query(By.css("app-login-form"));
    expect(loginForm).not.toBeNull(); // 確保找到元件
    loginForm.triggerEventHandler("loginSuccess", null); // 手動觸發事件
    expect(component.handleLoginSuccess).toHaveBeenCalled();
  });
});
