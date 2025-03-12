import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthNavbarComponent } from "./auth-navbar.component";
import { AuthLayoutComponent } from "../auth-layout.component";
import { AuthLayoutModule } from "../auth-layout.module";
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("AuthNavbarComponent", () => {
  let component: AuthNavbarComponent;
  let fixture: ComponentFixture<AuthNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AuthLayoutModule], // 確保 Router 測試正常
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // 避免不必要錯誤
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
