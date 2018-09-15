import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders: Order[] = [];

  constructor(
    public authService: AuthService,
    public orderService: OrderService
  ) {
    authService.user
      .pipe(switchMap(u => orderService.getOrdersByUser(u.uid)))
      .subscribe(o => (this.orders = o));
  }
}
