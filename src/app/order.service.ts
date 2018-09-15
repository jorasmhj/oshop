import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shoppiing-cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    let result = await this.db.list('/orders/').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(): Observable<any[]> {
    return this.db
      .list('/orders')
      .snapshotChanges()
      .pipe(
        map(order => {
          let data = [];
          order.forEach(element => {
            let d = element.payload.val();
            const key = element.payload.key;
            d['key'] = key;
            data.push(d);
          });
          return data;
        })
      );
  }

  getOrdersByUser(userId: string): Observable<any[]> {
    return this.db
      .list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(order => {
          let data = [];
          order.forEach(element => {
            let d = element.payload.val();
            const key = element.payload.key;
            d['key'] = key;
            data.push(d);
          });
          return data;
        })
      );
  }
}
