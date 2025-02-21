import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonNavbarComponent } from './pokemon-navbar.component';

describe('PokemonNavbarComponent', () => {
  let component: PokemonNavbarComponent;
  let fixture: ComponentFixture<PokemonNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
