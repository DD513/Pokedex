import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonLayoutComponent } from "./pokemon-layout.component";
import { PokemonLayoutModule } from "./pokemon-layout.module";
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("PokemonLayoutComponent", () => {
  let component: PokemonLayoutComponent;
  let fixture: ComponentFixture<PokemonLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PokemonLayoutModule, RouterTestingModule], // ✅ 只導入 Module
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // ✅ 避免錯誤
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
