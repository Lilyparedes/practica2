import { TestBed } from '@angular/core/testing';

import { OrdersData } from './orders-data';

describe('OrdersData', () => {
  let service: OrdersData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
