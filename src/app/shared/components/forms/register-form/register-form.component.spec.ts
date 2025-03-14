import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { RegisterFormComponent } from "./register-form.component";
import { AuthService } from "../../../../core/services/auth.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("RegisterFormComponent", () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    // **Mock AuthService**
    // createSpyObj() 建立出來的物件型別是 jasmine.spyObj<T>
    authServiceSpy = jasmine.createSpyObj("AuthService", ["register"]);

    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [RegisterFormComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set form fields correctly", () => {
    // **直接設定 component 變數**
    component.username = "kyujin";
    component.email = "kyujin@gmail.com";
    component.password = "password";
    component.confirmPassword = "password";

    expect(component.username).toBe("kyujin");
    expect(component.email).toBe("kyujin@gmail.com");
    expect(component.password).toBe("password");
    expect(component.confirmPassword).toBe("password");
  });

  it("should show error if fields are empty", () => {
    component.onSubmitForm(new Event("submit")); // 模擬表單送出

    expect(component.errorMessage).toBe("所有欄位皆為必填");
    expect(authServiceSpy.register).not.toHaveBeenCalled(); // 確保未調用 AuthService
  });

  // fakeAsync 負責測試 setTimeout、Promise 或 Observable 這類非同步行為
  it("should call AuthService.register() when submitting", fakeAsync(() => {
    authServiceSpy.register.and.returnValue(true);
    spyOn(component.registerSuccess, "emit");

    component.username = "kyujin";
    component.email = "kyujin@gmail.com";
    component.password = "password";
    component.confirmPassword = "password";

    component.onSubmitForm(new Event("submit")); // 手動呼叫表單送出

    // tick() 用來模擬時間的推進，手動觸發非同步任務的執行。
    tick();
    fixture.detectChanges();

    expect(authServiceSpy.register).toHaveBeenCalledWith(
      "kyujin",
      "kyujin@gmail.com",
      "password"
    );
    expect(component.registerSuccess.emit).toHaveBeenCalled();
    expect(component.errorMessage).toBe("");
  }));

  it("should show error message when registration fails", fakeAsync(() => {
    authServiceSpy.register.and.returnValue(false);

    component.username = "kyujin";
    component.email = "kyujin@gmail.com";
    component.password = "password";
    component.confirmPassword = "password";

    component.onSubmitForm(new Event("submit"));

    tick();
    fixture.detectChanges();

    expect(authServiceSpy.register).toHaveBeenCalledWith(
      "kyujin",
      "kyujin@gmail.com",
      "password"
    );
    expect(component.errorMessage).toBe("註冊失敗，請重試！");
  }));

  it("should emit switchToLogin event when login link is clicked", () => {
    spyOn(component.switchToLogin, "emit");

    const loginLink = fixture.nativeElement.querySelector(".login-link a");
    loginLink.click();

    expect(component.switchToLogin.emit).toHaveBeenCalled();
  });
});
