import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonDictionaryTableComponent } from "./pokemon-dictionary-table.component";
import { By } from "@angular/platform-browser";
import { IMAGE_PATHS } from "../../../../../core/constants/image-paths";

describe("PokemonDictionaryTableComponent", () => {
  let component: PokemonDictionaryTableComponent;
  let fixture: ComponentFixture<PokemonDictionaryTableComponent>;

  // 模擬 IMAGE_PATHS 常數
  const MOCK_IMAGE_PATHS = {
    POKEMON_DICTIONARY_NOT_FOUND:
      "assets/images/pokemon-dictionary-not-found.png",
  };

  // 模擬資料
  const mockPokemonList = [
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDictionaryTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDictionaryTableComponent);
    component = fixture.componentInstance;
    // 手動設置 notFound 值，因為它在 constructor 中賦值
    component.notFound = MOCK_IMAGE_PATHS.POKEMON_DICTIONARY_NOT_FOUND;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // 測試預設樣式(無資料且未載入)
  it("should show no results when pokemonList is empty and not loading", () => {
    component.pokemonList = [];
    component.isLoading = false;
    fixture.detectChanges();

    const noResultsElement = fixture.debugElement.query(By.css(".no-results"));
    expect(noResultsElement).toBeTruthy();
    expect(noResultsElement.nativeElement.textContent).toContain(
      "沒有尋找到寶可夢",
      "Should display no results message"
    );

    const imgElement = noResultsElement.query(By.css(".no-results-img"));
    expect(imgElement).toBeTruthy("No results image should be present");
    expect(imgElement.nativeElement.getAttribute("src")).toBe(
      MOCK_IMAGE_PATHS.POKEMON_DICTIONARY_NOT_FOUND,
      "Image src should match the not found path"
    );
  });

  // 測試載入狀態
  it("should display loading animation when isLoading is true", () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css(".loading-dots"));

    expect(loadingElement).toBeTruthy("Loading dots should be present");
    const dots = loadingElement.queryAll(By.css("span"));
    expect(dots.length).toBe(3, "Should have three loading dots");
  });

  // 測試有資料時的表格渲染
  it("should render pokemon data when pokemonList has items and not loading", () => {
    component.pokemonList = mockPokemonList;
    component.isLoading = false;
    fixture.detectChanges();

    // Assert: 驗證表格內容
    const rows = fixture.debugElement.queryAll(By.css("tbody tr"));
    expect(rows.length).toBe(2, "Should render two rows for two pokemon");

    // 檢查第一行 (Bulbasaur)
    const bulbasaurCells = rows[0].queryAll(By.css("td"));
    expect(bulbasaurCells.length).toBe(6, "Each row should have 6 columns");
    const bulbasaurImg = bulbasaurCells[0].query(By.css(".pokemon-img"));
    expect(bulbasaurImg.nativeElement.getAttribute("src")).toBe(
      mockPokemonList[0].imageUrl
    );
    expect(bulbasaurCells[1].nativeElement.textContent.trim()).toBe(
      "Bulbasaur"
    );

    // 檢查第二行 (Ivysaur)
    const ivysaurCells = rows[1].queryAll(By.css("td"));
    expect(ivysaurCells[1].nativeElement.textContent.trim()).toBe("Ivysaur");
  });

  // 測試無圖片時的行為
  it("should render row without image when imageUrl is missing", () => {
    // Arrange: 設置無圖片的資料
    component.pokemonList = [
      {
        ...mockPokemonList[0],
        imageUrl: undefined, // 移除圖片
      },
    ];
    component.isLoading = false;
    fixture.detectChanges();

    // Act & Assert: 驗證圖片不存在，但名稱仍顯示
    const imgElement = fixture.debugElement.query(By.css(".pokemon-img"));
    expect(imgElement).toBeNull("No image should be rendered");
    const englishCell = fixture.debugElement.query(By.css(".english-name"));
    expect(englishCell.nativeElement.textContent.trim()).toBe("Bulbasaur");
  });
});
