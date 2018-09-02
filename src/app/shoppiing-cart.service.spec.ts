import { TestBed, inject } from '@angular/core/testing';

import { ShoppingCartService } from './shoppiing-cart.service';

describe('ShoppiingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartService]
    });
  });

  it('should be created', inject([ShoppingCartService], (service: ShoppingCartService) => {
    expect(service).toBeTruthy();
  }));
});
