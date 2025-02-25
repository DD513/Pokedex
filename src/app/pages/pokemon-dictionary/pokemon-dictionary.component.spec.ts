import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDictionaryComponent } from './pokemon-dictionary.component';

describe('PokemonDictionaryComponent', () => {
  let component: PokemonDictionaryComponent;
  let fixture: ComponentFixture<PokemonDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonDictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
