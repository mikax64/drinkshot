import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDrinkComponent } from './single-drink.component';

describe('SingleDrinkComponent', () => {
  let component: SingleDrinkComponent;
  let fixture: ComponentFixture<SingleDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
