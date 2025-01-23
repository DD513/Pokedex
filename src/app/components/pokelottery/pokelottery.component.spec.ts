import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokelotteryComponent } from './pokelottery.component';

describe('PokelotteryComponent', () => {
  let component: PokelotteryComponent;
  let fixture: ComponentFixture<PokelotteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokelotteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokelotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
