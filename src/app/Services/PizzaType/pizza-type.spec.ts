import { TestBed } from '@angular/core/testing';

import { PizzaTypeService } from './pizza-type';

describe('PizzaType', () => {
  let service: PizzaTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
