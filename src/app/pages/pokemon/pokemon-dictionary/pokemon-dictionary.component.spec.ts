import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { PokemonDictionaryComponent } from "./pokemon-dictionary.component";
import { PokemonDictionaryModule } from "./pokemon-dictionary.module";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("PokemonDictionaryComponent", () => {
  let component: PokemonDictionaryComponent;
  let fixture: ComponentFixture<PokemonDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PokemonDictionaryModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
