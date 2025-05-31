import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaType } from './pizza-type';

describe('PizzaType', () => {
  let component: PizzaType;
  let fixture: ComponentFixture<PizzaType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
