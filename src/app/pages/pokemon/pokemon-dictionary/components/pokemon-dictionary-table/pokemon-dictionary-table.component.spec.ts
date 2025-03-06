import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDictionaryTableComponent } from './pokemon-dictionary-table.component';

describe('PokemonDictionaryTableComponent', () => {
  let component: PokemonDictionaryTableComponent;
  let fixture: ComponentFixture<PokemonDictionaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonDictionaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDictionaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
