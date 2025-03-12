import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { PokelotteryComponent } from "./pokelottery.component";
import { PokelotteryModule } from "./pokelottery.module";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("PokelotteryComponent", () => {
  let component: PokelotteryComponent;
  let fixture: ComponentFixture<PokelotteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PokelotteryModule, HttpClientModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokelotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
