import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthLayoutComponent } from "./auth-layout.component";
import { AuthLayoutModule } from "./auth-layout.module";
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("AuthLayoutComponent", () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AuthLayoutModule, RouterTestingModule], // ✅ 導入 AuthLayoutModule
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // ✅ 忽略未知標籤錯誤
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the layout", () => {
    expect(component).toBeTruthy();
  });

  it("should render navbar and router outlet", () => {
    const compiled = fixture.nativeElement;

    const navbar = compiled.querySelector("app-auth-navbar");
    expect(navbar).toBeTruthy();
    const routerOutlet = compiled.querySelector("router-outlet");
    expect(routerOutlet).toBeTruthy();
  });
});
