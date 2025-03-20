import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { PokedexComponent } from "./pokedex.component";
import { PokedexModule } from "./pokedex.module";
import { PokemonService } from "../../../core/services/pokemon.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ViewMode } from "../../../core/constants/enums/view-mode.enum";
import { Pokemon } from "../../../core/models/pokemon.model";
import { BehaviorSubject } from "rxjs";

describe("PokedexComponent", () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;
  let favoritesSubject: BehaviorSubject<Set<string>>; // 用於模擬收藏變化

  // 模擬的 Pokémon 資料
  const mockPokemonList: Pokemon[] = [
    {
      Code: "#001",
      Category: "種子寶可夢",
      ChineseName: "妙蛙種子",
      EnglishName: "Bulbasaur",
      Description:
        "經常可見牠在太陽下睡午覺的樣子。在沐浴了充足的陽光之後，牠背上的種子就會成長茁壯。",
      Img: "assets/images/Pokemon/Bulbasaur.png",
      Types: [{ Name: "草" }, { Name: "毒" }],
      Height: "0.7",
      Weight: "6.9",
      Abilities: [{ Name: "茂盛" }],
    },
    {
      Code: "#004",
      Category: "蜥蜴寶可夢",
      ChineseName: "小火龍",
      EnglishName: "Charmander",
      Description:
        "天生喜歡熱熱的東西。據說當牠被雨淋濕的時候，尾巴的末端會冒出煙來。",
      Img: "assets/images/Pokemon/Charmander.png",
      Types: [{ Name: "火" }],
      Height: "0.6",
      Weight: "8.5",
      Abilities: [{ Name: "猛火" }],
    },
  ];

  beforeEach(async(() => {
    // 創建 BehaviorSubject 用於模擬收藏變化
    favoritesSubject = new BehaviorSubject<Set<string>>(new Set());

    // 模擬 PokemonService
    const pokeSpy = jasmine.createSpyObj("PokemonService", [
      "getAllPokemon",
      "searchPokemon",
      "checkIsFavorite",
      "toggleFavorite",
      "clearFavorites",
      "getFavoritesObservable",
      "getTypeColor",
    ]);

    // 設置模擬行為
    pokeSpy.getAllPokemon.and.returnValue(mockPokemonList);
    pokeSpy.searchPokemon.and.returnValue(mockPokemonList);
    pokeSpy.checkIsFavorite.and.returnValue(false);
    pokeSpy.toggleFavorite.and.callFake(() => {});
    pokeSpy.clearFavorites.and.callFake(() => {});
    pokeSpy.getFavoritesObservable.and.returnValue(
      new BehaviorSubject<void>(undefined)
    );
    pokeSpy.getTypeColor.and.returnValue("#FFCB05");

    TestBed.configureTestingModule({
      imports: [PokedexModule, HttpClientModule],
      providers: [{ provide: PokemonService, useValue: pokeSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    pokemonServiceSpy = TestBed.get(PokemonService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // 呼叫 ngOnDestroy 清理訂閱，而不是直接存取私有屬性
    component.ngOnDestroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // 初始化頁面
  it("should initialize with all pokemon and view mode set to All", () => {
    expect(component.pokemonList).toEqual(mockPokemonList); // toEqual用來檢查它們的屬性或元素是否深度相等。
    expect(component.filteredPokemonList).toEqual(mockPokemonList);
    expect(component.currentViewMode).toBe(ViewMode.All);
    expect(component.searchQuery).toBe("");
  });

  // 當有搜尋文字時更新寶可夢清單
  it("should update filteredPokemonList when search query changes", () => {
    const filteredList = [mockPokemonList[1]]; // 假設只搜到小火龍
    pokemonServiceSpy.searchPokemon.and.returnValue(filteredList);

    component.updateSearchQuery("小火龍");
    fixture.detectChanges();

    expect(component.searchQuery).toBe("小火龍");
    expect(component.filteredPokemonList).toEqual(filteredList);
    expect(pokemonServiceSpy.searchPokemon).toHaveBeenCalledWith("小火龍");
  });

  // 切換只顯示收藏
  it("should filter by favorites when view mode is Favorites", () => {
    pokemonServiceSpy.checkIsFavorite.and.callFake((pokemon: Pokemon) =>
      pokemon.Code === "#004" ? true : false
    ); // 模擬小火龍被收藏
    const favoriteList = [mockPokemonList[1]];

    component.toggleViewMode(); // 切換到 Favorites
    fixture.detectChanges();

    expect(component.currentViewMode).toBe(ViewMode.Favorites);
    expect(component.filteredPokemonList).toEqual(favoriteList);
  });

  // 切換寶可夢收藏狀態
  it("should toggle favorite status of a pokemon", () => {
    const pokemon = mockPokemonList[0];
    component.toggleFavorite(pokemon);
    fixture.detectChanges();

    expect(pokemonServiceSpy.toggleFavorite).toHaveBeenCalledWith(pokemon);
    expect(component.filteredPokemonList[0]).not.toBe(pokemon); // 確認是新物件
    expect(component.filteredPokemonList[0].Code).toBe(pokemon.Code); // 確認內容相同
  });

  // 切換觀看模式
  it("should toggle view mode between All and Favorites", () => {
    expect(component.currentViewMode).toBe(ViewMode.All);

    component.toggleViewMode();
    fixture.detectChanges();
    expect(component.currentViewMode).toBe(ViewMode.Favorites);

    component.toggleViewMode();
    fixture.detectChanges();
    expect(component.currentViewMode).toBe(ViewMode.All);
  });

  // 清空收藏
  it("should clear all favorites and update filtered list", () => {
    component.clearAllFavorites();
    fixture.detectChanges();

    expect(pokemonServiceSpy.clearFavorites).toHaveBeenCalled();
  });

  // 沒有查詢到寶可夢時，顯示沒有尋找到寶可夢
  it("should display no results when filteredPokemonList is empty", () => {
    pokemonServiceSpy.searchPokemon.and.returnValue([]);
    component.updateSearchQuery("不存在的寶可夢test");
    fixture.detectChanges();

    const noResultsElement = fixture.nativeElement.querySelector(".no-results");
    expect(noResultsElement).toBeTruthy();
    expect(noResultsElement.textContent).toContain("沒有尋找到寶可夢");
  });

  // 更新收藏清單
  it("should update filtered list when favorites change", fakeAsync(() => {
    component.currentViewMode = ViewMode.Favorites; // 設置為 Favorites 模式，因為收藏過濾只在這種模式下生效。

    pokemonServiceSpy.checkIsFavorite.and.callFake((pokemon: Pokemon) =>
      pokemon.Code === "#004" ? true : false
    ); // 模擬小火龍被收藏

    component.ngOnInit(); // 重新初始化以訂閱
    pokemonServiceSpy.searchPokemon.and.returnValue(mockPokemonList);

    favoritesSubject.next(new Set(["#004"])); // 模擬收藏變化
    tick();
    fixture.detectChanges();

    expect(component.filteredPokemonList).toEqual([mockPokemonList[1]]);
  }));
});
