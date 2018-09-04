import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<any[]> {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map(items => {
          let data = [];
          items.forEach(element => {
            let d = element.payload.val();
            const key = element.payload.key;
            d['key'] = key;
            data.push(d);
          });
          return data;
        })
      );
  }

  get(productId): Observable<any> {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    this.db.object('/products/' + productId).remove();
  }
}
