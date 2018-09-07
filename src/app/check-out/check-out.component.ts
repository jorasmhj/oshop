import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shoppiing-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { User } from 'firebase';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shipping = {};
  cart: ShoppingCart;
  userId: string;

  constructor(
    private router: Router,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    cart$.subscribe(cart => (this.cart = cart));
    this.authService.user.subscribe(user => (this.userId = user.uid));
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
