import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalPlanetComponent } from './animal-planet.component';

describe('AnimalPlanetComponent', () => {
  let component: AnimalPlanetComponent;
  let fixture: ComponentFixture<AnimalPlanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalPlanetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
