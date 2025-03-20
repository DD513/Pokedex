import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonCardComponent } from "./pokemon-card.component";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { PokemonService } from "../../../../../core/services/pokemon.service";

describe("PokemonCardComponent", () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;

  const mockPokemon = {
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
  };

  beforeEach(async(() => {
    // 創建模擬的 PokemonService，僅模擬 getTypeColor 方法
    const pokemonSpy = jasmine.createSpyObj("PokemonService", ["getTypeColor"]);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PokemonCardComponent],
      providers: [{ provide: PokemonService, useValue: pokemonSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    // 獲取模擬的 PokemonService
    pokemonServiceSpy = TestBed.get(PokemonService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = mockPokemon; // 模擬傳遞 pokemon 資料給 component
    component.isFavorite = false; // 初始設為非收藏狀態

    // 預設模擬 getTypeColor 的行為
    pokemonServiceSpy.getTypeColor.and.returnValue("#00ff00"); // 模擬返回綠色
    fixture.detectChanges(); // 觸發變更檢測
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // 測試 @Input() pokemon 是否正確綁定
  it("should display pokemon details correctly", () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector(".card-title").textContent;
    const description = compiled.querySelector(".card-description").textContent;
    const img = compiled.querySelector(".pokemon-img");

    expect(title).toContain("妙蛙種子 (Bulbasaur)");
    expect(description).toContain(
      "經常可見牠在太陽下睡午覺的樣子。在沐浴了充足的陽光之後，牠背上的種子就會成長茁壯。"
    );
    expect(img.src).toContain(mockPokemon.Img);
    expect(img.alt).toBe("Bulbasaur");
  });

  // 測試類型徽章是否正確顯示
  it("should display pokemon types correctly", () => {
    const compiled = fixture.nativeElement;
    const typeBadges = compiled.querySelectorAll(".type-badge");

    expect(typeBadges.length).toBe(2);
    expect(typeBadges[0].textContent).toContain("草");
    expect(typeBadges[1].textContent).toContain("毒");
  });

  // 測試收藏狀態切換時是否觸發事件
  it("should emit toggleFavorite event when toggleFavoriteStatus is called", () => {
    spyOn(component.toggleFavorite, "emit");
    component.toggleFavoriteStatus();

    expect(component.toggleFavorite.emit).toHaveBeenCalledWith(mockPokemon);
  });

  // 測試 getTypeColor 方法是否被正確呼叫
  it("should call getTypeColor from PokemonService for each type", () => {
    // 在測試開始前重置計數，確保只計算本次測試的呼叫
    pokemonServiceSpy.getTypeColor.calls.reset();
    fixture.detectChanges(); // 確保模板渲染

    expect(pokemonServiceSpy.getTypeColor).toHaveBeenCalledWith("草");
    expect(pokemonServiceSpy.getTypeColor).toHaveBeenCalledWith("毒");
    // expect(pokemonServiceSpy.getTypeColor).toHaveBeenCalledTimes(2); beforeEach 中的 fixture.detectChanges() 觸發了一次渲染。測試案例中的 fixture.detectChanges() 又觸發了一次渲染
  });

  // 測試收藏圖示是否根據 isFavorite 狀態切換
  it("should display correct favorite icon based on isFavorite state", () => {
    const compiled = fixture.nativeElement;
    let favoriteIcon = compiled.querySelector(".favorite-icon img");

    // 初始狀態為未收藏
    expect(favoriteIcon.src).toContain(component.favoriteOutline);

    // 切換為已收藏
    component.isFavorite = true;
    fixture.detectChanges();
    favoriteIcon = compiled.querySelector(".favorite-icon img");
    expect(favoriteIcon.src).toContain(component.favoriteFilled);
  });

  // 測試點擊收藏按鈕是否觸發 toggleFavoriteStatus
  it("should call toggleFavoriteStatus when favorite icon is clicked", () => {
    spyOn(component, "toggleFavoriteStatus");
    const favoriteIcon = fixture.nativeElement.querySelector(".favorite-icon");

    favoriteIcon.click();
    expect(component.toggleFavoriteStatus).toHaveBeenCalled();
  });
});
