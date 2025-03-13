import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { LoginFormComponent } from "./login-form.component";
import { AuthService } from "../../../../core/services/auth.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("LoginFormComponent", () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    // Mock AuthService
    authServiceSpy = jasmine.createSpyObj("AuthService", ["login"]);

    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [LoginFormComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA], // 避免 Angular 測試時解析 app-login-form
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call onSubmitForm() when login button is clicked", () => {
    spyOn(component, "onSubmitForm");

    const loginButton = fixture.nativeElement.querySelector(
      ".pokedex-login-button"
    );
    loginButton.click();

    expect(component.onSubmitForm).toHaveBeenCalled();
  });

  it("should emit loginSuccess when login is successful", () => {
    authServiceSpy.login.and.returnValue(true); // 模擬登入成功
    spyOn(component.loginSuccess, "emit");

    component.email = "test@gmail.com";
    component.password = "password";
    component.onSubmitForm(new Event("submit"));

    expect(authServiceSpy.login).toHaveBeenCalledWith(
      "test@gmail.com",
      "password"
    );
    expect(component.loginSuccess.emit).toHaveBeenCalled(); // 確保事件被觸發
    expect(component.errorMessage).toBe(""); // 確保沒有錯誤訊息
  });

  it("should show error message when login fails", fakeAsync(() => {
    authServiceSpy.login.and.returnValue(false);

    component.email = "test@gmail.com";
    component.password = "wrongpassword";

    component.onSubmitForm(new Event("submit"));

    tick();
    fixture.detectChanges();

    expect(authServiceSpy.login).toHaveBeenCalledWith(
      "test@gmail.com",
      "wrongpassword"
    );
    expect(component.errorMessage).toBe("無法展開冒險，請重試！");
  }));

  it("should emit switchToRegister event when register link is clicked", () => {
    spyOn(component.switchToRegister, "emit");

    const registerLink =
      fixture.nativeElement.querySelector(".register-link a");
    registerLink.click();

    expect(component.switchToRegister.emit).toHaveBeenCalled();
  });
});
