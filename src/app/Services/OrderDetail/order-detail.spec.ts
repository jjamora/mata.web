import { TestBed } from '@angular/core/testing';

import { OrderDetailService } from './order-detail';

describe('OrderDetail', () => {
  let service: OrderDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
