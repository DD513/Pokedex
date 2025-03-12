import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonDictionarySearchBarComponent } from "./pokemon-dictionary-search-bar.component";
import { FormsModule } from "@angular/forms";
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
});
