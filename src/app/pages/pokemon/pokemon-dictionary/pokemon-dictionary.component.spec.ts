import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { PokemonDictionaryComponent } from "./pokemon-dictionary.component";
import { PokemonDictionaryModule } from "./pokemon-dictionary.module";
import { PokemonService } from "../../../core/services/pokemon.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

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
});
