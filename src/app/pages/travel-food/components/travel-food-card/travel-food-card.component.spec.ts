import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelFoodCardComponent } from './travel-food-card.component';

describe('TravelFoodCardComponent', () => {
  let component: TravelFoodCardComponent;
  let fixture: ComponentFixture<TravelFoodCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelFoodCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelFoodCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
