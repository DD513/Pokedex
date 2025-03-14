import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TravelFoodCardComponent } from "./travel-food-card.component";
import { TravelFood } from "../../../../core/models/travel-food.model";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("TravelFoodCardComponent", () => {
  let component: TravelFoodCardComponent;
  let fixture: ComponentFixture<TravelFoodCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TravelFoodCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelFoodCardComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the correct restaurant name", () => {
    component.travelFoodItem = {
      Name: "海底撈",
      Address: "台北市信義區",
      Tel: "02-1234-5678",
      PicURL: "https://example.com/image.jpg",
      Url: "https://example.com",
    } as TravelFood;

    fixture.detectChanges();

    const titleElement: HTMLElement =
      fixture.nativeElement.querySelector(".card-title");
    expect(titleElement.textContent).toContain("海底撈");
  });

  it("should display the correct image if PicURL is provided", () => {
    component.travelFoodItem = {
      PicURL: "https://example.com/image.jpg",
    } as TravelFood;

    fixture.detectChanges();

    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector(".card-img");
    expect(imgElement.src).toContain("https://example.com/image.jpg");
  });

  it("should use fallback image if PicURL is not provided", () => {
    component.travelFoodItem = {
      PicURL: "",
    } as TravelFood;
    component.fallbackImage = "assets/images/no-travel-food.png";

    fixture.detectChanges();

    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector(".card-img");
    expect(imgElement.src).toContain("assets/images/no-travel-food.png");
  });

  it("should contain a link if Url exists", () => {
    component.travelFoodItem = {
      Url: "https://example.com",
    } as TravelFood;

    fixture.detectChanges();

    const linkElement: HTMLAnchorElement =
      fixture.nativeElement.querySelector(".shadow-card");
    expect(linkElement.href).toContain("https://example.com");
  });

  it("should not contain a link if Url does not exist", () => {
    component.travelFoodItem = {
      Url: "",
    } as TravelFood;

    fixture.detectChanges();

    const linkElement: HTMLAnchorElement =
      fixture.nativeElement.querySelector(".shadow-card");
    expect(linkElement.href).toBeUndefined;
  });
});
