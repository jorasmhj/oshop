import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map(a => {
          let b = a.payload.val();
          return new ShoppingCart(b['items']);
        })
      );
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);
    items$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(item => {
        let d = item.payload.val() || 0;
        let quantity = (d['quantity'] || 0) + change;
        if (quantity === 0) items$.remove();
        else
          items$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity
          });
      });
  }

  async clearCart() {
    let cartID = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartID + '/items').remove();
  }
}
