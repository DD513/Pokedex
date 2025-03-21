import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { PokelotteryComponent } from "./pokelottery.component";
import { LotteryResultComponent } from "./components/lottery-result/lottery-result.component";
import { PokelotteryModule } from "./pokelottery.module";
import { Pokemon } from "../../../core/models/pokemon.model";
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { PokemonService } from "src/app/core/services/pokemon.service";

// Mock Pokémon data
const mockPokemon: Pokemon = {
  Code: "#0136",
  Category: "火寶可夢",
  ChineseName: "火伊布",
  EnglishName: "Flareon",
  Description: "會將吸入的空氣送進體內的火囊轉化成１７００度的火焰後再吐出來。",
  Img: "assets/images/Pokemon/Flareon.png",
  Types: [{ Name: "火" }],
  Height: "0.9",
  Weight: "25.0",
  Abilities: [{ Name: "引火" }],
};

describe("PokelotteryComponent", () => {
  let component: PokelotteryComponent;
  let fixture: ComponentFixture<PokelotteryComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(async(() => {
    const pokeSpy = jasmine.createSpyObj("PokemonService", [
      "getRandomPokemon",
      "getTypeColor",
    ]);

    TestBed.configureTestingModule({
      imports: [PokelotteryModule, HttpClientModule, FormsModule, CommonModule],
      providers: [{ provide: PokemonService, useValue: pokeSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    pokemonServiceSpy = TestBed.get(
      PokemonService
    ) as jasmine.SpyObj<PokemonService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokelotteryComponent);
    component = fixture.componentInstance;

    // Default mock behavior
    pokemonServiceSpy.getRandomPokemon.and.returnValue(mockPokemon);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // 應該咒卻顯示初始 UI 元素
  it("should display initial UI elements correctly", () => {
    const cardElement = fixture.nativeElement.querySelector(".card");
    expect(cardElement).toBeTruthy();

    const title = cardElement.querySelector(".title");
    expect(title.textContent).toBe("寶可夢抽抽樂");

    const instruction = cardElement.querySelector(".instruction");
    expect(instruction.textContent).toBe("按下按鈕，試試你的運氣吧！");

    const button = cardElement.querySelector(".lottery-button");
    expect(button).toBeTruthy();
    expect(button.disabled).toBe(false);
    expect(button.textContent).toContain("抽抽樂");

    const gameCount = cardElement.querySelector(".game-count");
    expect(gameCount.textContent).toContain("遊戲次數: 1");
  });

  // 當呼叫 drowLottery 時，應該開始新的抽獎
  it("should start a new lottery when drawLottery is called", fakeAsync(() => {
    component.gameCount = 1;
    component.drawLottery();

    expect(component.isDrawing).toBe(true);
    expect(component.lotteryResult).toBeNull();

    tick(800); // 模擬 800ms 延遲

    expect(component.lotteryResult).toEqual(mockPokemon);
    expect(component.gameCount).toBe(2);
    expect(component.isDrawing).toBe(false);
    expect(pokemonServiceSpy.getRandomPokemon).toHaveBeenCalledTimes(2); // ngOnInit + drawLottery
  }));

  // 在抽獎時應該禁用抽獎按鈕
  it("should disable the lottery button while drawing", fakeAsync(() => {
    const button = fixture.nativeElement.querySelector(".lottery-button");
    expect(button.disabled).toBe(false);

    component.drawLottery();
    fixture.detectChanges();

    expect(button.disabled).toBe(true);

    tick(800);
    fixture.detectChanges();

    expect(button.disabled).toBe(false);
  }));

  // 如果正在抽獎，不應開始新的抽獎
  it("should not start a new lottery if already drawing", () => {
    component.isDrawing = true;
    const initialGameCount = component.gameCount;

    component.drawLottery();

    expect(component.gameCount).toBe(initialGameCount); // gameCount 不應增加
    expect(pokemonServiceSpy.getRandomPokemon).toHaveBeenCalledTimes(1); // 只在 ngOnInit 調用一次
  });

  // 應該將 lotteryResult 和 isDrawing 傳遞給 LotteryResultComponent
  it("should pass lotteryResult and isDrawing to LotteryResultComponent", fakeAsync(() => {
    component.lotteryResult = mockPokemon;
    component.isDrawing = false;
    fixture.detectChanges();

    const lotteryResultDebug = fixture.debugElement.query(
      By.css("app-lottery-result")
    );
    expect(lotteryResultDebug.componentInstance.lotteryResult).toEqual(
      mockPokemon
    );
    expect(lotteryResultDebug.componentInstance.isDrawing).toBe(false);

    component.drawLottery(); // 抽獎中
    fixture.detectChanges();

    expect(lotteryResultDebug.componentInstance.lotteryResult).toBeNull();
    expect(lotteryResultDebug.componentInstance.isDrawing).toBe(true);

    tick(800);
    fixture.detectChanges();

    expect(lotteryResultDebug.componentInstance.lotteryResult).toEqual(
      mockPokemon
    );
    expect(lotteryResultDebug.componentInstance.isDrawing).toBe(false);
  }));
});
