import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart')
  cart: ShoppingCart;
  shipping = {};
  userId: string;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => (this.userId = user.uid));
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
