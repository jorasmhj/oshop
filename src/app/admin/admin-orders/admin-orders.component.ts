import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {
    this.orderService.getOrders().subscribe(params => {
      this.orders = params;
    });
  }
}
