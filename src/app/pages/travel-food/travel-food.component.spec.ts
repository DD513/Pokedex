import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TravelFoodComponent } from "./travel-food.component";
import { TravelFoodModule } from "./travel-food.module";
import { ApiService } from "../../core/services/api.service";
import { of } from "rxjs";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("TravelFoodComponent", () => {
  let component: TravelFoodComponent;
  let fixture: ComponentFixture<TravelFoodComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const mockTravelFoodList = [
    {
      ID: "01_117",
      Name: "三富休閒農場",
      Address: "宜蘭縣中山村新寮二路161巷88號",
      Tel: "03-958-8690",
      PicURL: "https://example.com/image.jpg",
      Url: "https://example.com",
    },
    {
      ID: "02_220",
      Name: "海底油餐廳",
      Address: "台北市信義區",
      Tel: "02-1234-5678",
      PicURL: "",
      Url: "",
    },
  ];

  beforeEach(async(() => {
    // 建立 ApiService 偵測物件
    apiServiceSpy = jasmine.createSpyObj("ApiService", ["getTravelFoodData"]);
    apiServiceSpy.getTravelFoodData.and.returnValue(of(mockTravelFoodList)); // 正確回傳 Observable

    TestBed.configureTestingModule({
      imports: [TravelFoodModule, HttpClientTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // 觸發 `ngOnInit()`，並執行 `getTravelFoodData()`
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  //  測試 API 呼叫與資料綁定
  it("should call getTravelFoodData and populate travelFoodList", () => {
    expect(apiServiceSpy.getTravelFoodData).toHaveBeenCalled();
    expect(component.travelFoodList.length).toBe(2);
    expect(component.travelFoodList[0].Name).toBe("三富休閒農場");
  });
});
