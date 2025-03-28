import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { PokemonDictionaryComponent } from "./pokemon-dictionary.component";
import { PokemonDictionaryModule } from "./pokemon-dictionary.module";
import { PokemonService } from "../../../core/services/pokemon.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { PokemonDictionaryTableComponent } from "./components/pokemon-dictionary-table/pokemon-dictionary-table.component";

// 模擬資料
const MOCK_POKEMON_LIST = [
  {
    pokemonName: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    speciesName: "bulbasaur",
    speciesUrl: "https://pokeapi.co/api/v2/pokemon-species/1/",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    names: {
      englishName: "Bulbasaur",
      traditionalChineseName: "妙蛙種子",
      simplifiedChineseName: "妙蛙种子",
      koreanName: "이상해씨",
      japaneseName: "フシギダネ",
    },
  },
  {
    pokemonName: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
    speciesName: "ivysaur",
    speciesUrl: "https://pokeapi.co/api/v2/pokemon-species/2/",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    names: {
      englishName: "Ivysaur",
      traditionalChineseName: "妙蛙草",
      simplifiedChineseName: "妙蛙草",
      koreanName: "이상해풀",
      japaneseName: "フシギソウ",
    },
  },
];

describe("PokemonDictionaryComponent", () => {
  let component: PokemonDictionaryComponent;
  let fixture: ComponentFixture<PokemonDictionaryComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(async(() => {
    const pokeSpy = jasmine.createSpyObj("PokemonService", [
      "getFullPokemonDictionary",
    ]);
    pokeSpy.getFullPokemonDictionary.and.returnValue(of(MOCK_POKEMON_LIST));

    TestBed.configureTestingModule({
      imports: [PokemonDictionaryModule, HttpClientModule],
      providers: [{ provide: PokemonService, useValue: pokeSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDictionaryComponent);
    component = fixture.componentInstance;
    pokemonServiceSpy = TestBed.get(
      PokemonService
    ) as jasmine.SpyObj<PokemonService>;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // 測試初始話時載入資料
  it("should load pokemon data on initialization", () => {
    expect(pokemonServiceSpy.getFullPokemonDictionary).toHaveBeenCalledWith(
      0,
      10
    );
    expect(component.pokemonDictionaryList).toEqual(MOCK_POKEMON_LIST);
    expect(component.filteredPokemonList).toEqual(MOCK_POKEMON_LIST);
    expect(component.isLoading).toBe(false);
  });

  // 測試搜尋功能
  it("should filter pokemon list based on search query", () => {
    component.pokemonDictionaryList = MOCK_POKEMON_LIST;
    component.updateSearchQuery("妙蛙草");
    fixture.detectChanges();

    expect(component.filteredPokemonList.length).toBe(1);
    expect(component.filteredPokemonList[0].names.englishName).toBe("Ivysaur");
  });

  // 測試搜尋空字串時顯示所有資料
  it("should show all pokemon when search query is empty", () => {
    component.pokemonDictionaryList = MOCK_POKEMON_LIST;
    component.updateSearchQuery("");
    fixture.detectChanges();

    expect(component.filteredPokemonList).toEqual(MOCK_POKEMON_LIST);
  });

  // 測試下一頁功能
  it("should increase offset and page number on enxtPage", () => {
    const initalOffset = component.offset;
    const initalPage = component.currentPage;

    component.nextPage();
    fixture.detectChanges();

    expect(component.offset).toBe(initalOffset + component.limit);
    expect(component.currentPage).toBe(initalPage + 1);
    expect(pokemonServiceSpy.getFullPokemonDictionary).toHaveBeenCalledWith(
      component.offset,
      component.limit
    );
  });

  // 測試上一頁按鈕在第一頁時不動作
  it("should not change offset or page on prevPage when on first page", () => {
    component.offset = 0;
    component.currentPage = 1;

    // 重置間諜的呼叫記錄，避免 ngOnInit 的影響
    pokemonServiceSpy.getFullPokemonDictionary.calls.reset();

    // Act: 嘗試回到上一頁
    component.prevPage();
    fixture.detectChanges();

    // Assert: 驗證 offset 和 page 未變，且服務未被呼叫
    expect(component.offset).toBe(0);
    expect(component.currentPage).toBe(1);
    expect(pokemonServiceSpy.getFullPokemonDictionary).not.toHaveBeenCalled();
  });

  // 測試頁面渲染
  it("should render title and pagination controls", () => {
    const title = fixture.debugElement.query(
      By.css(".pokemon-dictionary-title")
    );
    expect(title.nativeElement.textContent).toBe("寶可夢多語名稱對照表");

    const pagination = fixture.debugElement.query(
      By.css(".pagination-controls")
    );
    expect(pagination).toBeTruthy();
    // toBe指的是完全相等(===)，而toContain則是檢查某個值是否包含某個子集。expect('Hello world').toContain('world'); // 通過，因為包含 'world'
    // pagination 裏面包含多個子元素，textContent 會把所有子元素的文字合併起來（例如 "上一頁第 1 頁下一頁"），因此用 toContain 來檢查第1頁是否存在。
    expect(pagination.nativeElement.textContent).toContain("第 1 頁");
  });

  // 測試子元件接收正確的輸入
  it("should pass filteredPokemonList and isLoading to pokemon-dictonary-table", () => {
    component.filteredPokemonList = MOCK_POKEMON_LIST;
    component.isLoading = false;
    fixture.detectChanges();

    const tableComponent = fixture.debugElement.query(
      By.directive(PokemonDictionaryTableComponent)
    ).componentInstance as PokemonDictionaryTableComponent;
    expect(tableComponent.pokemonList).toEqual(MOCK_POKEMON_LIST);
    expect(tableComponent.isLoading).toBe(false);
  });
});
