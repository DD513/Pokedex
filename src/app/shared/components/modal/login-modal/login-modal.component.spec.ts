import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { LoginModalComponent } from "./login-modal.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("LoginModalComponent", () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginModalComponent],
      imports: [FormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit loginCompleted and close when handleLoginSuccess() is called", () => {
    spyOn(component.loginCompleted, "emit");
    spyOn(component, "closeModal");

    component.handleLoginSuccess();

    expect(component.loginCompleted.emit).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it("should switch to register form when switchToRegister() is called", () => {
    component.switchToRegister();
    expect(component.isRegistering).toBe(true);
  });

  it("should switch to login form when handleRegisterSuccess() is called", () => {
    component.isRegistering = true;
    component.handleRegisterSuccess();
    expect(component.isRegistering).toBe(false);
  });

  it("should close modal when overlay is clicked", () => {
    spyOn(component, "closeModal");

    const overlay = fixture.nativeElement.querySelector(".login-modal-overlay");
    overlay.click();

    expect(component.closeModal).toHaveBeenCalled();
  });

  it("should not close modal when clicking inside the modal", () => {
    spyOn(component, "closeModal");

    const modal = fixture.nativeElement.querySelector(".login-modal");
    modal.click();

    expect(component.closeModal).not.toHaveBeenCalled();
  });
});
