import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { PokedexSearchBarComponent } from "./search-bar.component";
import { FormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("PokedexSearchBarComponent", () => {
  let component: PokedexSearchBarComponent;
  let fixture: ComponentFixture<PokedexSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PokedexSearchBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // 測試初始狀態
  it("should initialize with empty search query and isComposing false", () => {
    expect(component.searchQuery).toBe("");
    expect(component.isComposing).toBe(false);
  });

  // 測試輸入變化觸發 handleInputChange
  it("should call handleInputChange on input change and emit query when not composing", fakeAsync(() => {
    spyOn(component.queryChange, "emit"); // 監聽事件觸發
    const inputElement = fixture.nativeElement.querySelector(".search-box");

    // 模擬用戶輸入：直接設置 input 的值並觸發事件
    inputElement.value = "皮卡丘";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges(); // 同步 ngModel

    // 等待防抖時間 (300ms)
    tick(300);

    expect(component.searchQuery).toBe("皮卡丘"); // 確認值已更新
    expect(component.queryChange.emit).toHaveBeenCalledWith("皮卡丘");
  }));

  // 拼寫過程中不應發出查詢
  it("should not emit query during composition", fakeAsync(() => {
    spyOn(component.queryChange, "emit");
    const inputElement = fixture.nativeElement.querySelector(".search-box");

    component.isComposing = true;
    inputElement.value = "皮";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    tick(300);
    expect(component.queryChange.emit).not.toHaveBeenCalled();
  }));

  // 組字完成發出查詢
  it("should emit query on composition end", fakeAsync(() => {
    spyOn(component.queryChange, "emit");
    const inputElement = fixture.nativeElement.querySelector(".search-box");

    component.isComposing = true;
    inputElement.value = "皮卡丘";
    inputElement.dispatchEvent(new Event("input")); // 模擬輸入
    component.handleCompositionEnd(); // 模擬組字結束
    fixture.detectChanges();

    tick(300);

    expect(component.isComposing).toBe(false);
    expect(component.queryChange.emit).toHaveBeenCalledWith("皮卡丘");
  }));

  // debounce 300ms 測試
  it("should debounce query emission by 300ms", fakeAsync(() => {
    spyOn(component.queryChange, "emit");
    const inputElement = fixture.nativeElement.querySelector(".search-box");

    // 模擬快速輸入
    inputElement.value = "皮";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    tick(100);

    inputElement.value = "皮卡";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    tick(100);

    inputElement.value = "皮卡丘";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.queryChange.emit).not.toHaveBeenCalled();

    tick(300);

    expect(component.queryChange.emit).toHaveBeenCalledWith("皮卡丘");
    expect(component.queryChange.emit).toHaveBeenCalledTimes(1);
  }));

  it("should update searchQuery via ngModal", () => {
    const inputElement = fixture.nativeElement.querySelector(".search-box");

    inputElement.value = "妙蛙種子";
    inputElement.dispatchEvent(new Event("input"));

    fixture.detectChanges();

    expect(component.searchQuery).toBe("妙蛙種子");
  });
});
