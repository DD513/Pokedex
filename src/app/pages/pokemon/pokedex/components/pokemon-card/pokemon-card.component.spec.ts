import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonCardComponent } from "./pokemon-card.component";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("PokemonCardComponent", () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

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
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PokemonCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    // 模擬傳遞 pokemon 資料給 component
    component.pokemon = mockPokemon;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
