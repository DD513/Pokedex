import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelFoodComponent } from './travel-food.component';

describe('TravelFoodComponent', () => {
  let component: TravelFoodComponent;
  let fixture: ComponentFixture<TravelFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
