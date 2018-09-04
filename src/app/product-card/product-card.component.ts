import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shoppiing-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { moveIn, fallIn } from '../app.animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  animations: [moveIn(), fallIn()]
})
export class ProductCardComponent implements OnInit {
  @Input('product')
  product: Product;
  @Input('show_actions')
  show_actions = true;
  @Input('shopping_cart')
  shopping_cart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
