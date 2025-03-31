import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthNavbarComponent } from "./auth-navbar.component";
import { AuthLayoutModule } from "../auth-layout.module";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("AuthNavbarComponent", () => {
  let component: AuthNavbarComponent;
  let fixture: ComponentFixture<AuthNavbarComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AuthLayoutModule],
      providers: [{ provide: Router, useValue: routerSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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

  it("should navigate to home when logo is clicked", () => {
    const compiled = fixture.nativeElement;
    // const logo = compiled.querySelector(".auth-navbar-logo");
    const logo = compiled.querySelector("[data-test='auth-navbar-logo']");

    logo.click();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith("/");
  });
});
