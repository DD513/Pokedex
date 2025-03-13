import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NotFoundComponent } from "./not-found.component";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser"; // ✅ 幫助測試 DOM 元素

describe("NotFoundComponent", () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have correct routerLink to home", () => {
    const buttonElement = fixture.debugElement.query(By.css("a"))
      .nativeElement as HTMLAnchorElement;
    expect(buttonElement.getAttribute("routerLink")).toBe("/");
  });
});
