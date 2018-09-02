import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    for (let productId in itemsMap) {
      if (productId) {
        let item = itemsMap[productId];
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }
    }
  }

  getQuantity(product: Product) {
    if (!this.itemsMap) return 0;
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let shoppingCartItemCount = 0;
    for (let productId in this.itemsMap)
      shoppingCartItemCount += this.itemsMap[productId].quantity;
    return shoppingCartItemCount;
  }
}
