import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common"; // 引入 CommonModule 以支援 *ngIf
import { LotteryResultComponent } from "./lottery-result.component";
import { PokemonService } from "../../../../../core/services/pokemon.service";
import { Pokemon } from "../../../../../core/models/pokemon.model";
import { IMAGE_PATHS } from "../../../../../core/constants/image-paths";

describe("LotteryResultComponent", () => {
  let component: LotteryResultComponent;
  let fixture: ComponentFixture<LotteryResultComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;

  // Mock Pokemon data
  const mockPokemon: Pokemon = {
    Code: "#0094",
    Category: "影子寶可夢",
    ChineseName: "耿鬼",
    EnglishName: "Gengar",
    Description: "會潛進獵物的影子裡，然後靜靜地等待奪取性命的機會到來。",
    Img: "assets/images/Pokemon/Gengar.png",
    Types: [{ Name: "幽靈" }, { Name: "毒" }],
    Height: "1.5",
    Weight: "40.5",
    Abilities: [{ Name: "詛咒之軀" }],
  };

  beforeEach(async () => {
    const pokeSpy = jasmine.createSpyObj("PokemonSeevice", [
      "getRandomPokemon",
      "getTypeColor",
    ]);

    TestBed.configureTestingModule({
      imports: [CommonModule], // 加入 CommonModule 以支援 *ngIf 等指令
      declarations: [LotteryResultComponent],
      providers: [{ provide: PokemonService, useValue: pokeSpy }],
    }).compileComponents();

    // 在 TestBed 配置完成後獲取 spy 實例
    // pokemonServiceSpy = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    pokemonServiceSpy = TestBed.get(
      PokemonService
    ) as jasmine.SpyObj<PokemonService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryResultComponent);
    component = fixture.componentInstance;

    pokemonServiceSpy.getRandomPokemon.and.returnValue(mockPokemon);
    pokemonServiceSpy.getTypeColor.and.callFake((type: string) => {
      return type === "毒" ? "#A040A0" : "#a08cff"; // 模擬幽靈和毒的顏色
    });

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // 當 lotteryResult 為 null 且 isDrawing 為 true 時，應顯示loading模板
  it("should display the loading template when lotteryResult is null and isDrawing is true", () => {
    component.lotteryResult = null;
    component.isDrawing = false;
    fixture.detectChanges();

    const loadingElement =
      fixture.nativeElement.querySelector(".loading-container");

    expect(loadingElement).toBeTruthy();
    expect(
      loadingElement.querySelector(".loading-icon").getAttribute("src")
    ).toBe(IMAGE_PATHS.LOADING_EGG);
    expect(loadingElement.querySelector(".loading-text").textContent).toContain(
      "寶可夢載入中..."
    );
  });

  // 當 lotteryResult 有資料時，應顯示寶可夢資訊
  it("should display Pokémon information when lotteryResult has data", () => {
    component.lotteryResult = mockPokemon;
    component.isDrawing = false;
    fixture.detectChanges();

    const pokemonCard = fixture.nativeElement.querySelector(".pokemon-card");
    expect(pokemonCard).toBeTruthy();

    const img = pokemonCard.querySelector("img");
    expect(img.getAttribute("src")).toBe(mockPokemon.Img);
    expect(img.getAttribute("alt")).toBe(mockPokemon.EnglishName);

    const nameElement = pokemonCard.querySelector(".pokemon-name");
    expect(nameElement.textContent).toContain(
      `${mockPokemon.ChineseName} (${mockPokemon.EnglishName})`
    );

    const detailsElement = pokemonCard.querySelector(".pokemon-details");
    expect(detailsElement.textContent).toContain(mockPokemon.Category);
    expect(detailsElement.textContent).toContain(`${mockPokemon.Height} m`);

    const typeBadges = detailsElement.querySelectorAll(".type-badge");
    expect(typeBadges.length).toBe(mockPokemon.Types.length);
    expect(typeBadges[0].textContent).toContain("幽靈");
    expect(typeBadges[0].style.backgroundColor).toBe("rgb(160, 140, 255)"); // #A08CFF
    expect(typeBadges[1].textContent).toContain("毒");
    expect(typeBadges[1].style.backgroundColor).toBe("rgb(160, 64, 160)"); //  #A040A0

    const descriptionElement = pokemonCard.querySelector(
      ".pokemon-description"
    );
    expect(descriptionElement.textContent).toBe(mockPokemon.Description);
  });

  // 當 lotteryResult.Types 為空時，不應顯示類型標籤
  it("should not display type badges when lotteryResult.Types is empty", () => {
    const emptyTypesPokemon: Pokemon = { ...mockPokemon, Types: [] };
    component.lotteryResult = emptyTypesPokemon;
    fixture.detectChanges();

    const pokemonCard = fixture.nativeElement.querySelector(".pokemon-card");
    expect(pokemonCard).toBeTruthy();
    const typeBadges = pokemonCard.querySelectorAll(".type-badge");
    expect(typeBadges.length).toBe(0);
  });
});
