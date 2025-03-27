import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { PokemonDictionarySearchBarComponent } from "./pokemon-dictionary-search-bar.component";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("PokemonDictionarySearchBarComponent", () => {
  let component: PokemonDictionarySearchBarComponent;
  let fixture: ComponentFixture<PokemonDictionarySearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PokemonDictionarySearchBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDictionarySearchBarComponent);
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

  // 測試搜尋框是否渲染並有正確的 placeholder
  it("should render search input with placeholder", () => {
    const inputElement = fixture.debugElement.query(
      By.css(".search-bar")
    ).nativeElement;
    expect(inputElement).toBeTruthy();
    expect(inputElement.placeholder).toBe("搜尋寶可夢...");
  });

  // 測試輸入變化觸發防抖並發出 queryChange 事件
  it("should emit queryChange event after debounce time", fakeAsync(() => {
    const spy = spyOn(component.queryChange, "emit"); // 監聽 queryChange 事件
    component.searchQuery = "Pikachu"; // 模擬使用者輸入
    component.handleInputChange();

    expect(spy).not.toHaveBeenCalled(); // 在防抖時間內不應觸發

    tick(300); // 模擬 300ms 時間過去
    expect(spy).toHaveBeenCalledWith("Pikachu"); // 防抖後應觸發
  }));

  // 測試輸入法組成期間不觸發事件
  it("should not emit queryChange during composition", () => {
    const spy = spyOn(component.queryChange, "emit");
    component.isComposing = true; // 模擬輸入法組成中
    component.searchQuery = "皮卡";
    component.handleInputChange();

    expect(spy).not.toHaveBeenCalled(); // 組成期間不觸發
  });

  // 組字完成發出查詢
  it("should emit query on composition end", fakeAsync(() => {
    spyOn(component.queryChange, "emit");
    const inputElement = fixture.nativeElement.querySelector(".search-bar");

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
    const inputElement = fixture.nativeElement.querySelector(".search-bar");

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

  it("should handle input from template and emit queryChange", fakeAsync(() => {
    const spy = spyOn(component.queryChange, "emit");
    const inputElement = fixture.nativeElement.querySelector(".search-bar");

    inputElement.value = "妙蛙種子";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.searchQuery).toBe("妙蛙種子"); // 確認 ngModel 更新
    expect(spy).not.toHaveBeenCalled(); // 防抖尚未完成

    tick(300); // 等待防抖時間
    expect(component.searchQuery).toBe("妙蛙種子");
  }));
});
